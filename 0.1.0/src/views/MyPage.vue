<template>
    <div id="myPage">
        <div class="top">
            <button class="logo">
                <img src="@/assets/seek_logo.png">
            </button>
            <button class="sideBarOpenButton" @click="this.openSideBar($event)">
                <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="1.5" rx="0.75" fill="black" />
                    <rect y="21" width="30" height="1.5" rx="0.75" fill="black" />
                    <rect y="10.5" width="30" height="1.5" rx="0.75" fill="black" />
                </svg>
            </button>
        </div>
        <div class="middle">
            <RoundProfile></RoundProfile>
            <div class="name"></div>
            <ProfileModifyButton></ProfileModifyButton>
        </div>
        <div class="bottom">
            <ArtworkCardList></ArtworkCardList>
        </div>
        <SideBar></SideBar>
        <UploadButton></UploadButton>
        <Background :backgroundDisplayFlag="this.minimized" @click="this.closeSideBar"></Background>
    </div>
</template>
<script>
    import RoundProfile from '@/widgets/RoundProfile.vue';
    import ProfileModifyButton from '@/components/MyPage/ProfileModifyButton.vue';
    import ArtworkCardList from '@/widgets/ArtworkCardList.vue';
    import SideBar from '@/widgets/SideBar.vue';
    import UploadButton from '@/components/MyPage/UploadButton.vue';
    import Background from '../widgets/Background.vue';
    // import { isAuth, getAuth } from '@/modules/auth';

    export default {
        name: 'MyPage',
        components: {
            RoundProfile,
            ProfileModifyButton,
            ArtworkCardList,
            SideBar,
            UploadButton,
            Background
        },
        data() {
            return {
                minimized: true
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
                    _this.closeSideBar()
                }
            }

            // Update session
            // if (isAuth()) {
            //     const user = getAuth()
            //     await user.putUserSession()
            // }
        },
        mounted () {
            // Scroll Listener
            document.getElementById('myPage').addEventListener('scroll', async function (event) {
                const scroll_height = event.target.scrollHeight
                const scroll_top = event.target.scrollTop
                const offset_height = event.target.offsetHeight
                if (scroll_height === scroll_top + offset_height) {
                    await _this.$refs.myTab.load()
                }
            })
        },
        methods: {
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
            * sideBar component에 props로 넘기는 data인 this.minimized 값을 true로 바꾸어준다. sideBar component는 minimized == true 일 때 접히고, minimized == false 일 때 펼쳐진다.
            */
            closeSideBar() {
                if (!this.minimized) {
                    this.minimized = true
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/MyPage/myPage.scss"></style>