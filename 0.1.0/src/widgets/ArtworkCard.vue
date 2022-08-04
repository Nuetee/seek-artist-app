<template>
    <div class="artworkCard" v-if="this.loadFlag" @click="this.redirectMain">
        <ArtworkImageContainer :image-src="this.artworkImage" :order="this.order"></ArtworkImageContainer>
        <ArtworkInfo :artwork="this.artwork"></ArtworkInfo>
    </div>
</template>
<script>
import ArtworkImageContainer from './ArtworkImageContainer.vue';
import ArtworkInfo from './ArtworkInfo.vue';
import { Artwork } from '@/classes/artwork';

export default {
    name: 'ArtworkCard',
    components: {
        ArtworkImageContainer,
        ArtworkInfo
    },
    props: {
        artworkId: String,
        order: String
    },
    data() {
        return {
            artwork: null,
            artworkImage: '',
            artworkInfo: null,
            loadFlag: false
        };
    },
    beforeCreate() { },
    async created() {
        const artwork = await new Artwork(this.artworkId).init()
        this.artwork = artwork
        this.artworkImage = await this.artwork.getThumbnailImage()

        this.loadFlag = true
    },
    beforeMount() { },
    mounted() { },
    beforeUpdate() { },
    updated() { },
    beforeUnmount() { },
    unmounted() { },
    methods: {
        redirectMain() {
            const _this = this
            this.$router.replace({
                path: '/',
                query: {
                    id: _this.artworkId
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped src="../scss/widgets/artworkCard.scss"></style>