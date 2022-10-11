<template>
    <div id="artworkModifyPage" v-if="this.artwork !== null" v-show="
    !this.textEdit && !this.imageEdit">
        <div class="frontPage" v-show="this.isFrontPage">
            <div class="header">
                <div class="backButton" @click="this.back">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 13L1 7L7 1" :stroke="this.artwork.getColor()" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
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
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.05433 9.66017C5.69795 9.66017 7.03054 8.32758 7.03054 6.68396H1.07812C1.07812 8.32758 2.41072 9.66017 4.05433 9.66017Z"
                                    :fill="this.artwork.getColor()" />
                                <path
                                    d="M10.3046 10.3046C9.28828 11.3209 7.93729 11.8803 6.5 11.8803C5.06271 11.8803 3.71172 11.3205 2.69541 10.3046C1.77635 9.38553 1.22483 8.17647 1.13327 6.88681H13V6.5C13 4.76395 12.3241 3.13128 11.0962 1.90383C9.86872 0.675933 8.23649 0 6.5 0C4.76351 0 3.13172 0.675933 1.90383 1.90383C0.675933 3.13172 0 4.76395 0 6.5C0 8.23605 0.675933 9.86872 1.90383 11.0962C3.13172 12.3241 4.76395 13 6.5 13C8.23605 13 9.86872 12.3241 11.0962 11.0962C11.465 10.7273 11.7888 10.3164 12.0573 9.87572C12.3057 9.46789 12.5081 9.03245 12.6601 8.58037H11.4641C11.1956 9.22301 10.8066 9.80213 10.3042 10.3046H10.3046ZM1.59017 4.29216C1.85696 3.69945 2.22887 3.16239 2.69541 2.69585C3.71172 1.67954 5.06271 1.12013 6.5 1.12013C7.93729 1.12013 9.28828 1.67998 10.3046 2.69585C10.7711 3.16239 11.143 3.69945 11.4098 4.29216C11.621 4.76088 11.7625 5.25633 11.8312 5.76712H1.16876C1.23797 5.2559 1.37946 4.76045 1.59017 4.29216Z"
                                    :fill="this.artwork.getColor()" />
                            </svg>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.05433 9.66017C5.69795 9.66017 7.03054 8.32758 7.03054 6.68396H1.07812C1.07812 8.32758 2.41072 9.66017 4.05433 9.66017Z"
                                    :fill="this.artwork.getColor()" />
                                <path
                                    d="M10.3046 10.3046C9.28828 11.3209 7.93729 11.8803 6.5 11.8803C5.06271 11.8803 3.71172 11.3205 2.69541 10.3046C1.77635 9.38553 1.22483 8.17647 1.13327 6.88681H13V6.5C13 4.76395 12.3241 3.13128 11.0962 1.90383C9.86872 0.675933 8.23649 0 6.5 0C4.76351 0 3.13172 0.675933 1.90383 1.90383C0.675933 3.13172 0 4.76395 0 6.5C0 8.23605 0.675933 9.86872 1.90383 11.0962C3.13172 12.3241 4.76395 13 6.5 13C8.23605 13 9.86872 12.3241 11.0962 11.0962C11.465 10.7273 11.7888 10.3164 12.0573 9.87572C12.3057 9.46789 12.5081 9.03245 12.6601 8.58037H11.4641C11.1956 9.22301 10.8066 9.80213 10.3042 10.3046H10.3046ZM1.59017 4.29216C1.85696 3.69945 2.22887 3.16239 2.69541 2.69585C3.71172 1.67954 5.06271 1.12013 6.5 1.12013C7.93729 1.12013 9.28828 1.67998 10.3046 2.69585C10.7711 3.16239 11.143 3.69945 11.4098 4.29216C11.621 4.76088 11.7625 5.25633 11.8312 5.76712H1.16876C1.23797 5.2559 1.37946 4.76045 1.59017 4.29216Z"
                                    :fill="this.artwork.getColor()" />
                            </svg>
                        </div>
                        <div class="archiveCount poppins">{{this.artwork.getArchiveCount() }}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="artist">{{ this.artwork.getArtistName() }}</div>
                    <div class="snsLink" v-if="this.artwork.getArtist().getSNS() !== ''">
                        <a :href="this.artwork.getArtist().getSNS()">
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
                        </a>
                    </div>
                </div>
            </div>
            <swiper v-bind="this.swiperOptions">
                <swiper-slide v-for="(imageInfo, i) in this.artworkImageInfo" :key="i">
                    <div class="image" v-if="imageInfo.style !== 'video'">
                        <img class="background" :src="imageInfo.src" :style="imageInfo.background_style">
                        <img class="main" :src="imageInfo.src" :style="imageInfo.style">
                    </div>
                    <div v-else class="video">
                        <img :src="imageInfo.background_src" :style="imageInfo.background_style">
                        <video :src="imageInfo.src" controls></video>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination"></div>
            </swiper>
            <Drawer ref="commentDrawer" :class="'comment'">
                <template v-slot:default>
                    <CommentComponent ref="commentComponent" @commentUpdate="this.updateDone" :artwork="this.artwork">
                    </CommentComponent>
                </template>
            </Drawer>
            <Drawer ref="informationDrawer" :class="'information'">
                <template v-slot:default>
                    <ArtworkInformation :artwork="this.artwork"></ArtworkInformation>
                </template>
            </Drawer>
        </div>
        <div class="editPage" v-show="!this.isFrontPage">
            <div>
                <div class="imageEditButton" @click="this.showEditPage('image')">
                    <svg width="70" height="58" viewBox="0 0 70 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M67.0833 49.3333C67.0833 50.9025 66.46 52.4075 65.3504 53.517C64.2408 54.6266 62.7359 55.25 61.1667 55.25H7.91667C6.34747 55.25 4.84254 54.6266 3.73295 53.517C2.62336 52.4075 2 50.9025 2 49.3333V16.7917C2 15.2225 2.62336 13.7175 3.73295 12.608C4.84254 11.4984 6.34747 10.875 7.91667 10.875H19.75L25.6667 2H43.4167L49.3333 10.875H61.1667C62.7359 10.875 64.2408 11.4984 65.3504 12.608C66.46 13.7175 67.0833 15.2225 67.0833 16.7917V49.3333Z"
                            stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M34.5416 43.4167C41.077 43.4167 46.3749 38.1187 46.3749 31.5833C46.3749 25.048 41.077 19.75 34.5416 19.75C28.0062 19.75 22.7083 25.048 22.7083 31.5833C22.7083 38.1187 28.0062 43.4167 34.5416 43.4167Z"
                            stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>이미지 수정</p>
                </div>
                <div class="textEditButton" @click="this.showEditPage('text')">
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35 58.3333H61.25" stroke="black" stroke-width="4" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M48.125 10.2084C49.2853 9.0481 50.8591 8.39624 52.5 8.39624C53.3125 8.39624 54.1171 8.55628 54.8677 8.86721C55.6184 9.17815 56.3005 9.63389 56.875 10.2084C57.4495 10.783 57.9053 11.465 58.2162 12.2157C58.5271 12.9664 58.6872 13.7709 58.6872 14.5834C58.6872 15.3959 58.5271 16.2005 58.2162 16.9512C57.9053 17.7018 57.4495 18.3839 56.875 18.9584L20.4167 55.4168L8.75 58.3334L11.6667 46.6668L48.125 10.2084Z"
                            stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>텍스트 수정</p>
                </div>
            </div>
            <div class="popup" v-show="this.deletePopupFlag">
                <div class="guidance">아트워크를<br />삭제하시겠습니까?</div>
                <div class="buttonContainer">
                    <div class="firstButton deleteButton" @click="this.deleteArtwork()">삭제</div>
                    <div class="cancelButton" @click="() => { this.deletePopupFlag = false }">취소</div>
                </div>
            </div>
            <div class="popup" v-show="this.submitPopupFlag">
                <div class="guidance">수정사항 반영에는<br />최대 10분이<br />소요될 수 있습니다.</div>
                <div class="buttonContainer">
                    <div class="firstButton modifyButton" @click="this.submitArtwork()">수정</div>
                    <div class="cancelButton" @click="() => { this.submitPopupFlag = false }">취소</div>
                </div>
            </div>
        </div>
        <div class="buttonContainer">
            <CommentButton ref="commentButton" :color="buttonColor"     
                @comment-button-click="this.showComment"
                @cancel-edit="this.cancelEdit()"></CommentButton>
            <EditButton ref="editButton" :color="buttonColor" @switch-page="this.switchPage()"
                @show-submit-popup="(isShow) => { this.submitPopupFlag = isShow }">
            </EditButton>
            <ShareButton ref="shareButton" :color="buttonColor" :artwork="this.artwork"
                @show-delete-popup="(isShow) => { this.deletePopupFlag = isShow }">
            </ShareButton>
        </div>
        <SideBar ref="sideBar"></SideBar>
    </div>
    <TextModification ref="textModification" v-if="this.artwork !== null" v-show="!this.isFrontPage && this.textEdit"
        :artwork="this.artwork" @close-text-modification="this.closeEditPage"></TextModification>
    <ImageModification ref="imageModification" v-if="this.artwork !== null" v-show="!this.isFrontPage && this.imageEdit"
        :originalArtwork="this.artwork" @close-image-modification="this.closeEditPage"></ImageModification>
    <div v-if="this.loading" id="loading">
        <va-progress-circle indeterminate />
    </div>
</template>
<script>
    import RoundProfile from '@/widgets/RoundProfile.vue';
    import ShareButton from '@/widgets/ShareButton.vue';
    import EditButton from '@/widgets/EditButton.vue';
    import CommentButton from '@/components/ArtworkModifyPage/CommentButton.vue';
    import CommentComponent from '@/components/ArtworkModifyPage/CommentComponent.vue';
    import SideBar from '@/widgets/SideBar.vue'

    import SwiperCore, { Pagination } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';

    import { cropImage } from '@/modules/image';
    import { Artwork } from '@/classes/artwork';
    import { isAuth, getAuth } from '@/modules/auth';
    import { deleteArtworkDirectory } from '@/modules/storage';

    import TextModification from '@/components/ArtworkModifyPage/TextModification.vue';
    import ImageModification from '@/components/ArtworkModifyPage/ImageModification.vue'
    import Drawer from '@/widgets/Drawer.vue';
    import ArtworkInformation from '@/components/ArtworkModifyPage/ArtworkInformation.vue'

    SwiperCore.use([Pagination]);

    export default {
        name: 'ArtworkModifyPage',
        components: {
            RoundProfile,
            ShareButton,
            CommentButton,
            CommentComponent,
            SideBar,
            EditButton,
            Swiper,
            SwiperSlide,
            TextModification,
            ImageModification,
            Drawer,
            ArtworkInformation
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
                isFrontPage: true,
                submitPopupFlag: false,
                deletePopupFlag: false,
                loading: false,
                
                commentBar: null,
                commentBarHeight: null,
                drawingBar: null,
                resizeFlag: true,
                commentOpened: false,

                updateInProgress: false,
                buttonColor: 'black',
                imageEdit: false,
                textEdit: false,

                drawStart: false,
                touchStart: 0,
                touchEnd: 0,

                swiperOptions: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: false,
                    centeredSlides: true,
                    resistanceRatio: 0,
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
            window.addEventListener('resize', this.setCommentBarPosition)

            // Check login and load user thumbnail
            if(isAuth()) {
                // Fetch profile thumbnail and set
                this.user = getAuth()
                this.userThumbnail = this.user.getThumbnail()
            }
            else {
                this.$router.replace('/login')
                return
            }
            this.userThumbnailLoadFlag = true

            // Load artwork
            let artwork = await new Artwork(this.id).init()
            await artwork.initializePage()

            // If the current user is not owner of artwork, go back to home
            if (getAuth().getID() !== artwork.getArtist().getID()) {
                alert('접근 권한이 없습니다.')
                this.$router.replace('/')
                return
            }
            
            this.artwork = artwork
            
            this.buttonColor = artwork.getColor()
            await this.getArtworkImages()

            document.getElementsByClassName('frontPage')[0].addEventListener('click', (e)=> {
                if (_this.$refs.informationDrawer.drawer_opened) {
                    _this.$refs.informationDrawer.closeDrawer()
                    _this.$refs.commentDrawer.closeDrawer()
                }
                else if (!_this.$refs.commentDrawer.drawer_opened) {
                    _this.$refs.informationDrawer.showDrawer()
                }
                else {
                    _this.$refs.commentDrawer.closeDrawer()
                }
            })

            if (artwork.getColor() === 'black') {
                document.getElementById('artworkModifyPage').style.setProperty('--color', 'black')
            }
        },
        updated () {
            const _this = this
            // Scroll Listener
            document.getElementById('artworkModifyPage').addEventListener('scroll', async function (event) {
                if (_this.updateInProgress) {
                    return false
                }

                let scroll_height = event.target.scrollHeight
                let scroll_top = parseInt(event.target.scrollTop) + 1
                let offset_height = parseInt(event.target.offsetHeight) + 1

                if (scroll_height <= scroll_top + offset_height) {
                    _this.updateInProgress = true
                    await _this.$refs.commentComponent.load()
                }
            })
        },
        methods: {
            async getArtworkImages () {
                let artworkImages = await this.artwork.getAllImages()
                let container_ratio = window.innerWidth / window.innerHeight

                if (window.innerWidth >= 480) {
                    container_ratio = 480 / window.innerHeight
                }

                for (let i = 0; i < artworkImages.length; i++) {
                    let background_style = await cropImage(artworkImages[i], container_ratio)
                    let style = await cropImage(artworkImages[i], container_ratio, false)

                    let imageInfo = new Object()
                    imageInfo.src = artworkImages[i]
                    imageInfo.style = style
                    imageInfo.background_style = background_style

                    this.artworkImageInfo.push(imageInfo)
                }

                let video_index = await this.artwork.isVideo()
                
                if (video_index !== null) {
                    let video = new Object()
                    video.src = await this.artwork.getVideo()
                    video.style = 'video'

                    if (artworkImages.length !== 0) {
                        video.background_src = await this.artwork.getThumbnailImage()
                        video.background_style = await cropImage(video.background_src, container_ratio)
                    }
                    else {
                        video.background_src = ''
                        video.background_style = ''
                    }
                    this.artworkImageInfo.splice(video_index, 0, video)
                }
            },
            // - backButton을 눌렀을 때 뒤로가기 이벤트를 실행시키는 함수.
            back() {
                window.history.back()
            },
            cancelEdit () {
                this.$refs.textModification.reset()
                this.$refs.imageModification.back()
                this.switchPage()
            },
            async deleteArtwork() {
                if (!this.artwork) {
                    return
                }
                else {
                    await deleteArtworkDirectory(this.artwork.getPageID())

                    // For production
                    if (process.env.NODE_ENV === 'production') {
                        await this.artwork.deleteArtwork()
                    }
                    // For development
                    else {
                        await this.artwork.deletePreArtwork()
                    }
                
                    this.$router.replace('/')
                }
            },
            async submitArtwork () {
                this.submitPopupFlag = false
                this.loading = true
                await this.$refs.textModification.submit()
                await this.$refs.imageModification.submit()
                this.artworkImageInfo = []
                await this.getArtworkImages()
                this.loading = false
                this.isFrontPage = false
                this.switchPage()
            },
            switchPage () {
                if (this.isFrontPage) {
                    this.buttonColor = 'black'
                }
                else {
                    this.buttonColor = this.artwork.getColor()
                }
                
                this.$refs.commentButton.switchButton(!this.isFrontPage)
                this.$refs.editButton.switchButton(!this.isFrontPage)
                this.$refs.shareButton.switchButton(!this.isFrontPage)

                this.isFrontPage = !this.isFrontPage
            },
            showEditPage (page) {
                (page === 'image') ? (this.imageEdit = true) : (this.textEdit = true)
            },
            closeEditPage(page) {
                (page === 'image') ? (this.imageEdit = false) : (this.textEdit = false)
            },
            openSideBar (event) {
                this.$refs.sideBar.openSideBar(event)
            },
            popHistory() {
                if (!this.minimized) {
                    window.history.back()
                }
            },
            setBackground() {
                if (this.minimized) {
                    return 'display: none'
                }
                else return
            },
            updateDone () {
                this.updateInProgress = false
            },
            setCommentBarPosition() {
                if (this.commentOpened === false) {
                    return
                }
                this.commentBar.style.setProperty('transition', 'none')
                this.commentBarHeight = this.commentBar.clientHeight
                this.commentBar.style.setProperty('bottom', `${this.commentBarHeight - 10}px`)

                const _this = this

                if (this.resizeFlag) {
                    this.resizeFlag = false

                    setTimeout(() => {
                        _this.commentBar.style.setProperty('transition', 'bottom 0.5s')
                        _this.resizeFlag = true
                    }, 300)
                }
            },
            showComment() {
                this.$refs.commentDrawer.showDrawer()
            },
            /*
            * 1. touchEvent가 발생한 지점의 y position 값을 touchStart에 저장.
            * 2. draw event가 발생중임을 drawStart에 저장
            */
            setTouchStart(event) {
                this.touchStart = event.changedTouches[0].clientY
                this.drawStart = true
                this.commentBar.style.setProperty('transition', 'none')
            },
            setTouchMove (event) {
                if (this.drawStart === false)
                    return

                let touchMove = event.changedTouches[0].clientY;
                
                let distance = touchMove - this.touchStart

                if (distance > 0) {
                    let commentBarInitialBottom = this.commentBarHeight - 10

                    this.commentBar.style.setProperty('bottom', `${commentBarInitialBottom - distance}px`)
                }
            },
            setTouchEnd (event) {
                if (this.drawStart === false)
                    return
                
                this.commentBar.style.setProperty('transition', 'bottom 0.5s')
                let touchEnd = event.changedTouches[0].clientY

                let distance = touchEnd - this.touchStart
                const standardDistance = window.innerWidth * 0.2

                if (distance > standardDistance) {
                    this.commentBar.style.setProperty('bottom', '0')
                    this.commentOpened = false
                }
                else {
                    this.commentBar.style.setProperty('bottom', `${this.commentBarHeight - 10}px`)
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/ArtworkModifyPage/artworkModifyPage.scss"></style>