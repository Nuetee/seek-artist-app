<template>
    <div id="imageSelection" :class="this.isExhibition ? 'exhibitionImageSelection' : ''">
        <div v-if="!this.isExhibition">
            &middot 권장 비율 3 : 5<br/>
            &middot 영상 최대 1개 선택 가능(150MB이하)
        </div>
        <!-- Exhibition 등록의 경우 하나의 사진 파일만 선택 가능 -->
        <input v-if="this.isExhibition" type="file" id="imageUpload" accept="image/*"/>
        <!-- Artwork 등록의 경우 여러개의 사진/동영상 파일 선택 가능 -->
        <input v-else type="file" id="imageUpload" accept="image/*, video/mp4" multiple/>
        <swiper v-bind="this.swiperOptions">
            <swiper-slide v-for="(file, i) in this.selectedFiles">
                <div class="thumbnail poppins"
                    v-if="i===0"
                    :style="'color: ' + this.textColor"
                >
                    Main
                </div>
                <svg @click="this.deleteImageSlide(i)" width="18" height="18" viewBox="0 0 18 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                        :stroke="this.textColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5.79999 9H12.2" :stroke="this.textColor" stroke-width="1.3" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <Preview v-if="!this.isExhibition && file.type.includes('image')" :textColor="this.textColor" :title="this.artworkData.title" :image="file"></Preview>
                <video v-else-if="!this.isExhibition && file.type.includes('video')" id="video" :src="file.src" controls></video>
                <ExhibitionPreview v-else :image="file"></ExhibitionPreview>
            </swiper-slide>
            <swiper-slide v-if="!this.isExhibition || !this.selectedFiles.length">
                <label for="imageUpload">
                    <svg class="plusIcon" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26 2V50" stroke="#959595" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 26H50" stroke="#959595" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </label>
            </swiper-slide>
        </swiper>
        <div v-show="!this.isExhibition && this.selectedFiles.length">텍스트 색상</div>
        <div class="textColorButtonContainer" v-show="!this.isExhibition && this.selectedFiles.length">
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
    import ExhibitionPreview from '@/components/ExhibitionRegisterPage/ExhibitionPreview.vue'

    export default {
        name: 'ImageSelection',
        components: {
            Swiper,
            SwiperSlide,
            Preview,
            ExhibitionPreview
        },
        props: {
            originalImageFiles: {
                type: Array,
                default: []
            },
            originalTextColor: {
                type: String,
                default: 'black'
            },
            artworkData: Object,
            exhibitionData: Object,
            isExhibition: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                imageSelection: null,
                imageUpload: null,
                selectedFiles: [],
                selectedImageFiles: [],
                selectedVideo: null,
                textColor: 'black',
                swiperOptions: {
                    slidesPerView: 'auto',
                    spaceBetween: this.isExhibition ? 0 : 20,
                    loop: false,
                    centerInsufficientSlides: true,
                    allowTouchMove: true,
                },
            };
        },
        watch: {
            selectedFiles: {
                deep: true,
                async handler() {
                    await this.formValidCheck()
                }
            },
            textColor: function (newVal) {
                this.$emit('set-artwork-entity', 'textColor', newVal)
            }
        },
        created() {
            this.textColor = this.originalTextColor
            this.selectedFiles = this.originalImageFiles
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
                    
                    if (this.isExhibition) {
                        this.$emit('set-exhibition-entity', 'images', this.selectedImageFiles)
                    }
                    else {
                        this.$emit('set-artwork-entity', 'images', this.selectedImageFiles)
                        this.$emit('set-artwork-entity', 'video', this.selectedVideo)
                    }

                    this.imageSelection.style.setProperty('padding', 0)
                }
                else {
                    this.$emit('activate-next-button', false)
                    let padding = window.innerWidth / 5
                    this.imageSelection.style.setProperty('padding-bottom', `${padding}px`)
                }
            },
            async addImageSlide () {
                let added_files = this.imageUpload.files
                let fileLength = added_files.length
                
                if (this.isExhibition && fileLength > 1) {
                    alert("포스터 이미지는 한장만 선택 가능합니다.")
                    fileLength = 1
                }
                for (let i = 0; i < fileLength; i++) {
                    let current_file = new Object()
                    current_file = added_files[i]
                    current_file.src = URL.createObjectURL(added_files[i])
                   
                    if (this.checkFile(current_file.name, current_file.type)) {
                        if (current_file.type.includes('image')) {
                            current_file.style = await cropImage(current_file.src, 3 / 5)

                            this.selectedImageFiles.push(current_file)
                        }
                        else if (current_file.type.includes('video')) {
                            if (current_file.size > 157286400){
                                alert("영상 크기는 150MB 이하까지 가능합니다.")
                                continue
                            }
                            this.selectedVideo = current_file
                        }

                        this.selectedFiles.push(current_file)
                    }
                }
                this.imageUpload.value = ''
            },
            /*
            * 이미지 슬라이드를 삭제하는 함수. deleteButton을 누르면 호출.
            * 현재 화면에 위치한 slide index를 parameter로 받는다.
            */
            deleteImageSlide (i) {
                if (this.selectedFiles[i].type.includes('image')) {
                    let j = 0
                    while (this.selectedImageFiles[j] !== this.selectedFiles[i]) {
                        j++
                    }
                    this.selectedImageFiles.splice(j, 1)
                }
                else if (this.selectedFiles[i].type.includes('video')) {
                    this.selectedVideo = null
                }

                this.selectedFiles.splice(i, 1)
            },
            checkFile (file_Name, file_type) {
                if (file_type.includes('image')) {
                    const length = this.selectedImageFiles.length
                    if (length >= 5) {
                        alert('이미지는 최대 5장까지 첨부 가능합니다.')
                        return false
                    }
                    for (let i = 0; i < length; i++) {
                        if (this.selectedImageFiles[i].name === file_Name) {
                            alert('중복된 이미지는 업로드 할 수 없습니다.')
                            return false
                        }
                    }
                }
                else if (file_type.includes('video')) {
                    if(this.selectedVideo !== null) {
                        alert('영상은 하나만 첨부 가능합니다.')
                        return false
                    }
                }
                
                return true
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/widgets/imageSelection.scss"></style>