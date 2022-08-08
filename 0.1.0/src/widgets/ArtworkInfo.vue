<template>
    <div class="artworkInfo poppins">
        <div :style="(this.isBack) ? { color: 'black' } : { color: this.color }" class="artworkTitle">
            {{ this.artwork.getName() }}
        </div>
        <div :style="(this.isBack) ? { color: 'black' } : { color: this.color }" class="artist">
            {{ this.artwork.getArtist().getNickname() }}
            <SNSLink v-if="this.$route.path !== '/' && this.sns" :artwork="this.artwork"></SNSLink>
        </div>
    </div>
</template>
<script>
import SNSLink from '@/components/ArtworkModifyPage/SNSLink.vue'

export default {
    name: 'ArtworkInfo',
    components: { SNSLink },
    props: {
        artwork: Object,
        isBack: Boolean
    },
    data() {
        return {
            color: this.artwork.getColor(),
            sns: this.artwork.getArtist().getSNS()
        }
    }
}
</script>
<style lang="scss" scoped src="../scss/widgets/artworkInfo.scss">
</style>