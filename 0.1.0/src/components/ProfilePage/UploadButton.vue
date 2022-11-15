<template>
    <div class="uploadButton poppins" ref="uploadButton" @click="this.showUploadOptions()">
        <div class="artworkUpload" :class="(this.show_upload_options ? 'show' : 'hidden')" @click="this.stopPropagation($event)">
            <router-link to="/artwork-register">아트워크</router-link>
        </div>
        <div class="exhibitionUpload" :class="(this.show_upload_options ? 'show' : 'hidden')" @click="this.stopPropagation($event)">
            <router-link to="/exhibition-register">전시</router-link>
        </div>
        <div class="phrase">
            Upload
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19V5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5 12L12 5L19 12" stroke="black" stroke-width="2.5" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'UploadButton',
        components: {},
        data() {
            return {
                show_upload_options: false
            };
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {},
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {
            stopPropagation (event) {
                // event 전파 방지
                if (event.stopPropagation) event.stopPropagation();
                else event.cancelBubble = true; // IE 대응
            },
            showUploadOptions() {
                let upload_button_height = document.defaultView.getComputedStyle(this.$refs.uploadButton).getPropertyValue('height').replace("px", "")
                let border_radius = document.defaultView.getComputedStyle(this.$refs.uploadButton).getPropertyValue('border-radius').replace("px", "")

                let height_parameter = 2.5
                let border_parameter = 1.25
                if (this.show_upload_options) {
                    height_parameter = 0.4
                    border_parameter = 0.8
                }
                
                this.$refs.uploadButton.style.setProperty('height', `${upload_button_height * height_parameter}px`)
                this.$refs.uploadButton.style.setProperty('border-radius', `${border_radius * border_parameter}px`)

                this.show_upload_options = !this.show_upload_options
            },
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ProfilePage/uploadButton.scss"></style>