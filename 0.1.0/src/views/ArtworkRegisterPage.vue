<template>
    <div id="artworkRegisterPage">
        <Background :background_display="!this.loading"></Background>
        <div v-if="this.loading" id="loading">
            <va-progress-circle indeterminate />
        </div>
        <div class="top">
            <div class="prevButton" @click="this.swiperNavigation(0);">
                <div v-if="this.swiperIndex === 0">취소</div>
                <svg v-else width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <div class="presentStep"> {{ this.presentStep[this.swiperIndex] }} </div>
            <div class="nextButton" @click="this.swiperNavigation(1)" :style="'color: ' + this.fontColor">
                <div v-if="this.swiperIndex === 3">완료</div>
                <div v-else>다음</div>
            </div>
        </div>
        <div class="bottom">
            <swiper
                v-bind="this.swiperOptions"
                @slideChange="this.slideChange"
                @init="this.getSlidesNumber">
                <swiper-slide>
                    <TitleInput ref="titleInput"
                        @activate-next-button="this.activateNextButton"
                        @set-artwork-entity="this.setArtworkEntity"
                        :isExhibition="false"></TitleInput>
                </swiper-slide>
                <swiper-slide>
                    <ImageSelection ref="imageSelection" 
                        @activate-next-button="this.activateNextButton"
                        @set-artwork-entity="this.setArtworkEntity" :artworkData="this.newArtwork"
                        :originalImageFiles="[]"></ImageSelection>
                </swiper-slide>
                <swiper-slide>
                    <BasicInformation ref="basicInformation" 
                        @activate-next-button="this.activateNextButton"
                        @set-artwork-entity="this.setArtworkEntity"></BasicInformation>
                </swiper-slide>
                <swiper-slide>
                    <Description ref="description" 
                        @activate-next-button="this.activateNextButton"
                        @set-artwork-entity="this.setArtworkEntity"></Description>
                </swiper-slide>
                <button class="next"></button>
                <button class="previous"></button>
            </swiper>
        </div>
    </div>
    <div class="artworkRegisterPopup" v-show="this.registerPopupFlag">
        <div class="guidance">아트워크를<br />등록하시겠습니까?</div>
        <div class="buttonContainer">
            <div class="registerButton" @click="this.completeRegister()">등록</div>
            <div class="cancelButton" @click="() => { this.registerPopupFlag = false }">취소</div>
        </div>
    </div>
</template>
<script>
    import TitleInput from '@/components/ArtworkRegisterPage/TitleInput.vue';
    import ImageSelection from '@/widgets/ImageSelection.vue';
    import BasicInformation from '@/components/ArtworkRegisterPage/BasicInformation.vue';
    import Description from '@/components/ArtworkRegisterPage/Description.vue';
    
    import { getAuth } from '@/modules/auth';
    import { Artwork } from '@/classes/artwork';
    import { resizeImage } from '@/modules/image';
    import { 
        putArtworkDirectory,
        putArtworkImages,
        putArtworkThumbnailImage,
        putArtworkVideo,
        deleteArtworkDirectory
    } from '@/modules/storage';

    import SwiperCore, { Pagination, Navigation } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import "swiper/css/pagination";
    import Background from '@/widgets/Background.vue';

    SwiperCore.use([Pagination, Navigation]);

    export default {
        name: 'ArtworkRegisterPage',
        components: {
            Swiper,
            SwiperSlide,
            TitleInput,
            ImageSelection,
            BasicInformation,
            Description,
            Background,
        },
        props: {
            // 작품등록페이지가 전시등록페이지로부터 호출되었는지를 표시하는 prop.
            from_exhibition_modify_page: {
                type: Boolean,
                default: false
            }
        },
        emits: ["artwork-add", "close-artwork-register"],
        data() {
            return {
                presentStep: ['작품명 입력', '이미지/영상 선택', '상세정보 입력', '작품 설명 입력'],
                swiperIndex: 0,
                numberOfSlides: 0,
                navigationButtons: [],
                fontColor: '#959595;',
                newArtwork: {
                    title: null,
                    images: null,
                    video: null,
                    video_index: null,
                    video_thumbnail: null,
                    material: null,
                    threeDimensional: null,
                    size: {
                        x: null,
                        y: null,
                        z: null,
                    },
                    unit: null,
                    year: null,
                    description: null,
                    textColor: 'black'
                },
                swiper: null,
                swiperOptions: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: false,
                    centeredSlides: true,
                    allowTouchMove: false,
                    pagination: {
                        type: 'progressbar',
                    },
                    navigation: {
                        nextEl: '.next',
                        prevEl: '.previous'
                    }
                },
                loading: false,
                registerPopupFlag: false
            };
        },
        mounted() {
            this.navigationButtons.push(document.getElementsByClassName('previous')[0])
            this.navigationButtons.push(document.getElementsByClassName('next')[0])
            
            this.navigationButtons[1].disabled = true
        },
        methods: {
            getSlidesNumber (swiper) {
                this.swiper = swiper
                this.numberOfSlides = swiper.slides.length
            },
            back () {
                if (this.from_exhibition_modify_page) {
                    this.$emit('close-artwork-register')
                    this.resetPage()
                }
                else {
                    this.$router.replace('/')
                }
            },
            /*
            * - "다음" 또는 "<(이전)" 버튼을 누르면 활성화 되는 함수
            * - buttonIndex를 parameter로 받는다. "<"버튼은 buttonIndex == 0, "다음" 버튼은 buttonIndex == 1.
            * 1. "<" 또는 "다음" 버튼을 눌렀을 때, 실제 swiperNavigation이 binding 돼 있는 버튼의 click 이벤트를 발생시킨다.
            * : 실제 navigation을 관장하는 button은 배열 navigationButtons에 담겨있다.
            * 2. "다음" 버튼을 누른 경우(buttonIndex == 1) 이고 마지막 등록 페이지인 경우 completeRegister 함수를 호출하여 등록을 완료.
            * 3. "<" 버튼을 누른 경우(buttonIndex == 0)이고 첫 등록 페이지인 경우 cancelRegister 함수를 호출하여 등록을 취소한다.
            */
            swiperNavigation (buttonIndex) {
                if (this.numberOfSlides === 0) {
                    this.getSlidesNumber(this.swiper)
                }
                if (buttonIndex === 1) {
                    if (this.swiperIndex === (this.numberOfSlides - 1)) {
                        this.registerPopupFlag = true
                        return
                    }
                }
                else {
                    if (this.swiperIndex === 0) {
                        this.back()
                    }
                }
                this.navigationButtons[buttonIndex].click()
            },
            /*
            * - 작품 등록을 완료시키는 함수.
            * 1. 완료버튼이 비활성화 된 상태인 경우 등록을 하지 않고 return.
            * 2. 등록할 artwork의 정보를 담고있는 Object newArtwork에 정보들이 누락되지 않았는지 검사하여 result에 저장.
            * 3. 누락된 정보가 있는 경우 (result === false) 등록 재실행
            * 4. 정보가 모두 담긴 경우 (result === true) 등록 절차 진행
            */
            async completeRegister () {
                if (this.navigationButtons[1].disabled)
                    return
                
                let result = true
                let is_media = false
                for (let i in this.newArtwork) {
                    if (i === 'threeDimensional' || i === 'video_index' || i === 'video_thumbnail') {
                        continue
                    }
                    else if (i === 'size') {
                        result = result && this.newArtwork[i].x && this.newArtwork[i].y
                        continue
                    }
                    else if (i === 'video' || i === 'images') {
                        is_media = is_media || this.newArtwork[i]
                        continue
                    }
                    result = result && this.newArtwork[i]
                }
                result = result && ((this.newArtwork.threeDimensional !== null) || this.newArtwork.size.z) && is_media

                /* result === false면 artwork에 누락된 정보 있음. 처음부터 등록 */
                if (!result) {
                    // 처음으로 돌아가는 code.
                    this.$router.replace(this.$router.currentRoute)
                }
                /* result === true면 artwork 등록 */
                else {
                    this.loading = true
                    this.registerPopupFlag = false

                    // artwork 등록 code
                    const current_artist = getAuth()
                    const dimension_string = String(this.newArtwork.size.x) 
                        + ' x ' + String(this.newArtwork.size.y)
                        + ((this.newArtwork.threeDimensional)
                            ? ' x ' + String(this.newArtwork.size.z)
                            : '')
                        + ' ' + this.newArtwork.unit

                    const new_page_id = await current_artist.postArtwork(
                        this.newArtwork.title,
                        this.newArtwork.year,
                        dimension_string,
                        this.newArtwork.threeDimensional,
                        this.newArtwork.material,
                        this.newArtwork.description,
                        this.newArtwork.textColor,
                        this.newArtwork.video_index
                    )
                    if (!new_page_id) {
                        this.$router.replace('/')
                        return
                    }
                    
                    const new_artwork = await new Artwork(new_page_id).init()

                    const directory_result = await putArtworkDirectory(new_page_id)
                    if (directory_result) {
                        let image_result = true
                        let video_result = true
                        if (this.newArtwork.images !== null) {
                            const resized_files = []
                            const files = this.newArtwork.images
                            for (let i = 0; i < files.length; i++) {
                                const file = files[i]
                                const resized_file = await resizeImage(file, {
                                    x: 720,
                                    y: 1200
                                })
                                resized_files.push(resized_file)
                            }
                            const thumbnail = await resizeImage(resized_files[0], {
                                x: 400,
                                y: 400
                            })
                            image_result = await putArtworkImages(new_page_id, resized_files)
                            if (image_result) {
                                const thumbnail_result = await putArtworkThumbnailImage(new_page_id, thumbnail)
                                image_result = image_result && thumbnail_result
                            }
                        }

                        if (this.newArtwork.video !== null) {
                            video_result = await putArtworkVideo(new_artwork, this.newArtwork.video_index, new_page_id, this.newArtwork.video)

                            if (this.newArtwork.images === null) {
                                const video_thumbnail = await resizeImage(this.newArtwork.video_thumbnail, {
                                    x: 400,
                                    y: 400
                                })
                                const thumbnail_result = await putArtworkThumbnailImage(new_page_id, video_thumbnail)
                                video_result = video_result && thumbnail_result
                            }
                        }
                        const media_result = image_result || video_result
                        if (media_result) {
                            if (!this.from_exhibition_modify_page) {
                                this.$router.replace('/')
                            }
                            else {
                                this.loading = false
                                this.$emit('close-artwork-register')
                                this.$emit('artwork-add', new_artwork)
                                this.resetPage()
                            }

                            return
                        }
                    }
                    if (!this.from_exhibition_modify_page) {
                        await this.cancelRegister(new_artwork)
                        this.loading = false
                        this.$router.replace('/')
                    }
                    else {
                        await this.cancelRegister(new_artwork)
                        this.loading = false
                        this.$emit('close-artwork-register')
                        this.$emit('artwork-add', new_artwork)
                        this.resetPage()
                    }

                    return
                }
            },
            // - artwork 등록을 취소하는 함수.
            async cancelRegister(pre_artwork) {
                await pre_artwork.deletePreArtwork()
                await deleteArtworkDirectory(pre_artwork.getPageID())
            },
            resetPage () {
                this.swiper.slideTo(0, 0)
                this.newArtwork = {
                    title: null,
                    images: null,
                    video: null,
                    video_index: null,
                    video_thumbnail: null,
                    material: null,
                    threeDimensional: null,
                    size: {
                        x: null,
                        y: null,
                        z: null,
                    },
                    unit: null,
                    year: null,
                    description: null,
                    textColor: 'black'
                }

                this.$refs.titleInput.resetInput()
                this.$refs.imageSelection.resetInput()
                this.$refs.basicInformation.resetInput()
                this.$refs.description.resetInput()
            },
            /*
            * 등록 페이지가 변경되면 호출되는 함수.
            * 1. 현재 swiper index를 저장한다.
            * 2. 현재 slide의 입력 폼이 유효한지 검사한다.
            *   : formValidCheck은 입력 폼이 유효하면 '다음' 버튼을 활성화 한다.
            */
            async slideChange (swiper) {
                this.swiperIndex = swiper.activeIndex

                switch(this.swiperIndex) {
                    case 0:
                        await this.$refs.titleInput.formValidCheck()
                        break
                    case 1:
                        await this.$refs.imageSelection.formValidCheck()
                        break
                    case 2:
                        this.$refs.basicInformation.formValidCheck()
                        break
                    case 3:
                        this.$refs.description.descriptionValidCheck()
                        break
                }
            },
            /*
            * - "다음"(또는 완료) 버튼의 활성화를 결정하는 함수.
            * 1. parameter isActive === true이면 "다음" 버튼 활성화, isActive === false이면 "다음" 버튼 비활성화
            * 2. parameter isActive에 따라 "다음" 버튼 폰트 색상 변경.
            */
            activateNextButton (isActive) {
                this.navigationButtons[1].disabled = !isActive

                if (isActive) {
                    this.fontColor = '#000000'
                }
                else {
                    this.fontColor = '#959595'
                }
            },
            /*
            * - 새롭게 등록할 artwork의 정보를 담는 newArtwork 객체의 값을 설정하는 함수.
            * 1. parameter로 설정할 newArtwork의 key(entity)값과 value값을 받아 newArtwork 재설정.
            */
            setArtworkEntity (entity, value) {
                switch (entity) {
                    case 'title':
                        this.newArtwork.title = value
                        break
                    case 'images':
                        this.newArtwork.images = value
                        break
                    case 'video':
                        this.newArtwork.video = value
                        break
                    case 'video_index':
                        this.newArtwork.video_index = value
                        break
                    case 'video_thumbnail':
                        this.newArtwork.video_thumbnail = value
                        break
                    case 'material':
                        this.newArtwork.material = value
                        break
                    case 'threeDimensional':
                        this.newArtwork.threeDimensional = value
                        break
                    case 'size':
                        this.newArtwork.size = value
                        break
                    case 'unit':
                        this.newArtwork.unit = value
                        break
                    case 'year':
                        this.newArtwork.year = value
                        break
                    case 'description':
                        this.newArtwork.description = value
                        break
                    case 'textColor':
                        this.newArtwork.textColor = value
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/ArtworkRegisterPage/artworkRegisterPage.scss"></style>