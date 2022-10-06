<template>
    <div id="exhibitionRegisterPage">
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
            <swiper v-bind="this.swiperOptions"
                @slideChange="this.slideChange"
                @init="this.getSlidesNumber">
                <swiper-slide>
                    <TitleInput :isExhibition="true" ref="titleInput" 
                        @activate-next-button="this.activateNextButton"
                        @set-exhibition-entity="this.setExhibitionEntity"></TitleInput>
                </swiper-slide>
                <swiper-slide>
                    <ExhibitionDate ref="exhibitionDate"
                        @activate-next-button="this.activateNextButton"
                        @set-exhibition-entity="this.setExhibitionEntity"></ExhibitionDate>
                </swiper-slide>
                <swiper-slide>
                    <ImageSelection :isExhibition="true" ref="imageSelection" 
                        @activate-next-button="this.activateNextButton"
                        @set-exhibition-entity="this.setExhibitionEntity" :exhibitionData="this.newExhibition"></ImageSelection>
                </swiper-slide>
                <swiper-slide>
                    <Description :isExhibition="true" ref="description" 
                        @activate-next-button="this.activateNextButton"
                        @set-exhibition-entity="this.setExhibitionEntity"></Description>
                </swiper-slide>
                <swiper-slide>
                    <LinkUpload
                        ref="linkUpload"
                        @activate-next-button="this.activateNextButton"
                        @set-exhibition-entity="this.setExhibitionEntity"></LinkUpload>
                </swiper-slide>
                <button class="next"></button>
                <button class="previous"></button>
            </swiper>
        </div>
    </div>
    <div class="exhibitionRegisterPopup" v-show="this.registerPopupFlag">
        <div class="guidance">전시를<br />등록하시겠습니까?</div>
        <div class="buttonContainer">
            <div class="registerButton" @click="this.completeRegister()">등록</div>
            <div class="cancelButton" @click="() => { this.registerPopupFlag = false }">취소</div>
        </div>
    </div>
</template>
<script>
    import TitleInput from '@/components/ArtworkRegisterPage/TitleInput.vue';
    import ExhibitionDate from '@/components/ExhibitionRegisterPage/ExhibitionDate.vue';
    import ImageSelection from '@/widgets/ImageSelection.vue';
    import Description from '@/components/ArtworkRegisterPage/Description.vue';
    import LinkUpload from '@/components/ExhibitionRegisterPage/LinkUpload.vue';
    import Background from '@/widgets/Background.vue';
    
    import { getAuth } from '@/modules/auth';
    import { Exhibition } from '@/classes/exhibition';
    import { resizeImage } from '@/modules/image';
    import { 
        putExhibitionDirectory,
        putExhibitionImages,
        putExhibitionThumbnailImage,
        deleteExhibitionDirectory,
        putExhibitionVideo
    } from '@/modules/storage';

    import SwiperCore, { Pagination, Navigation } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import "swiper/css/pagination";

    SwiperCore.use([Pagination, Navigation]);

    export default {
        name: 'ExhibitionRegisterPage',
        components: {
            Swiper,
            SwiperSlide,
            TitleInput,
            ImageSelection,
            Description,
            Background,
            LinkUpload,
            ExhibitionDate
        },
        data() {
            return {
                presentStep: ['전시명 입력', '전시 기간 설정', '대표 이미지 선택', '전시 설명 입력', '링크 업로드'],
                swiperIndex: 0,
                numberOfSlides: 0,
                navigationButtons: [],
                fontColor: '#959595;',
                newExhibition: {
                    title: null,
                    images: null,
                    description: null,
                    linkList: null,
                    video: null,
                    start_date: null,
                    end_date: null
                },
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
                this.numberOfSlides = swiper.slides.length
            },
            back () {
                this.$router.replace('/')
            },
            /**
            * - "다음" 또는 "<(이전)" 버튼을 누르면 활성화 되는 함수
            * - buttonIndex를 parameter로 받는다. "<"버튼은 buttonIndex == 0, "다음" 버튼은 buttonIndex == 1.
            * 1. "<" 또는 "다음" 버튼을 눌렀을 때, 실제 swiperNavigation이 binding 돼 있는 버튼의 click 이벤트를 발생시킨다.
            * : 실제 navigation을 관장하는 button은 배열 navigationButtons에 담겨있다.
            * 2. "다음" 버튼을 누른 경우(buttonIndex == 1) 이고 마지막 등록 페이지인 경우 completeRegister 함수를 호출하여 등록을 완료.
            * 3. "<" 버튼을 누른 경우(buttonIndex == 0)이고 첫 등록 페이지인 경우 cancelRegister 함수를 호출하여 등록을 취소한다.
            */
            swiperNavigation (buttonIndex) {
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
            /**
            * - 작품 등록을 완료시키는 함수.
            * 1. 완료버튼이 비활성화 된 상태인 경우 등록을 하지 않고 return.
            * 2. 등록할 exhibition의 정보를 담고있는 Object newExhibition에 정보들이 누락되지 않았는지 검사하여 result에 저장.
            * 3. 누락된 정보가 있는 경우 (result === false) 등록 재실행
            * 4. 정보가 모두 담긴 경우 (result === true) 등록 절차 진행
            */
            async completeRegister () {
                if (this.navigationButtons[1].disabled)
                    return
                
                let result = true
                for (let i in this.newExhibition) {
                    if (i === 'linkList' || i === 'video') 
                        continue
                    result = result && this.newExhibition[i]
                }

                /* result === false면 exhibition에 누락된 정보 있음. 처음부터 등록 */
                if (!result) {
                    // 처음으로 돌아가는 code.
                    this.$router.replace(this.$router.currentRoute)
                }
                /* result === true면 exhibition 등록 */
                else {
                    this.loading = true
                    this.registerPopupFlag = false
                    // exhibition 등록 code
                    const current_artist = getAuth()
                    const new_page_id = await current_artist.postExhibition(
                        this.newExhibition.title,
                        this.newExhibition.description
                    )
                    if (!new_page_id) {
                        this.$router.replace('/')
                        return
                    }
                    
                    const new_exhibition = await new Exhibition(new_page_id).init()
                    
                    if (Object.keys(this.newExhibition.linkList).length !== 0) {
                        await new_exhibition.postLink(this.newExhibition.linkList)
                    }

                    let date_result = true
                    date_result = await new_exhibition.putStartDate(this.newExhibition.start_date)
                    date_result = date_result && await new_exhibition.putEndDate(this.newExhibition.end_date)
                    
                    if (date_result) {
                        const resized_files = []
                        const files = this.newExhibition.images
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
                        const directory_result = await putExhibitionDirectory(new_page_id)
                        if (directory_result) {
                            const image_result = await putExhibitionImages(new_page_id, resized_files)
                            if (image_result) {
                                const thumbnail_result = await putExhibitionThumbnailImage(new_page_id, thumbnail)
                                if (thumbnail_result) {
                                    let video_result = true
                                    if (this.newExhibition.video.file !== null) {
                                        video_result = await putExhibitionVideo(new_exhibition, this.newExhibition.video.title, new_page_id, this.newExhibition.video.file)

                                        if (video_result) {
                                            this.$router.replace('/')
                                            return
                                        }
                                    }
                                    else {
                                        this.$router.replace('/')
                                        return
                                    }

                                }
                            }
                        }
                    }

                    await this.cancelRegister(new_exhibition)
                    this.loading = false
                    
                    this.$router.replace('/')
                    return
                }
            },
            // - exhibition 등록을 취소하는 함수.
            async cancelRegister(pre_exhibition) {
                await pre_exhibition.deletePreExhibition()
                await deleteExhibitionDirectory(pre_exhibition.getPageID())
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
                        this.$refs.exhibitionDate.formValidCheck()
                        break
                    case 2:
                        await this.$refs.imageSelection.formValidCheck()
                        break
                    case 3:
                        this.$refs.description.descriptionValidCheck()
                        break
                    case 4:
                        await this.$refs.linkUpload.formValidCheck()
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
            * - 새롭게 등록할 exhibition의 정보를 담는 newExhibition 객체의 값을 설정하는 함수.
            * 1. parameter로 설정할 newExhibition의 key(entity)값과 value값을 받아 newExhibition 재설정.
            */
            setExhibitionEntity (entity, value) {
                switch (entity) {
                    case 'title':
                        this.newExhibition.title = value
                        //console.log(value)
                        break
                    case 'start_date':
                        this.newExhibition.start_date = value
                        break
                    case 'end_date':
                        this.newExhibition.end_date = value
                        break
                    case 'images':
                        this.newExhibition.images = value
                        //console.log(value)
                        break
                    case 'description':
                        this.newExhibition.description = value
                        //console.log(value)
                        break
                    case 'link_list': {
                        this.newExhibition.linkList = value
                        //console.log(value)
                        break
                    }
                    case 'video': {
                        this.newExhibition.video = value
                        //console.log(value)
                        break
                    }
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/ExhibitionRegisterPage/exhibitionRegisterPage.scss"></style>