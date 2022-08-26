<template>
    <div id="myPage">
        <div class="top">
            <button class="logo">
                <img src="@/assets/seek_logo.png">
                <div class="poppins">for artist</div>
            </button>
            <div class="sideBarOpenButtonContainer">
                <button class="sideBarOpenButton" @click="this.openSideBar($event)">
                    <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="30" height="1.5" rx="0.75" fill="black" />
                        <rect y="21" width="30" height="1.5" rx="0.75" fill="black" />
                        <rect y="10.5" width="30" height="1.5" rx="0.75" fill="black" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="middle">
            <RoundProfile v-if="this.loadFlag" :profile="this.profile"></RoundProfile>
            <div class="name" v-if="this.loadFlag">
                {{ (this.user === null ? 'Guest' : this.user.getNickname()) }}
            </div>
            <ProfileModifyButton></ProfileModifyButton>
        </div>
        <div class="bottom">
            <div class="tab">
                <div class="navigationBar">
                    <va-tabs id="tabs" v-model="this.tab_index" color="black" grow>
                        <template #tabs>
                            <va-tab class="tabName" :class="(this.tab_index ? 'nonActive' : '')" color="black"
                                @click="this.clickTab(tab_index)">
                                전시
                            </va-tab>
                            <va-tab class="tabName" :class="(this.tab_index ? '' : 'nonActive')" color="black"
                                @click="this.clickTab(tab_index)">
                                내 아트워크
                            </va-tab>
                        </template>
                    </va-tabs>
                </div>
            </div>
            <div class="tabBody">
                <swiper v-bind="this.swiperOptions" @slideChange="this.slideChange">
                    <swiper-slide>
                        <ArtworkCardList v-if="this.loadFlag" :exhibitionIdList="this.exhibitionIdList">
                        </ArtworkCardList>
                    </swiper-slide>
                    <swiper-slide>
                        <ArtworkCardList v-if="this.loadFlag" :artworkIdList="this.artworkIdList">
                        </ArtworkCardList>
                    </swiper-slide>
                    <div class="nextButton"></div>
                    <div class="prevButton"></div>
                </swiper>
            </div>
        </div>
        <div ref="selectBar" id="selectBar">
        </div>
        <SideBar :minimized="this.minimized"></SideBar>
        <UploadButton @click="this.showSelectBar"></UploadButton>
        <Background :backgroundDisplayFlag="this.minimized" @click="this.popHistory">
        </Background>
    </div>
</template>
<script>
    import RoundProfile from '@/widgets/RoundProfile.vue';
    import ProfileModifyButton from '@/components/MyPage/ProfileModifyButton.vue';
    import ArtworkCardList from '@/widgets/ArtworkCardList.vue';
    import SideBar from '@/widgets/SideBar.vue';
    import UploadButton from '@/components/MyPage/UploadButton.vue';
    import Background from '../widgets/Background.vue';

    import { Swiper, SwiperSlide } from 'swiper/vue';
    import SwiperCore, { Navigation } from 'swiper';
    import { isAuth, getAuth } from '@/modules/auth';

    SwiperCore.use([Navigation])

    export default {
        name: 'MyPage',
        components: {
            RoundProfile,
            ProfileModifyButton,
            ArtworkCardList,
            SideBar,
            UploadButton,
            Background,
            Swiper,
            SwiperSlide,
        },
        data() {
            return {
                minimized: true,
                user: null,
                selectBar: null,
                selectBarHeight: null,
                barOpened: false,
                profile: '',
                loadFlag: false,
                resizeFlag: true,
                artworkIdList: [],
                exhibitionIdList: [],
                nothingToUpdate: false,
                updateInProgress: false,

                tab_index: 0,
                pre_activated_tab: 0,

                swiperOptions: {
                    initialSlide: 0,
                    slidesPerView: 1,
                    loop: false,
                    centeredSlides: true,
                    allowTouchMove: true,
                    navigation: {
                        nextEl: '.nextButton',
                        prevEl: '.prevButton'
                    }
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

            window.addEventListener('resize', this.setSelectBarPosition)
        },
        mounted () {
            const _this = this
            
            // Scroll Listener
            document.getElementById('myPage').addEventListener('scroll', async function (event) {
                const scroll_height = event.target.scrollHeight
                const scroll_top = event.target.scrollTop
                const offset_height = event.target.offsetHeight
                if (scroll_height === scroll_top + offset_height) {
                    await _this.load()
                }
            })
        },
        methods: {
            /*
            * - Navigation Button이 눌렸을 경우 호출되는 함수.
            * 1. 활성 버튼과 클릭한 버튼이 같으면 그대로 return.
            * 2. 활성 버튼보다 클릭 버튼의 순서가 뒤인 경우 next slide 로 넘김.
            * 3. 활성 버튼보다 클릭 버튼의 순서가 잎인 경우 previous slide 로 넘김.
            * 4. 버튼의 활성 여부에 따라 버튼의 font color 지정
            * 5. clickedButton의 order를 activeSlideOrder에 저장
            * 6. 부모 component에 바뀐 활성 버튼의 순서를 전달.
            */
            changeSlide(pre_activated_tab, clicked_tab) {
                if (pre_activated_tab === clicked_tab) {
                    return
                }
                else if (pre_activated_tab < clicked_tab) {
                    document.getElementsByClassName('nextButton')[0].click()
                }
                else {
                    document.getElementsByClassName('prevButton')[0].click()
                }
            },
            slideChange(swiper) {
                this.tab_index = swiper.activeIndex
                this.pre_activated_tab = swiper.activeIndex
            },
            clickTab (activated_tab) {
                // if clicked button is activated button, then return.
                if (this.pre_activated_tab === activated_tab)
                    return
                else {
                    // emit button click signal to Parent component
                    this.changeSlide(this.pre_activated_tab, activated_tab)

                    // set activatedButtonOrder as clicked button's Index
                    this.pre_activated_tab = activated_tab

                    return
                }
            },
            /*
            * - sideBarOpenButton(class)에 click event가 발생하면 호출되는 함수.
            * 1. 부모 DOM Element로의 click event 전파를 차단한다.
            * 2. history.pushState() 메서드를 통해 브라우저의 세션기록에 더비 상태를 추가한다. (뒤로가기를 눌렀을 때, 이전 페이지로 이동하지 않도록 하기 위함.)
            * 3. this.minimized = false 로 설정하여 sideBar가 펼쳐지게 한다.
            */
            openSideBar(event) {
                if (event.stopPropagation) event.stopPropagation();
                else event.cancelBubble = true; // IE 대응

                window.history.pushState(null, '', location.href)
                this.minimized = false
            },
            /*
            * - sideBar component가 접히도록 하는 함수.
            * 1. sideBar component에 props로 넘기는 data인 this.minimized == false인 경우, sideBar가 펼쳐져 있는 상태
            * 2. sideBar가 펼쳐진 상태에서 background를 터치한 경우라면 history.back() 메서드를 통해 뒤로가기 이벤트를 발생시킴.
            * 3. 뒤로가기 이벤트는 window.onpopstate를 발생시키고, 여기서 this.minimized = true로 바꿔줌.
            */
            popHistory() {
                if (!this.minimized) {
                    window.history.back()
                }
            },
            async showSelectBar() {
                const _this = this
                if (this.selectBar === null) {
                    this.selectBar = document.getElementById('selectBar')
                }
                this.selectBarHeight = this.selectBar.clientHeight

                this.selectBar.style.setProperty('bottom', `${this.selectBarHeight - 10}px`)

                setTimeout(() => {
                    _this.barOpened = true
                }, 300)
            },
            setSelectBarPosition() {
                if (this.barOpened === false) {
                    return
                }
                this.selectBar.style.setProperty('transition', 'none')
                this.selectBarHeight = this.selectBar.clientHeight
                this.selectBar.style.setProperty('bottom', `${this.selectBarHeight - 10}px`)

                const _this = this

                if (this.resizeFlag) {
                    this.resizeFlag = false

                    setTimeout(() => {
                        _this.selectBar.style.setProperty('transition', 'bottom 0.5s')
                        _this.resizeFlag = true
                    }, 300)
                }
            },
            async rebuild(offset, length) {
                const newArtworkIdList = await this.user.getOwnArtworks(offset, length)
                const newExhibitionIdList = await this.user.getOwnExhibitions(offset, length)
                this.artworkIdList = this.artworkIdList.concat(newArtworkIdList)
                this.exhibitionIdList = this.exhibitionIdList.concat(newExhibitionIdList)
                if (newArtworkIdList.length < 12 && newExhibitionIdList.length < 12) {
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
<style lang="scss" scoped src="../scss/MyPage/myPage.scss"></style>