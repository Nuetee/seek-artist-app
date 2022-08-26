<template>
    <div v-if="this.artwork" class="artworkInfo poppins">
        <div :style="(this.isBack) ? { color: 'black' } : { color: this.color }" class="artworkTitle">
            {{ this.artwork.getName() }}
        </div>
        <div :style="(this.isBack) ? { color: 'black' } : { color: this.color }" class="artist">
            {{ this.artwork.getArtist().getNickname() }}
            <SNSLink v-if="this.$route.path !== '/' && this.sns" :artwork="this.artwork"></SNSLink>
        </div>
    </div>
    <div v-else-if="this.exhibition" class="artworkInfo poppins">
        <div :style="(this.isBack) ? { color : 'black' } : { color: this.color }" class="artworkTitle">
            {{ this.exhibition.getName() }}
        </div>
        <div :style="(this.isBack) ? { color: 'black' } : { color: this.color }" class="artist">
            {{ this.exhibition.getOwnerName() }}
        </div>
    </div>
</template>
<script>
import SNSLink from '@/components/ArtworkModifyPage/SNSLink.vue'
import { getAuth } from '@/modules/auth'

export default {
    name: 'ArtworkInfo',
    components: { SNSLink },
    props: {
        artwork: {
            type: Object,
            default: null
        },
        exhibition: {
            type: Object,
            default: null
        },
        isBack: Boolean
    },
    data() {
        return {
            color: (this.artwork) 
                ? this.artwork.getColor()
                : 'black',
            sns: (this.artwork) 
                ? getAuth().getSNS()
                : null
        }
    }
}
</script>
<style lang="scss" scoped src="../scss/widgets/artworkInfo.scss">
</style>