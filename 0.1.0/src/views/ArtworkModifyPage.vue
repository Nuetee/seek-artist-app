<template>
    <div id="artworkModifyPage" v-if="this.artwork !== null">
        <div class="header">
            <div class="backButton">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <RoundProfile v-if="this.userThumbnailLoadFlag" :profile="this.userThumbnail"
                @click="this.openSideBar($event)" />
        </div>
        <div class="body" :style="'color: ' + this.artwork.getColor()">
            <div class="top">
                <div class="artworkTitle poppins">{{ this.artwork.getName() }}</div>
                <div class="archiveInformation">
                    <div class="archiveLogo">
                        <div class="eye">
                            <svg class="eyelid" width="36" height="34" viewBox="0 0 36 34" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path :stroke="(this.artwork.getColor() === 'white') ? '#fff' : '#000'"
                                    d="M18.0002 0C13.1921 0 8.67214 1.76831 5.27225 4.97929C1.87235 8.19028 0 12.4591 0 17C0 21.5409 1.87235 25.8101 5.27225 29.0207C8.67179 32.2317 13.1921 34 18.0002 34C22.8083 34 27.3286 32.2317 30.7281 29.0207C32.76 27.1018 34.2897 24.7367 35.1516 22.181L35.2706 21.828H33.571L33.5047 22.0114C32.6954 24.2509 31.3758 26.2454 29.5826 27.9392C26.4888 30.8611 22.3753 32.4703 17.9998 32.4703C13.6243 32.4703 9.51119 30.8611 6.41737 27.9392C3.32356 25.0173 1.70103 21.3148 1.62253 17.2918H35.4767V17.2708H36V17C36 12.4591 34.1277 8.19028 30.7278 4.97929C27.3279 1.76831 22.8079 0 17.9998 0H18.0002ZM18.0002 1.52967C22.3757 1.52967 26.4888 3.13888 29.583 6.06079C31.0027 7.40158 32.1345 8.9458 32.9474 10.6508C33.7173 12.2651 34.1814 13.9833 34.3294 15.7618H1.67128C1.81894 13.9833 2.28344 12.2654 3.05331 10.6508C3.86619 8.9458 4.99806 7.40158 6.41773 6.06079C9.51155 3.13888 13.625 1.52967 18.0002 1.52967Z"
                                    :fill="(this.artwork.getColor() === 'white') ? '#fff' : '#000'" />
                            </svg>
                            <svg class="pupil" width="17" height="8" viewBox="0 0 17 8" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path :stroke="(this.artwork.getColor() === 'white') ? '#fff' : '#000'"
                                    d="M8.5 8C13.1944 8 17 4.41829 17 0H0C0 4.41829 3.80556 8 8.5 8Z"
                                    :fill="(this.artwork.getColor() === 'white') ? '#fff' : '#000'" />
                            </svg>
                        </div>
                        <div class="eye">
                            <svg class="eyelid" width="36" height="34" viewBox="0 0 36 34" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path :stroke="(this.artwork.getColor() === 'white') ? '#fff' : '#000'"
                                    d="M18.0002 0C13.1921 0 8.67214 1.76831 5.27225 4.97929C1.87235 8.19028 0 12.4591 0 17C0 21.5409 1.87235 25.8101 5.27225 29.0207C8.67179 32.2317 13.1921 34 18.0002 34C22.8083 34 27.3286 32.2317 30.7281 29.0207C32.76 27.1018 34.2897 24.7367 35.1516 22.181L35.2706 21.828H33.571L33.5047 22.0114C32.6954 24.2509 31.3758 26.2454 29.5826 27.9392C26.4888 30.8611 22.3753 32.4703 17.9998 32.4703C13.6243 32.4703 9.51119 30.8611 6.41737 27.9392C3.32356 25.0173 1.70103 21.3148 1.62253 17.2918H35.4767V17.2708H36V17C36 12.4591 34.1277 8.19028 30.7278 4.97929C27.3279 1.76831 22.8079 0 17.9998 0H18.0002ZM18.0002 1.52967C22.3757 1.52967 26.4888 3.13888 29.583 6.06079C31.0027 7.40158 32.1345 8.9458 32.9474 10.6508C33.7173 12.2651 34.1814 13.9833 34.3294 15.7618H1.67128C1.81894 13.9833 2.28344 12.2654 3.05331 10.6508C3.86619 8.9458 4.99806 7.40158 6.41773 6.06079C9.51155 3.13888 13.625 1.52967 18.0002 1.52967Z"
                                    :fill="(this.artwork.getColor() === 'white') ? '#fff' : '#000'" />
                            </svg>
                            <svg class="pupil" width="17" height="8" viewBox="0 0 17 8" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path :stroke="(this.artwork.getColor() === 'white') ? '#fff' : '#000'"
                                    d="M8.5 8C13.1944 8 17 4.41829 17 0H0C0 4.41829 3.80556 8 8.5 8Z"
                                    :fill="(this.artwork.getColor() === 'white') ? '#fff' : '#000'" />
                            </svg>
                        </div>
                    </div>
                    <div class="archiveCount poppins">{{this.artwork.getArchiveCount() }}</div>
                </div>
            </div>
            <div class="bottom">
                <div class="artist">{{ this.artwork.getArtist().nickname }}</div>
                <div class="snsLink" v-if="this.artwork.getArtist().getSNS() !== ''">
                    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.1667 1.66699H5.83332c-2.30118 0-4.16666 1.86548-4.16666 4.16667V14.167c0 2.3012 1.86548 4.1667 4.16666 4.1667h8.33338c2.3011 0 4.1666-1.8655 4.1666-4.1667V5.83366c0-2.30119-1.8655-4.16667-4.1666-4.16667Z"
                            :stroke="this.artwork.getColor()" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M13.3333 9.47525c.1029.69355-.0156 1.40185-.3385 2.02415-.3229.6224-.8338 1.127-1.4601 1.4422-.6263.3153-1.336.425-2.0282.3136-.69222-.1114-1.33169-.4382-1.82746-.934-.49577-.4957-.82259-1.1352-.93397-1.8274-.11139-.69226-.00167-1.40197.31355-2.02824.31521-.62626.81988-1.13719 1.44221-1.46011.62233-.32291 1.33064-.44138 2.02417-.33853.7074.1049 1.3624.43455 1.8681.94025.5057.50571.8353 1.16065.9402 1.86808ZM14.5833 5.41699h.01"
                            :stroke="this.artwork.getColor()" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="buttonContainer">
            <CommentButton ref="commentButton" @comment-button-click=""></CommentButton>
            <EditButton :color="this.artwork.getColor()">
            </EditButton>
            <ShareButton ref="shareButton" :artwork="this.artwork"></ShareButton>
        </div>
        <swiper v-bind="this.swiperOptions">
            <swiper-slide v-for="(imageInfo, i) in this.artworkImageInfo" :key="i">
                <img :src="imageInfo.src" :style="imageInfo.style">
            </swiper-slide>
            <div class="swiper-pagination"></div>
        </swiper>
        <SideBar :minimized="this.minimized" @closeSideBar="this.closeSideBar()"></SideBar>
        <div class="background" :style="this.setBackground()" @click="this.closeSideBar"></div>
    </div>
</template>
<script>
    import RoundProfile from '@/widgets/RoundProfile.vue';
    import ShareButton from '@/widgets/ShareButton.vue';
    import EditButton from '@/widgets/EditButton.vue';
    import CommentButton from '@/components/ArtworkModifyPage/CommentButton.vue';
    import SideBar from '@/widgets/SideBar.vue'

    import SwiperCore, { Pagination } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';

    import { cropImage } from '@/modules/image';
    import { Artwork } from '@/classes/artwork';
    import { isAuth, getAuth } from '@/modules/auth';

    SwiperCore.use([Pagination]);

    export default {
        name: 'ArtworkModifyPage',
        components: {
            RoundProfile,
            ShareButton,
            CommentButton,
            SideBar,
            EditButton,
            Swiper,
            SwiperSlide
        },
        data() {
            return {
                id: this.$route.query.id,
                source: (this.$route.query.utm_source) ? this.$route.query.utm_source : '',
                artwork: null,
                artworkImageInfo: [],
                user: null,
                userThumbnail: '',
                userThumbnailLoadFlag: false,
                minimized: true,
                swiperOptions: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: false,
                    centeredSlides: true,
                    pagination: {
                        el: '.swiper-pagination'
                    }
                }
            };
        },
        async created() {
            const _this = this
            window.onpopstate = function (event) {
                if(_this.minimized == false) {
                    _this.minimized = true
                    return
                }
            }
            let artwork = await new Artwork(this.id).init()
            this.artwork = artwork
            console.log(artwork.getArtist().getSNS())

            let artworkImages = await artwork.getAllImages()
            let container_ratio = window.innerWidth/window.innerHeight

            for(let i = 0; i < artworkImages.length; i++) {
                let style = await cropImage(artworkImages[i], container_ratio)

                let imageInfo = new Object()
                imageInfo.src = artworkImages[i]
                imageInfo.style = style

                this.artworkImageInfo.push(imageInfo)
            }

            if(isAuth()) {
                // Fetch profile thumbnail and set
                this.user = getAuth()
                this.userThumbnail = this.user.getThumbnail()
            }

            this.userThumbnailLoadFlag = true
        },
        updated() {},
        methods: {
            openSideBar (event) {
                if (event.stopPropagation) event.stopPropagation();
                else event.cancelBubble = true; // IE 대응
                
                window.history.pushState(null, '', location.href)
                this.minimized = false
            },
            closeSideBar() {
                if (!this.minimized) {
                    window.history.back()
                }
            },
            setBackground() {
                if (this.minimized) {
                    return 'display: none'
                }
                else return
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/ArtworkModifyPage/artworkModifyPage.scss"></style>