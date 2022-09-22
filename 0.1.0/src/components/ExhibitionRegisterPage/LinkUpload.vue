<template>
    <div id="linkUpload">
        <div class="linkListContainer">
            <div class="title">
                링크 업로드
            </div>
            <div class="body">
                <div class="linkContainer" v-for="(link_object, i) in this.link_list">
                    <input type="text"
                        maxlength="200"
                        v-model="link_object.title"
                        placeholder="링크의 소제목을 써주세요!"
                    />
                    <input type="text"
                        v-model="link_object.link"
                        placeholder="www.seek_shopping.com"
                    />
                </div>
                <div class="link_addition" @click="() => { this.link_list.push({title: null, link: null}) }">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#D9D9D9"/>
                    <path d="M12 6V18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 12H18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    링크 추가
                </div>
            </div>
        </div>
        <div class="videoContainer">
            <div class="title">
                영상 업로드 <span>영상 최대 1개 선택 가능(150MB이하)</span>
            </div>
            <div class="body">
                <input type="text"
                    v-model="this.video.title"
                    maxlength="200"
                    placeholder="영상의 소제목을 써주세요!"
                    @keydown="this.preventTab($event)"
                    />
                <div class="video">
                    <div class="videoPlayer" v-if="this.video.file">
                        <svg @click="this.deleteVideo()" width="18"   
                            height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                                stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.79999 9H12.2" stroke="black" stroke-width="1.3" stroke-linecap="round"
                            stroke-linejoin="round" />
                        </svg>
                         <video :src="this.video.src" controls></video>
                    </div>
                    <div class="videoSelection" v-else>
                        <label for="videoUpload">
                            <svg class="plusIcon" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26 2V50" stroke="#959595" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 26H50" stroke="#959595" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </label>
                    </div>
                    <input type="file" id="videoUpload" accept="video/mp4"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'LinkUpload',
        components: {},
        data() {
            return {
                link_list: [
                    {
                        title: null,
                        link: null
                    }
                ],
                video: {
                    title: null,
                    file: null,
                    src: null
                }
            };
        },
        watch: {
            link_list: {
                deep: true,
                handler() {
                    this.formValidCheck()
                }
            },
            video: {
                deep: true,
                handler() {
                    this.formValidCheck()
                }
            },
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            const video_upload = document.getElementById('videoUpload')
            const _this = this

            video_upload.addEventListener('change', function () {
                if (video_upload.files[0].size > 157286400){
                    alert("영상 크기는 150MB 이하까지 가능합니다.")
                    return
                }
                _this.video.src = URL.createObjectURL(video_upload.files[0])
                _this.video.file = video_upload.files[0]

                video_upload.value = ''
            })
        },
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {
            /**
             * - Optional이므로 항상 activate-next-button(true)
             * - 아무 값도 들어있지 않은 배열값(링크)은 제외해야 하므로 arr.filter를 통해 valid한 값만을 거른다.
             * link 주소가 반드시 들어가야 한다.
             * 
             */
            formValidCheck () {
                let valid_link_list = this.link_list.filter((data) => {
                    return  data.link !== null
                })

                let json_link_object = {}
                let i = 0
                while (i < valid_link_list.length) {
                    let property = valid_link_list[i].title
                    json_link_object[property.toString()] = valid_link_list[i].link
                    
                    i++
                }
                
                this.$emit('activate-next-button', true)
                this.$emit('set-exhibition-entity', 'link_list', json_link_object)
                this.$emit('set-exhibition-entity', 'video', this.video)
            },
            deleteVideo () {
                this.video.title = null
                this.video.file = null
                this.video.src = null

                const video_upload = document.getElementById('videoUpload')
                video_upload.value = ''
            },
            preventTab (event) {
                if (event.keyCode === 9) {
                    event.preventDefault()
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ExhibitionRegisterPage/linkUpload.scss"></style>