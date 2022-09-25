<template>
    <div id="imageModificationPage">
        <div class="top">
            <div @click="this.back" class="prevButton">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <div class="presentStep">이미지 수정</div>
            <div class="nextButton" :style="(this.activateNextButton) ? 'color:black' : 'color:#959595'"
                @click="this.closeWindow()">
                <div>완료</div>
            </div>
        </div>
        <ImageSelection ref="imageSelection" v-if="this.flag" :originalTextColor="this.originalArtwork.getColor()" :originalImageFiles="this.original_files" :artworkData="this.title"
            @activate-next-button="this.activateSubmit" @set-artwork-entity="this.setImageFiles">
        </ImageSelection>
    </div>
</template>
<script>
    import ImageSelection from '@/widgets/ImageSelection.vue';
    import { cropImage } from '@/modules/image';
    import { updateArtworkImages, deleteArtworkVideo, putArtworkVideo } from '@/modules/storage'
    import { resizeImage } from '@/modules/image';

    export default {
        name: 'imageModification',
        components: {
            ImageSelection
        },
        props: {
            originalArtwork: Object
        },
        data() {
            return {
                activateNextButton: false,
                artwork: null,
                title: null,
                text_color: null,
                original_length: null,
                original_files: [],
                mapping_array: [],
                original_image_src: [],
                new_image_files: [],
                new_video_index: null,
                new_video_file: null,
                flag: false
            };
        },
        beforeCreate() {},
        async created() {
            this.artwork = this.originalArtwork

            this.title = new Object()
            this.title.title = this.originalArtwork.getName()

            this.original_image_src = await this.originalArtwork.getAllImages()
            this.original_length = this.original_image_src.length

            for (let i = 0; i < this.original_length; i++) {
                let imageFile = new Object()
                imageFile.src = this.original_image_src[i]
                imageFile.type = 'image'
                imageFile.style = await cropImage(this.original_image_src[i], 3 / 5)

                this.original_files.push(imageFile)
            }

            let video_index = this.originalArtwork.isVideo()
            
            if (video_index !== null || video_index !== undefined) {
                let videoFile =  new Object()
                videoFile.src = await this.originalArtwork.getVideo()
                videoFile.type = 'video'
    
                this.original_files.splice(video_index, 0, videoFile)
            }

            this.flag = true
        },

        methods: {
            activateSubmit (activate) {
                this.activateNextButton = activate
            },
            back () {
                this.artwork = this.originalArtwork
                
                this.$refs.imageSelection.initialization()
                this.closeWindow()
            },
            closeWindow () {
                this.$emit('close-image-modification', 'image')
            },
            setImageFiles (entity, value) {
                if (entity === 'images') {
                    this.mapping_array = new Array(value.length)
                    this.new_image_files = []

                    for (let i = 0; i < value.length; i++) {
                        let j = 0

                        for (; j < this.original_length; j++) {
                            if (value[i].src === this.original_image_src[j]) {
                                break
                            }
                        }

                        if (j < this.original_length) {
                            this.mapping_array[i] = j
                        }
                        else {
                            this.mapping_array[i] = null
                            this.new_image_files.push(value[i])
                        }
                    }
                }
                else if (entity === 'textColor') {
                    if (value !== 'black' && value !== 'white'){
                        return
                    }

                    this.text_color = value
                }
                else if (entity === 'video_index') {
                    this.new_video_index = value
                }
                else if (entity === 'video') {
                    this.new_video_file = value
                }
            },
            async submit () {
                if(this.text_color !== null) {
                    await this.originalArtwork.putColor(this.text_color)
                }

                let original_mapping_array = Array.from({ length: this.original_length }, (v, i) => i)

                if (JSON.stringify(original_mapping_array) === JSON.stringify(this.mapping_array)) {
                    return
                }

                const resized_files = []
                for (let i = 0; i < this.new_image_files.length; i++) {
                    const file = this.new_image_files[i]
                    const resized_file = await resizeImage(file, {
                        x: 720,
                        y: 1200
                    })
                    resized_files.push(resized_file)
                }
                this.new_image_files = resized_files

                await updateArtworkImages(this.originalArtwork.getPageID(), this.original_length, this.mapping_array, this.new_image_files)

                if (this.new_video_index !== null) {
                    // 비디오 삭제
                    await deleteArtworkVideo (this.artwork, this.artwork.getID())
                    await putArtworkVideo(this.artwork, this.new_video_index, this.artwork.getID(), this.new_video_file)
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ArtworkModifyPage/imageModification.scss"></style>