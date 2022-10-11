<template>
    <div id="preview">
        <div class="card">
            <div class="front" :style="'color:' + this.textColor">
                <div class="imageContainer">
                    <img class="background" :src="image.src" :style="image.background_style" />
                    <img class="main" :src="image.src" :style="image.style" />
                </div>
                <div class="artworkInfo poppins">
                    <div class="artworkTitle">
                        {{ this.title }}
                    </div>
                    <div class="artist">
                        {{ (this.user === null ? 'Guest' : this.user.getNickname()) }}
                        <div class="snsLink" v-if="this.user.getSNS() !== ''">
                            <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.1667 1.66699H5.83332c-2.30118 0-4.16666 1.86548-4.16666 4.16667V14.167c0 2.3012 1.86548 4.1667 4.16666 4.1667h8.33338c2.3011 0 4.1666-1.8655 4.1666-4.1667V5.83366c0-2.30119-1.8655-4.16667-4.1666-4.16667Z"
                                    :stroke="this.textColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M13.3333 9.47525c.1029.69355-.0156 1.40185-.3385 2.02415-.3229.6224-.8338 1.127-1.4601 1.4422-.6263.3153-1.336.425-2.0282.3136-.69222-.1114-1.33169-.4382-1.82746-.934-.49577-.4957-.82259-1.1352-.93397-1.8274-.11139-.69226-.00167-1.40197.31355-2.02824.31521-.62626.81988-1.13719 1.44221-1.46011.62233-.32291 1.33064-.44138 2.02417-.33853.7074.1049 1.3624.43455 1.8681.94025.5057.50571.8353 1.16065.9402 1.86808ZM14.5833 5.41699h.01"
                                    :stroke="this.textColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SwiperCore, { Pagination } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import "swiper/css/pagination";
    import { getAuth, isAuth } from '@/modules/auth';

    SwiperCore.use([Pagination]);

    export default {
        name: 'Preview',
        components: { 
            Swiper,
            SwiperSlide
        },
        props: {
            image: Object,
            title: String,
            textColor: String
        },
        data() {
            return {
                user: null,
                card: null,
                isFlipped: false,
                showMoreButton: false,
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
        beforeCreate() {},
        created() {
            if (isAuth()) {
                this.user = getAuth()
            }
        },
        beforeMount() {},
        mounted() {},
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {}
    }
</script>
<style lang="scss" scoped src="../scss/widgets/preview.scss"></style>