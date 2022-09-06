<template>
    <div class="exhibitionPreview">
        <img v-show="this.imageStyle" :src="this.image.src" ref="posterImage">
    </div>
</template>
<script>
    import { cropImage } from '@/modules/image';
    export default {
        name: 'ExhibitionPreview',
        components: {},
        props: {
            image: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                sampleData: ''
            };
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            this.$refs.posterImage.style = 'width: 100%; height: auto'

            document.getElementById('imageSelection').children[1].style.setProperty('height' , `${this.$refs.posterImage.height}px`)
        },
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {}
    }
</script>
<style lang="scss" scoped src="../../scss/ExhibitionPage/exhibitionPreview.scss"></style>