<template>
    <div id="imageSelection">
        <div>권장 비율 3 : 5</div>
        <input type="file" id="imageUpload" accept="image/*" multiple>
        <swiper v-bind="this.swiperOptions">
            <swiper-slide v-for="(image, i) in this.selectedImages">
                <img :src="image.src" :style="image.style">
            </swiper-slide>
            <swiper-slide id="imageAddition">
                <label for="imageUpload"> + </label>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
    import { cropImage } from '@/modules/image';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';

    export default {
        name: 'ImageSelection',
        components: {
            Swiper,
            SwiperSlide,
        },
        data() {
            return {
                imageUpload: null,
                selectedImages: [],
                swiperOptions: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: false,
                    centeredSlides: true,
                    allowTouchMove: true,
                },
            };
        },
        watch: {
            selectedImages: {
                deep: true,
                async handler(newVal) {
                    await this.$nextTick()
                    if (newVal.length > 0) {
                        this.$emit('activate-next-button', true)
                        this.$emit('set-artwork-entity', 'images', newVal)
                    }
                    else {
                        this.$emit('activate-next-button', false)
                    }
                }
            },
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            this.imageUpload = document.getElementById('imageUpload')
            imageUpload.addEventListener('change', this.addImageSlide)
        },
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {
            async addImageSlide () {
                const selectedfiles = this.imageUpload.files
                let fileLength = selectedfiles.length

                for (let i = 0; i < fileLength; i++) {
                    let image = new Object()
                    image.name = selectedfiles[i].name
                    image.src = URL.createObjectURL(selectedfiles[i])
                    image.style = await cropImage(image.src, 3/5)

                    if (this.checkImage(image.name)) {
                        this.selectedImages.push(image)
                    }
                }
                imageUpload.value = ''
            },
            checkImage (imageName) {
                const length = this.selectedImages.length
                if (length >= 5) {
                    alert('이미지는 최대 5장까지 첨부 가능합니다.')
                    return false
                }
                for (let i = 0; i < length; i++) {
                    if (this.selectedImages[i].name === imageName) {
                        alert('중복된 이미지는 업로드 할 수 없습니다.')
                        return false
                    }
                }
                return true
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ArtworkRegisterPage/imageSelection.scss"></style>