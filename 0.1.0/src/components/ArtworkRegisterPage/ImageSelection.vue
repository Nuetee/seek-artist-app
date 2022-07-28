<template>
    <div id="imageSelection">
        <div>권장 비율 3 : 5</div>
        <swiper v-bind="this.swiperOptions">
            <swiper-slide id="imageAddition">+</swiper-slide>
        </swiper>
    </div>
</template>
<script>
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';

    export default {
        name: 'ImageSelection',
        components: {
            Swiper,
            SwiperSlide,
        },
        data() {
            return {
                selectedImages: [],
                swiperOptions: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: false,
                    centeredSlides: true,
                    allowTouchMove: true,
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
<style lang="scss" scoped src="../../scss/ArtworkRegisterPage/imageSelection.scss"></style>