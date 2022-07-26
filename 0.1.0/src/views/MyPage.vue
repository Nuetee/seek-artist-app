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
            <RoundProfile></RoundProfile>
            <div class="name"> {{ (user === null ? 'Guest' : user.getNickname()) }} </div>
            <ProfileModifyButton></ProfileModifyButton>
        </div>
        <div class="bottom">
            <div class="myArtwork">내 아트워크</div>
            <ArtworkCardList v-if="this.loadFlag" :artworkIdList="this.artworkIdList">
            </ArtworkCardList>
        </div>
        <SideBar :minimized="this.minimized"></SideBar>
        <UploadButton></UploadButton>
        <Background :backgroundDisplayFlag=" this.minimized" @click="this.popHistory">
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
    import { isAuth, getAuth } from '@/modules/auth';

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
                minimized: true,
                user: null,
                loadFlag: false,
                artworkIdList: [],
                nothingToUpdate: false,
                updateInProgress: false
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
                const user = getAuth()
                // await this.rebuild(0, 12)
            }
            else {
                this.nothingToUpdate = true
            }
            this.loadFlag = true
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
            async rebuild(offset, length) {
                const newArtworkIdList = await this.user.getHistoryArtworks(offset, length)
                this.artworkIdList = this.artworkIdList.concat(newArtworkIdList)
                if (newArtworkIdList.length < 12) {
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