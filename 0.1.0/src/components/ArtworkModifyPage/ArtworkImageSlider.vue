<template>
    <div class="artworkImageSlider" v-if="this.loadFlag">
        <swiper v-bind="this.swiperOptions">
            <swiper-slide v-for="(artworkImage, i) in this.artworkImages" :key="i">
                <ArtworkImageContainer :imageSrc="artworkImage" :ownClass="i.toString()"></ArtworkImageContainer>
            </swiper-slide>
            <div class="swiper-pagination"></div>
        </swiper>
    </div>
</template>
<script>
import ArtworkImageContainer from '../../widgets/ArtworkImageContainer.vue';

import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import "swiper/css/pagination";
import 'swiper/css';

SwiperCore.use([Pagination]);

export default {
    name: 'ArtworkImageSlider',
    components: {
        ArtworkImageContainer,
        Swiper,
        SwiperSlide,
    },
    props: {
        artwork: Object,
    },
    data() {
        return {
            artworkImages: [],
            loadFlag: false,
            swiperOptions: {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: false,
                centeredSlides: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            },
        };
    },
    async created() {
        this.artworkImages = await this.artwork.getAllImages()
        this.loadFlag = true
    },
}
</script>
<style lang="scss" scoped src="../../scss/ArtworkModifyPage/artworkImageSlider.scss">
</style>