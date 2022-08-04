<template>
    <div class="artworkBasicInfo">
        <ArtworkMoreInfo @show-more="this.$emit('show-more')" :artwork="this.artwork"></ArtworkMoreInfo>
        <ArtworkTableInfo :artwork="this.artwork"></ArtworkTableInfo>
    </div>
</template>
<script>
    import ArtworkMoreInfo from './ArtworkMoreInfo.vue';
    import ArtworkTableInfo from './ArtworkTableInfo.vue';

    export default {
        name: 'ArtworkBasicInfo',
        components: {
            ArtworkMoreInfo,
            ArtworkTableInfo
        },
        props: {
            artwork: Object
        },
        data() {
            return {
                sampleData: ''
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
        methods: {}
    }
</script>
<style lang="scss" scoped src="../../scss/ArtworkModifyPage/artworkBasicInfo.scss"></style>