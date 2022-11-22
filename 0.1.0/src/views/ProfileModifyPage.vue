<template>
    <div id="profileModifyPage">
        <MainHeader :background_color="'white'">
            <template v-slot:left>
                <svg @click="this.back()" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </template>
            <template v-slot:middle>
                <p>{{ this.flag_tag_selection ? '태그' : '프로필 편집' }}</p>
            </template>
            <template v-slot:right><p @click="this.complete()" :style="this.active_complete_button ? 'color: #000000' : 'color: #959595'">완료</p></template>
        </MainHeader>
        <div id="contents">
            <div class="profileImage">
                <RoundProfile :profile="this.user.getProfile()"></RoundProfile>
                <div class="selectProfileImage">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.4584 10.2917C12.4584 10.579 12.3443 10.8545 12.1411 11.0577C11.9379 11.2609 11.6624 11.375 11.3751 11.375H1.62508C1.33776 11.375 1.06221 11.2609 0.859049 11.0577C0.655885 10.8545 0.541748 10.579 0.541748 10.2917V4.33333C0.541748 4.04602 0.655885 3.77047 0.859049 3.5673C1.06221 3.36414 1.33776 3.25 1.62508 3.25H3.79175L4.87508 1.625H8.12508L9.20841 3.25H11.3751C11.6624 3.25 11.9379 3.36414 12.1411 3.5673C12.3443 3.77047 12.4584 4.04602 12.4584 4.33333V10.2917Z"
                            stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M6.49992 9.20833C7.69654 9.20833 8.66658 8.23828 8.66658 7.04167C8.66658 5.84505 7.69654 4.875 6.49992 4.875C5.3033 4.875 4.33325 5.84505 4.33325 7.04167C4.33325 8.23828 5.3033 9.20833 6.49992 9.20833Z"
                            stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div class="nickname">
                <div class="label neccesary">
                    닉네임
                </div>
                <input type="text" class="input text" placeholder="닉네임을 입력해주세요!"/>
            </div>
            <div class="signatureWork">
                <div class="label">대표작업</div>
                <swiper v-bind="this.swiperOptions">
                    <swiper-slide v-for="(artwork_thumbnail, i) in this.artwork_thumbnail_list" :key="i"></swiper-slide>
                    <swiper-slide class="input">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40 16.6665V63.3332" stroke="#8A8A8A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16.6667 40H63.3334" stroke="#8A8A8A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="introduction">
                <div class="label">소개글</div>
                <div class="textarea">
                    <textarea cols="auto" rows="auto" placeholder="간단한 소개글을 입력해 주세요!" v-model="this.introduction"></textarea>
                    <div class="letterCount">{{ this.introductionLetterCount + '/500' }}</div>
                </div>
            </div>
            <div class="tag">
                <div class="label">태그</div>
                <!-- 쓰레기값을 history에 추가, tagSelection에서 뒤로가기 버튼 눌렀을 때, ProfileModifyPage에서 나가지지 않도록. -->
                <div class="tagSelectionButton" @click="() => { this.setGarbageHistory(); this.flag_tag_selection = true; this.active_complete_button = true; }">
                    선택하기
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 5L12.5 10L7.5 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div class="sns">
                <div class="label">소셜계정</div>
                <div class="accountContainer">
                    <div class="snsAccount">
                        <div class="logo">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_112_1328)">
                                    <path
                                        d="M13.4583 1.5835H5.54158C3.35546 1.5835 1.58325 3.3557 1.58325 5.54183V13.4585C1.58325 15.6446 3.35546 17.4168 5.54158 17.4168H13.4583C15.6444 17.4168 17.4166 15.6446 17.4166 13.4585V5.54183C17.4166 3.3557 15.6444 1.5835 13.4583 1.5835Z"
                                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M12.6668 9.00149C12.7645 9.66035 12.6519 10.3332 12.3452 10.9245C12.0384 11.5157 11.553 11.9951 10.958 12.2946C10.3631 12.594 9.68886 12.6983 9.03126 12.5924C8.37365 12.4866 7.76615 12.1761 7.29517 11.7052C6.82419 11.2342 6.51371 10.6267 6.4079 9.96907C6.30208 9.31147 6.40631 8.63724 6.70577 8.04228C7.00523 7.44733 7.48466 6.96195 8.07587 6.65518C8.66709 6.34841 9.33998 6.23587 9.99884 6.33357C10.6709 6.43323 11.2931 6.7464 11.7735 7.22681C12.2539 7.70723 12.5671 8.32942 12.6668 9.00149Z"
                                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.8542 5.146H13.863" stroke="black" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_112_1328">
                                        <rect width="19" height="19" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <input type="text" class="input text" placeholder="www.instagram.com"/>
                    </div>
                    <div class="snsAccount">
                        <div class="logo">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_112_1332)">
                                    <path
                                        d="M18.2084 2.37515C17.4503 2.9099 16.6109 3.3189 15.7226 3.5864C15.2458 3.03818 14.6121 2.64961 13.9073 2.47326C13.2025 2.2969 12.4605 2.34126 11.7817 2.60034C11.1029 2.85942 10.5201 3.32072 10.112 3.92184C9.70395 4.52297 9.49034 5.23491 9.50008 5.9614V6.75306C8.10883 6.78914 6.73026 6.48058 5.48713 5.85488C4.244 5.22917 3.17492 4.30573 2.37508 3.16681C2.37508 3.16681 -0.791585 10.2918 6.33341 13.4585C4.703 14.5652 2.76075 15.1201 0.791748 15.0418C7.91675 19.0001 16.6251 15.0418 16.6251 5.93765C16.6244 5.71713 16.6031 5.49716 16.5617 5.28057C17.3697 4.48375 17.9399 3.47771 18.2084 2.37515V2.37515Z"
                                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_112_1332">
                                        <rect width="19" height="19" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <input type="text" class="input text" placeholder="www.twitter.com"/>
                    </div>
                    <div class="snsAccount">
                        <div class="logo">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_112_1336)">
                                    <path
                                        d="M18.7832 5.35016C18.6843 4.95467 18.4826 4.59231 18.1988 4.29967C17.9149 4.00703 17.5589 3.79448 17.1666 3.6835C15.7332 3.3335 9.99991 3.3335 9.99991 3.3335C9.99991 3.3335 4.26657 3.3335 2.83324 3.71683C2.44095 3.82782 2.08489 4.04036 1.80103 4.333C1.51717 4.62564 1.31556 4.988 1.21657 5.3835C0.954252 6.83813 0.825937 8.31375 0.83324 9.79183C0.823889 11.281 0.952213 12.7679 1.21657 14.2335C1.32571 14.6167 1.53183 14.9653 1.81503 15.2456C2.09822 15.5258 2.44892 15.7283 2.83324 15.8335C4.26657 16.2168 9.99991 16.2168 9.99991 16.2168C9.99991 16.2168 15.7332 16.2168 17.1666 15.8335C17.5589 15.7225 17.9149 15.51 18.1988 15.2173C18.4826 14.9247 18.6843 14.5623 18.7832 14.1668C19.0435 12.7232 19.1718 11.2588 19.1666 9.79183C19.1759 8.30263 19.0476 6.81574 18.7832 5.35016V5.35016Z"
                                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.125 12.5169L12.9167 9.79189L8.125 7.06689V12.5169Z" stroke="black" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_112_1336">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <input type="text" class="input text" placeholder="www.youtube.com"/>
                    </div>
                </div>
            </div>
            <div class="mail">
                <div class="label">메일</div>
                <div class="mailContainer">
                    <input type="text" class="input text" placeholder="seekforartist" />
                    <select class="input text" v-model="this.mail_domain">
                        <option value="naver.com">naver.com</option>
                        <option value="kakao.com">kakao.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="">직접입력</option>
                    </select>
                </div>
            </div>
            <div class="link">
                <div class="label">링크</div>
                <div class="linkContainer">
                    <input type="text" class="input text" placeholder="www.seek.com"/>
                </div>
                <div class="linkAdd">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#D9D9D9" />
                        <path d="M12 6V18" stroke="#8A8A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 12H18" stroke="#8A8A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    링크추가
                </div>
            </div>
        </div>
        <div id="tagSelection" v-show="this.flag_tag_selection">
            <div class="guide">최대 3개까지 선택할 수 있어요!</div>
            <div class="tagList">
                <div class="tag"
                    v-for="(tag, i) in this.tag_list"
                    @click="(event, tag) => {
                        if (event.currentTarget.classList.contains('select')) {
                            event.currentTarget.classList.remove('select')
                            this.selected_tag_list.remove(tag)
                        }
                        else {
                            event.currentTarget.classList.add('select')
                            this.selected_tag_list.push(tag)
                        }
                    }">
                    {{ tag }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import MainHeader from '@/widgets/MainHeader.vue';
    import RoundProfile from '@/widgets/RoundProfile.vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import {
        isAuth,
        getAuth
    } from '@/modules/auth'

    export default {
        name: 'ProfileModifyPage',
        components: {
            MainHeader,
            RoundProfile,
            Swiper,
            SwiperSlide,
        },
        data() {
            return {
                user: null,
                swiperOptions: {
                    initialSlide: 0,
                    slidesPerView: 1.8,
                    loop: false,
                    centeredSlides: false,
                    allowTouchMove: true,
                },
                active_complete_button: false,
                artwork_thumbnail_list: null,
                mail_domain: 'naver.com',
                flag_tag_selection: false,
                tag_list: [
                    '일러스트', '그래피티', '공예', '회화', '디자인',
                    '동양화', '서양화', '판화', '조각', '서예', '그래픽',
                    '영상', '건축', '사진', '패션', '3D', 'AR/VR',
                    '드로잉', '캐릭터'
                ],
                selected_tag_list: []
            };
        },
        created() {
            const _this = this
            // 뒤로가기 이벤트 감지
            window.onpopstate = function() {
                _this.back()
            }

            if (isAuth()) {
                this.user = getAuth()
            }
            this.userThumbnailLoadFlag = true
        },
        mounted() {},
        methods: {
            setGarbageHistory () {
                window.history.pushState(null, '', location.href)
            },
            back () {
                if (!this.flag_tag_selection) {
                    window.history.back()
                }
                else if (this.flag_tag_selection) {
                    this.flag_tag_selection = false
                }

                return
            },
            complete () {

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