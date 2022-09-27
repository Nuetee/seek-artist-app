<template>
    <div class="exhibitionPreview">
        <img :src="this.image.src" ref="posterImage">
    </div>
</template>
<script>
    export default {
        name: 'ExhibitionPreview',
        components: {},
        props: {
            image: {
                type: Object,
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
            let ratio = this.$refs.posterImage.height/this.$refs.posterImage.width
            this.$refs.posterImage.style = 'width: 100%; height: auto'
            
            document.getElementById('imageSelection').children[1].style.setProperty('height' , `${document.getElementById('imageSelection').children[1].offsetWidth * ratio}px`)
        },
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {}
    }
</script>
<style lang="scss" scoped src="../../scss/ExhibitionRegisterPage/exhibitionPreview.scss"></style>