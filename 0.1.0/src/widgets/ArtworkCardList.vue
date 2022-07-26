<template>
    <div @scroll="this.onScroll" class="artworkCardList">
        <div class="column1">
            <transition-group name="slide-fade" tag="div">
                <div v-for="(artworkId, i) in this.artworkIdList" :key="i">
                    <ArtworkCard v-if="i % 2 == 0" :artworkId="artworkId" :ownClass="this.tabClass + i.toString()">
                    </ArtworkCard>
                </div>
            </transition-group>
        </div>
        <div class="column2">
            <transition-group name="slide-fade" tag="div">
                <div v-for="(artworkId, i) in this.artworkIdList" :key="i">
                    <ArtworkCard v-if="i % 2 == 1" :artworkId="artworkId" :ownClass="this.tabClass + i.toString()">
                    </ArtworkCard>
                </div>
            </transition-group>
        </div>
    </div>
</template>
<script>
import ArtworkCard from './ArtworkCard.vue';

export default {
    name: 'ArtworkCardList',
    components: {
        ArtworkCard
    },
    props: {
        artworkIdList: {
            type: Array,
            default: []
        },
        tabClass: String
    },
    data() {
        return {
        };
    },
    methods: {
        onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
            if (scrollTop + clientHeight >= scrollHeight) {
                console.log("reached bottom")
            }
        }
    }
}
</script>
<style lang="scss" scoped src="../scss/widgets/artworkCardList.scss">
</style>