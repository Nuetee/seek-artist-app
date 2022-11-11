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
            <RoundProfile ref="roundProfile" :profile="this.user.getProfile()"></RoundProfile>
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
            <div class="sortingStrategyTab" v-show="this.tab_index">
                <svg class="doubleColumnStrategy sortingStrategy" @click="this.setSortingStrategy($event)" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="6.30695" height="6.30695" rx="2"/>
                    <rect y="7.45361" width="6.30695" height="6.30695" rx="2"/>
                    <rect x="7.45361" width="6.30695" height="6.30695" rx="2"/>
                    <rect x="7.45361" y="7.45361" width="6.30695" height="6.30695" rx="2"/>
                </svg>
                <svg class="singleColumnStrategy" @click="this.setSortingStrategy($event)" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="14" height="6" rx="2"/>
                    <rect y="8" width="14" height="6" rx="2"/>
                </svg>
            </div>
        </div>
        <div id="bottom">
            <swiper v-bind="this.swiperOptions" @slideChange="this.slideChange" @init="(swiper) => {this.swiper = swiper;}">
                <swiper-slide>
                    <div>
                        홈
                    </div>
                </swiper-slide>
                <swiper-slide class="secondSlide">
                    <List ref="artworkList" 
                    :is_artwork="true"
                    :single_column="this.is_single_column.artwork_list"
                    :id_list="this.artworkIdList"></List>
                </swiper-slide>
                <swiper-slide class="thirdSlide">
                    <!-- <ExhibitionList :exhibition_pageId_list="this.exhibitionPageIdList"></ExhibitionList> -->
                    <List ref="exhibitionList" 
                    :is_artwork="false"
                    :single_column="this.is_single_column.exhibition_list"
                    :id_list="this.exhibitionPageIdList"></List>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<script>
import RoundProfile from '@/widgets/RoundProfile.vue';
import List from '@/widgets/List.vue';
import ArtworkCardList from '@/widgets/ArtworkCardList.vue';
import ExhibitionList from '../components/ProfilePage/ExhibitionList.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { isAuth, getAuth } from '@/modules/auth';

export default {
    name: 'ProfilePage',
    components: {
        RoundProfile,
        List,
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
            is_profile_shrink: false,

            artworkIdList: [],
            exhibitionPageIdList: [],
            offset_artwork_list: 0,
            offset_exhibition_list: 0,
            nothingToUpdate: [
                false,
                false
            ],
            updateInProgress: [
                false,
                false
            ],

            swiper: null,
            swiperOptions: {
                initialSlide: 1,
                slidesPerView: 1,
                loop: false,
                centeredSlides: true,
                allowTouchMove: true,
            },

            is_single_column: {
                artwork_list: false,
                exhibition_list: false
            }
        };
    },
    beforeCreate() {},
    async created() {
        if (isAuth()) {
            this.user = getAuth()
            this.artworkIdList = await this.rebuildList(1, this.offset_artwork_list, 12, this.artworkIdList)
            this.exhibitionPageIdList = await this.rebuildList(0, this.offset_exhibition_list, 12, this.exhibitionPageIdList)
        }
        else {
            this.nothingToUpdate[0] = true
            this.nothingToUpdate[1] = true
        }
    },
    beforeMount() {},
    mounted() {
        const _this = this
        document.getElementsByClassName('swiper-slide')[1].addEventListener('scroll', async function (event) {
            _this.swiperSlideScrollEventFunction(event.currentTarget)
        })

        document.getElementsByClassName('swiper-slide')[2].addEventListener('scroll', async function (event) {
            _this.swiperSlideScrollEventFunction(event.currentTarget)
        })
    },
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
            let current_slide = document.getElementsByClassName('swiper-slide')[swiper.activeIndex]
            this.swiperSlideScrollEventFunction(current_slide)
        },
        async rebuildList(is_artwork, offset, length, list) {
            let newList = []
            if (is_artwork) {
                newList = await this.user.getOwnArtworks(offset, offset + length)

                this.offset_artwork_list += length
            }
            else {
                newList = await this.user.getTotalExhibitions(offset, offset + length)

                this.offset_exhibition_list += length
            }

            if (newList.length < 12) {
                this.nothingToUpdate[is_artwork] = true
            }

            return list.concat(newList)
            
        },
        async load(is_artwork) {
            if (this.updateInProgress[is_artwork]) {
                return false
            }
            this.updateInProgress[is_artwork] = true

            if (!this.nothingToUpdate[is_artwork]) {
                if (is_artwork) {
                    await this.rebuildList(true, this.offset_artwork_list, 12, this.artworkIdList)
                }
                else {
                    await this.rebuildList(false, this.offset_exhibition_list, 12, this.exhibitionPageIdList)
                }
            }

            this.updateInProgress[is_artwork] = false
        },
        async swiperSlideScrollEventFunction(targetElement) {
            const scroll_height = targetElement.scrollHeight
            const scroll_top = targetElement.scrollTop
            const offset_height = targetElement.offsetHeight

            if (scroll_top > 5) {
                this.shrinkProfileHeight(true)
            }
            else {
                this.shrinkProfileHeight(false)
            }

            if (scroll_height === scroll_top + offset_height) {
                if (targetElement.classList.contains('secondSlide'))
                    await this.load(1)
                else if (targetElement.classList.contains('thirdSlide'))
                    await this.load(0)
            }
        },
        shrinkProfileHeight (shrink) {
            if (shrink) {
                if (this.is_profile_shrink) return
                this.$refs.roundProfile.$el.style.setProperty('height', '0')
                this.$refs.roundProfile.$el.style.setProperty('width', '0')
                this.$refs.roundProfile.$el.style.setProperty('margin-top', '0')
                this.is_profile_shrink = true
            }
            else {
                let height = window.innerWidth * 0.215
                let margin = window.innerWidth * 0.03
                this.$refs.roundProfile.$el.style.setProperty('height', `${height}px`)
                this.$refs.roundProfile.$el.style.setProperty('width', `${height}px`)
                this.$refs.roundProfile.$el.style.setProperty('margin-top', `${margin}px`)
                this.is_profile_shrink = false
            }
        },
        setSortingStrategy (event) {
            if (event.currentTarget.classList.contains('sortingStrategy')) {
                return
            }

            event.currentTarget.classList.add('sortingStrategy')

            let is_single_column = event.currentTarget.classList.contains('singleColumnStrategy')

            if (is_single_column) {
                document.getElementsByClassName('doubleColumnStrategy')[0].classList.remove('sortingStrategy')
            }
            else {
                document.getElementsByClassName('singleColumnStrategy')[0].classList.remove('sortingStrategy')
            }

            if (this.tab_index === 1) {
                this.is_single_column.artwork_list = is_single_column
            }
            else if (this.tab_index === 2) {
                this.is_single_column.exhibition_list = is_single_column
            }
            return
        }
    }
}
</script>
<style lang="scss" scoped src="../scss/ProfilePage/profilePage.scss"></style>