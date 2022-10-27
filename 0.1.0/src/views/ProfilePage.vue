<template>
    <div id="profilePage" @click="() => { this.$refs.mainProfile.showControlBox = false }">
        <MainProfile ref="mainProfile"></MainProfile>
        <div class="bottom">
            <div class="tab">
                <div class="navigationBar">
                    <va-tabs id="tabs" v-model="this.tab_index" color="black" grow>
                        <template #tabs>
                            <va-tab color="black"
                                @click="this.clickTab(tab_index)">
                                홈
                            </va-tab>
                            <va-tab color="black"
                                @click="this.clickTab(tab_index)">
                                작업
                            </va-tab>
                            <va-tab color="black" 
                                @click="this.clickTab(tab_index)">
                                전시
                            </va-tab>
                        </template>
                    </va-tabs>
                </div>
            </div>
            <div class="tabBody">
                <swiper v-bind="this.swiperOptions" @slideChange="this.slideChange" @init="(swiper) => {this.swiper = swiper}">
                    <swiper-slide>
                        <div>
                            홈
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <ArtworkCardList v-if="this.loadFlag" :artworkIdList="this.artworkIdList">
                        </ArtworkCardList>
                    </swiper-slide>
                    <swiper-slide>
                        <ExhibitionList :exhibition_pageId_list="this.exhibitionPageIdList"></ExhibitionList>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <UploadButton></UploadButton>
    </div>
</template>
<script>

import MainProfile from '../components/ProfilePage/MainProfile.vue'
import ArtworkCardList from '@/widgets/ArtworkCardList.vue';
import ExhibitionList from '../components/ProfilePage/ExhibitionList.vue'
import UploadButton from '@/components/MyPage/UploadButton.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { isAuth, getAuth } from '@/modules/auth';


export default {
    name: 'ProfilePage',
    components: {
        MainProfile,
        ArtworkCardList,
        ExhibitionList,
        UploadButton,
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            minimized: true,
            user: null,
            profile: '',
            loadFlag: false,
            artworkIdList: [],
            exhibitionPageIdList: [],
            nothingToUpdate: false,
            updateInProgress: false,

            tab_index: 1,
            pre_activated_tab: 1,

            swiper: null,
            swiperOptions: {
                initialSlide: 1,
                slidesPerView: 1,
                loop: false,
                centeredSlides: true,
                allowTouchMove: true,
            },
        };
    },
    async created() {
        const _this = this
        /*
        * - popstate 이벤트는 뒤로가기 (back button이나 history.back() 호출)시에 발생.
        * SideBar가 펼쳐진 상태(this.minimized == false)에서 뒤로가기 버튼을 누르면 closeSideBar()함수를 호출한다.
        */
        window.onpopstate = function (event) {
            if (_this.minimized == false) {
                _this.minimized = true
                return
            }
        }

        //Update session
        if (isAuth()) {
            this.user = getAuth()
            await this.rebuild(0, 12)
            this.profile = this.user.getProfile()
        }
        else {
            this.nothingToUpdate = true
        }
        this.loadFlag = true
    },
    mounted() {
        const _this = this

        // Scroll Listener
        document.getElementById('profilePage').addEventListener('scroll', async function (event) {
            const scroll_height = event.target.scrollHeight
            const scroll_top = event.target.scrollTop
            const offset_height = event.target.offsetHeight
            if (scroll_height === scroll_top + offset_height) {
                await _this.load()
            }
        })
    },
    methods: {
        slideChange(swiper) {
            this.tab_index = swiper.activeIndex
        },
        /**
         * 
         * @param {Number} activated_tab // click한 navigationBar Tab의 index
         * 클릭한 tab의 index에 해당되는 swiper-slide로 slide 이동.
         */
        clickTab(clicked_tab) {
            this.swiper.slideTo(clicked_tab, 300, true)
            return
        },
        openSideBar(event) {
            this.$refs.sideBar.openSideBar(event)
        },
        async rebuild(offset, length) {
            const newArtworkIdList = await this.user.getOwnArtworks(offset, length)
            const newExhibitionPageIdList = await this.user.getTotalExhibitions(offset, length)
            this.artworkIdList = this.artworkIdList.concat(newArtworkIdList)
            this.exhibitionPageIdList = this.exhibitionPageIdList.concat(newExhibitionPageIdList)
            if (newArtworkIdList.length < 12 && newExhibitionPageIdList.length < 12) {
                this.nothingToUpdate = true
            }
        },
        async load() {
            if (this.updateInProgress) {
                return false
            }
            this.updateInProgress = true

            if (!this.nothingToUpdate) {
                await this.rebuild(this.artworkIdList.length, 12)
            }

            this.updateInProgress = false
        }
    }
}
</script>
<style lang="scss" scoped src="../scss/ProfilePage/profilePage.scss">

</style>