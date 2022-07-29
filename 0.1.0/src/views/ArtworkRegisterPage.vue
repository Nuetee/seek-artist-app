<template>
    <div id="artworkRegisterPage">
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
            <swiper v-bind="this.swiperOptions" @slideChange="this.slideChange">
                <swiper-slide>
                    <TitleInput @activate-next-button="this.activateNextButton" @set-artwork-entity="this.setArtworkEntity"></TitleInput>
                </swiper-slide>
                <swiper-slide>
                    <ImageSelection @activate-next-button="this.activateNextButton" @set-artwork-entity="this.setArtworkEntity"></ImageSelection>
                </swiper-slide>
                <swiper-slide>
                    <BasicInformation @activate-next-button="this.activateNextButton" @set-artwork-entity="this.setArtworkEntity"></BasicInformation>
                </swiper-slide>
                <swiper-slide>
                    <Description @activate-next-button="this.activateNextButton" @set-artwork-entity="this.setArtworkEntity"></Description>
                </swiper-slide>
                <button class="next"></button>
                <button class="previous"></button>
            </swiper>
        </div>
    </div>
</template>
<script>
    import SwiperCore, { Pagination, Navigation } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import "swiper/css/pagination";
    import TitleInput from '@/components/ArtworkRegisterPage/TitleInput.vue';
    import ImageSelection from '@/components/ArtworkRegisterPage/ImageSelection.vue';
    import BasicInformation from '@/components/ArtworkRegisterPage/BasicInformation.vue';
    import Description from '@/components/ArtworkRegisterPage/Description.vue';

    SwiperCore.use([Pagination, Navigation]);

    export default {
        name: 'ArtworkRegisterPage',
        components: {
            Swiper,
            SwiperSlide,
            TitleInput,
            ImageSelection,
            BasicInformation,
            Description
        },
        data() {
            return {
                presentStep: ['작품명 입력', '이미지 선택', '상세정보 입력', '작품 설명 입력'],
                swiperIndex: 0,
                navigationButtons: [],
                fontColor: '#959595;',
                newArtwork: {
                    title: null,
                    images: null,
                    material: null,
                    type: null,
                    size: {
                        x: null,
                        y: null,
                        z: null,
                    },
                    unit: null,
                    year: null,
                    description: null
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
            };
        },
        mounted() {
            this.navigationButtons.push(document.getElementsByClassName('previous')[0])
            this.navigationButtons.push(document.getElementsByClassName('next')[0])
            
            this.navigationButtons[1].disabled = true
        },
        methods: {
            /*
            * - "다음" 또는 "<(이전)" 버튼을 누르면 활성화 되는 함수
            * - buttonIndex를 parameter로 받는다. "<"버튼은 buttonIndex == 0, "다음" 버튼은 buttonIndex == 1.
            * 1. "<" 또는 "다음" 버튼을 눌렀을 때, 실제 swiperNavigation이 binding 돼 있는 버튼의 click 이벤트를 발생시킨다.
            * : 실제 navigation을 관장하는 button은 배열 navigationButtons에 담겨있다.
            * 2. "다음" 버튼을 누른 경우(buttonIndex == 1) "다음" 버튼을 비활성화 한다.
            * 3. "<" 버튼을 누른 경우(buttonIndex == 0) "다음" 버튼을 활성화 한다.
            */
            swiperNavigation (buttonIndex) {
                this.navigationButtons[buttonIndex].click()
                if (buttonIndex === 1) {
                    this.navigationButtons[1].disabled = true
                    this.fontColor = '#959595'
                }
                else {
                    this.navigationButtons[1].disabled = false
                    this.fontColor = '#000000'
                }
            },
            slideChange (swiper) {
                this.swiperIndex = swiper.activeIndex
            },
            activateNextButton (isActive) {
                this.navigationButtons[1].disabled = !isActive

                if (isActive) {
                    this.fontColor = '#000000'
                }
                else {
                    this.fontColor = '#959595'
                }
            },
            setArtworkEntity (entity, value) {
                switch (entity) {
                    case 'title':
                        this.newArtwork.title = value
                        break
                    case 'images':
                        this.newArtwork.images = value
                        break
                    case 'material':
                        this.newArtwork.material = value
                        break
                    case 'type':
                        this.newArtwork.type = value
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
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/ArtworkRegisterPage/artworkRegisterPage.scss"></style>