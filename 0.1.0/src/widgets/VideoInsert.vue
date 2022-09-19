<template>
    <div id="videoInsert">
        <div>
            영상 첨부(선택)
        </div>
        <input type="file" id="videoUpload" accept="video/mp4">
        <div class="videoContainer">
            <label for="videoUpload" v-if="!video_url">
                <svg class="plusIcon" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26 2V50" stroke="#959595" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 26H50" stroke="#959595" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </label>
            <svg v-if="this.video_url" class="cancelIcon" @click="this.deleteVideo()" width="18" height="18" viewBox="0 0 18 18" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                    stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.79999 9H12.2" stroke="black" stroke-width="1.3" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
            <video id="video" :src="this.video_url" controls></video>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'VideoInsert',
        components: {},
        data() {
            return {
                video_container_element: null,
                video_upload_element: null,
                video_element: null,
                video_url: null,
                video_file_object: null
            };
        },
        watch: {
            video_file_object: {
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
            this.video_container_element = document.getElementsByClassName('videoContainer')[0]
            this.video_upload_element = document.getElementById('videoUpload')
            this.video_element = document.getElementById('video')

            this.video_upload_element.addEventListener('change', () => {
                const video_file = this.video_upload_element.files[0]
                if (video_file.size > 157286400){
                    alert("영상 크기는 150MB 이하까지 가능합니다.")
                    this.video_container_element.value = ''
                    return
                }
                this.video_file_object = video_file
                this.video_url = URL.createObjectURL(video_file)
                this.video_element.style.setProperty('display', 'inline')
            })
        },
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {
            deleteVideo () {
                this.video_upload_element.value = ""
                this.video_url = null
                this.video_element.style.setProperty('display', 'none')
            },
            formValidCheck () {
                this.$emit('activate-next-button', true)
                this.$emit('set-artwork-entity', 'video', this.video_file_object)
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/widgets/videoInsert.scss"></style>