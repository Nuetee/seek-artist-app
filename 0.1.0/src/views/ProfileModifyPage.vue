<template>
    <div id="profileModifyPage">
        <div class="top">
            <div @click="this.back" class="prevButton">
                <div>취소</div>
            </div>
            <div class="presentStep">프로필 수정</div>
            <div 
                class="nextButton" 
                :style="(this.activateNextButton) ? 'color:black' : 'color:#959595'" 
                @click="this.submit()"
            >
                <div>완료</div>
            </div>
        </div>
        <div class="bottom">
            <div class="profile">
                <RoundProfile v-if="this.userThumbnailLoadFlag" :profile="this.userThumbnail" />
            </div>
            <div class="type">
                <div class="label">닉네임</div>
                <div class="background">
                    <textarea class="input" v-model="this.new_nickname" name="nickname" cols="30" rows="1"
                        :placeholder="this.nickname"></textarea>
                </div>
            </div>
            <div class="type">
                <div class="label">인스타 링크</div>
                <div class="background">
                    <textarea class="input" v-model="this.new_sns" name="sns" cols="30" rows="1"
                        :placeholder="(this.sns !== '') ? this.sns : 'https://instagram.com'"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import RoundProfile from '@/widgets/RoundProfile.vue';
    import {
        isAuth,
        getAuth
    } from '@/modules/auth'

    export default {
        name: 'ProfileModifyPage',
        components: {
            RoundProfile
        },
        data() {
            return {
                user: null,
                nickname: '',
                sns: '',
                new_nickname: null,
                new_sns: null,
                userThumbnail: '',
                userThumbnailLoadFlag: false,
                activateNextButton: false
            };
        },
        watch: {
            new_nickname() {
                this.formValidCheck()
            },
            new_sns() {
                this.formValidCheck()
            }
        },
        created() {
            if (isAuth()) {
                this.user = getAuth()
                this.nickname = this.user.getNickname()
                this.sns = this.user.getSNS()
                this.userThumbnail = this.user.getThumbnail()
            }
            this.userThumbnailLoadFlag = true
        },
        mounted() {},
        methods: {
            back () {
                this.$router.replace('/')
            },
            async submit () {
                if (!this.activateNextButton || !this.user) {
                    return
                }

                let result = true
                if (this.new_nickname) {
                    result = result && await this.user.putNickname(this.new_nickname) 
                }
                if (this.new_sns) {
                    result = result && await this.user.putSNS(this.new_sns)
                }

                if (!result) {
                    alert('프로필 수정에 실패했습니다.')
                }
                else {
                    this.$router.replace('/')
                }
            },
            formValidCheck () {
                if (this.new_nickname || this.new_sns) {
                    this.activateNextButton = true
                }
                else {
                    this.activateNextButton = false
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/ProfileModifyPage/profileModifyPage.scss"></style>