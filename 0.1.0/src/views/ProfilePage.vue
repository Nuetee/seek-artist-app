<template>
    <div id="profilePage">
        <div id="top">
            <div class="profileControlButton"
                @click="(event) => { this.showControlBox = !this.showControlBox; this.stopPropagation(event)}">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div class="profileControlBox" v-show="this.showControlBox">
                <div>프로필 편집</div>
                <div>프로필 링크복사</div>
                <div>로그아웃</div>
            </div>
            <div class="name">
                {{ (this.user === null ? 'Guest' : this.user.getNickname()) }}
            </div>
            <RoundProfile :profile="this.user.getProfile()"></RoundProfile>
            <div class="navigationBar">
                <va-tabs id="tabs" v-model="this.tab_index" color="#ffffff" grow>
                    <template #tabs>
                        <va-tab @click="this.clickTab(tab_index)">
                            홈
                        </va-tab>
                        <va-tab @click="this.clickTab(tab_index)">
                            작업
                        </va-tab>
                        <va-tab @click="this.clickTab(tab_index)">
                            전시
                        </va-tab>
                    </template>
                </va-tabs>
            </div>
        </div>
        <div id="bottom">
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
</template>
<script>
import RoundProfile from '@/widgets/RoundProfile.vue';
import ArtworkCardList from '@/widgets/ArtworkCardList.vue';
import ExhibitionList from '../components/ProfilePage/ExhibitionList.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { isAuth, getAuth } from '@/modules/auth';

export default {
    name: 'ProfilePage',
    components: {
        RoundProfile,
        ArtworkCardList,
        ExhibitionList,
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            user: null,
            showControlBox: false,
            tab_index: 1,
            pre_activated_tab: 1,

            loadFlag: false,
            artworkIdList: [],
            exhibitionPageIdList: [],
            nothingToUpdate: {
                artwork: false,
                exhibition: false
            },
            updateInProgress: false,

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
    beforeCreate() {},
    async created() {
        if (isAuth()) {
            this.user = getAuth()
            this.artworkIdList = await this.rebuildList(true, 0, 12, this.artworkIdList)
            this.exhibitionPageIdList = await this.rebuildList(false, 0, 12, this.exhibitionPageIdList)
        }
        else {
            this.nothingToUpdate = true
        }
        this.loadFlag = true
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    methods: {
        stopPropagation(event) {
            // event 전파 방지
            if (event.stopPropagation) event.stopPropagation();
            else event.cancelBubble = true; // IE 대응
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
        slideChange(swiper) {
            this.tab_index = swiper.activeIndex
        },
        async rebuildList(is_artwork, offset, length, list) {
            let newList = []
            if (is_artwork) {
                newList = await this.user.getOwnArtworks(offset, length)
            }
            else {
                newList = await this.user.getTotalExhibitions(offset, length)
            }

            if (newList.length < 12) {
                if (is_artwork)
                    this.nothingToUpdate.artwork = true
                else
                    this.nothingToUpdate.exhibition = true
            }

            return list.concat(newList)
        },
    }
}
</script>
<style lang="scss" scoped src="../scss/ProfilePage/profilePage.scss"></style>