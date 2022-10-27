<template>
    <div class="mainProfile" @click="() => { this.showControlBox = false }">
        <div class="backgroundImageContainer">
            <!-- <img class="backgroundImage"/> -->
            <div class="backgroundImage"></div>
            <div class="profileControlButton" @click="(event) => { this.showControlBox = !this.showControlBox; this.stopPropagation(event)}">
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
        </div>
        <div class="profileContainer">
            <div class="artistProfile">
                <RoundProfile :profile="this.user.getProfile()"></RoundProfile>
                <div class="name">
                    {{ (this.user === null ? 'Guest' : this.user.getNickname()) }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import RoundProfile from '@/widgets/RoundProfile.vue';

    import { isAuth, getAuth } from '@/modules/auth';
    export default {
        name: 'MainProfile',
        components: {
            RoundProfile
        },
        data() {
            return {
                user: null,
                showControlBox: false
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
        methods: {
            stopPropagation(event) {
                // event 전파 방지
                if (event.stopPropagation) event.stopPropagation();
                else event.cancelBubble = true; // IE 대응
            },
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ProfilePage/mainProfile.scss"></style>