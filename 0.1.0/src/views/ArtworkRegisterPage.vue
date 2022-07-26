<template>
    <div id="artworkRegisterPage">
        <div class="top">
            <div class="previousButton">취소</div>
            <div>작품명 입력</div>
            <div class="nextButton">다음</div>
        </div>
        <div class="bottom">
            <swiper v-bind="this.swiperOptions">
                <swiper-slide>Slide 1</swiper-slide>
                <swiper-slide>Slide 2</swiper-slide>
                <swiper-slide>Slide 3</swiper-slide>
                <swiper-slide>Slide 4</swiper-slide>
                <div class="nextButton"></div>
                <div class="prevButton"></div>
            </swiper>
        </div>
    </div>
</template>
<script>
    import SwiperCore, { Pagination, Navigation } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import "swiper/css/pagination";

    SwiperCore.use([Pagination, Navigation]);

    export default {
        name: 'ArtworkRegisterPage',
        components: {
            Swiper,
            SwiperSlide,
        },
        data() {
            return {
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
                        nextEl: '.nextButton',
                        prevEl: '.prevButton'
                    }
                },
            };
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {},
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {}
    }
</script>
<style lang="scss" scoped src="../scss/ArtworkRegisterPage/artworkRegisterPage.scss"></style>