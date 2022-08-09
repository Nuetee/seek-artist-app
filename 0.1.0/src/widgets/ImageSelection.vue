<template>
    <div id="imageSelection">
        <div>권장 비율 3 : 5</div>
        <input type="file" id="imageUpload" accept="image/*" multiple>
        <swiper v-bind="this.swiperOptions">
            <swiper-slide v-for="(image, i) in this.selectedImageFiles">
                <div class="thumbnail poppins" v-if="i===0" :style="'color: ' + this.textColor">Main</div>
                <svg @click="this.deleteImageSlide(i)" width="18" height="18" viewBox="0 0 18 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                        :stroke="this.textColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5.79999 9H12.2" :stroke="this.textColor" stroke-width="1.3" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <Preview :textColor="this.textColor" :title="this.artworkData.title" :image="image"></Preview>
            </swiper-slide>
            <swiper-slide>
                <label for="imageUpload"> + </label>
            </swiper-slide>
        </swiper>
        <div class="textColorButtonContainer" v-show="this.selectedImageFiles.length">
            <input type="radio" v-model="this.textColor" name="textColor" id="black" value="black">
            <label for="black">
                <svg v-if="this.textColor==='black'" width="18" height="13" viewBox="0 0 18 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 1L6 12L1 7" stroke="white" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </label>
            <input type="radio" v-model="this.textColor" name="textColor" id="white" value="white">
            <label for="white">
                <svg v-if="this.textColor==='white'" width="18" height="13" viewBox="0 0 18 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 1L6 12L1 7" stroke="black" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </label>
        </div>
    </div>
</template>
<script>
    import { cropImage } from '@/modules/image';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import Preview from './Preview.vue';

    export default {
        name: 'ImageSelection',
        components: {
            Swiper,
            SwiperSlide,
            Preview
        },
        props: {
            artworkData: Object
        },
        data() {
            return {
                imageSelection: null,
                imageUpload: null,
                selectedImageSrcs: [],
                selectedImageFiles: [],
                textColor: 'black',
                swiperOptions: {
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                    loop: false,
                    centerInsufficientSlides: true,
                    allowTouchMove: true,
                },
            };
        },
        watch: {
            selectedImageFiles: {
                deep: true,
                async handler() {
                    await this.formValidCheck()
                }
            },
            textColor: function (newVal) {
                this.$emit('set-artwork-entity', 'textColor', newVal)
            }
        },
        mounted() {
            this.imageSelection = document.getElementById('imageSelection')
            this.imageUpload = document.getElementById('imageUpload')
            this.$nextTick(() => {
                this.imageUpload.addEventListener('change', this.addImageSlide)
            })
        },
        methods: {
            async formValidCheck() {
                await this.$nextTick()
                if (this.selectedImageFiles.length > 0) {
                    this.$emit('activate-next-button', true)
                    this.$emit('set-artwork-entity', 'images', this.selectedImageFiles)
                    this.imageSelection.style.setProperty('padding', 0)
                }
                else {
                    this.$emit('activate-next-button', false)
                    let padding = window.innerWidth/5
                    this.imageSelection.style.setProperty('padding-bottom', `${padding}px`)
                }
            },
            async addImageSlide () {
                const selectedfiles = this.imageUpload.files
                let fileLength = selectedfiles.length

                for (let i = 0; i < fileLength; i++) {
                    let imageFile = new Object()
                    imageFile = selectedfiles[i]
                    imageFile.src = URL.createObjectURL(selectedfiles[i])
                    imageFile.style = await cropImage(imageFile.src, 3 / 5)

                    if (this.checkImage(imageFile.name)) {
                        this.selectedImageFiles.push(imageFile)
                    }
                }
                imageUpload.value = ''
            },
            /*
            * 이미지 슬라이드를 삭제하는 함수. deleteButton을 누르면 호출.
            * 현재 화면에 위치한 slide index를 parameter로 받는다.
            */
            deleteImageSlide (i) {
                this.selectedImageFiles.splice(i, 1)
            },
            checkImage (imageName) {
                const length = this.selectedImageFiles.length
                if (length >= 5) {
                    alert('이미지는 최대 5장까지 첨부 가능합니다.')
                    return false
                }
                for (let i = 0; i < length; i++) {
                    if (this.selectedImageFiles[i].name === imageName) {
                        alert('중복된 이미지는 업로드 할 수 없습니다.')
                        return false
                    }
                }
                return true
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/widgets/imageSelection.scss"></style>