<template>
    <div v-if="this.isArtwork" :class="[this.order, 'artworkImageContainer']">
        <img v-show="!this.firstResize" :src="this.imageSrc" :style="this.artworkImageStyle">
    </div>
    <div v-else :class="[this.order, 'exhibitionImageContainer']">
        <img v-show="!this.firstResize" :src="this.imageSrc" :style="this.artworkImageStyle">
    </div>
</template>
<script>
    import { cropImage } from '@/modules/image.js'

    export default {
        name: 'ArtworkImageContainer',
        props: {
            order: String,
            imageSrc: String,
            isArtwork: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                artworkImageStyle: '',
                firstResize: true,
            };
        },
        async mounted () {
            const _this = this;

            const observer = new ResizeObserver(async entries => {
                for (let entry of entries) {
                    const cr = entry.contentRect;
                    let ratio = cr.width / cr.height;
                    await _this.setArtworkImageStyle(ratio)
                }
            })
            
            let class_name
            if (this.isArtwork) {
                class_name = this.order + ' ' +'artworkImageContainer'
            }
            else {
                class_name = this.order + ' ' +'exhibitionImageContainer'
            }

            let artworkImageContainer = document.getElementsByClassName(class_name)[0]
            observer.observe(artworkImageContainer, {box : 'content-box'});
        },
        methods: {
            loaded (event) {
                // console.log(event)
            },
            async setArtworkImageStyle (ratio) {
                if (this.firstResize) {
                    this.firstResize = false;

                    if (this.isArtwork) {
                        let artworkImageContainer = document.getElementsByClassName(this.order + ' artworkImageContainer')[0]
                        artworkImageContainer.style.opacity = 1
                    }
                    else {
                        let exhibitionImageContainer = document.getElementsByClassName(this.order + ' exhibitionImageContainer')[0]
                        exhibitionImageContainer.style.opacity = 1
                    }
                }
                this.artworkImageStyle = await cropImage(this.imageSrc, ratio)
            },
        }
    }
</script>
<style lang="scss" scoped src="../scss/widgets/artworkImageContainer.scss"></style>