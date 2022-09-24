<template>
    <div class="modifiableArtworkTrackList">
        <div class="artworkTrackListContainer" v-for="(category, i) in this.modified_category_list">
            <div class="tracksIncategory">
                <div class="category">{{ category }}</div>
                <draggable 
                    v-model="this.modified_artwork_track_list[i]" 
                    @change="this.log"
                    :group="{ name: 'track', pull: true}"
                    handle=".handle"
                >
                    <div v-for="(track, j) in this.modified_artwork_track_list[i]" :key="j" class="track">
                        <div class="handle" v-if="this.is_edit">
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1H13" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M1 7H13" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div class="artwork">
                            <div class="artworkThumbnail">
                                <img class="thumbnailImage"
                                    :src="track.thumbnail"
                                >
                            </div>
                            <div class="artworkInformation">
                                <div class="artworkName poppins">{{ track.getName() }}</div>
                                <div class=" artist">{{ track.getArtistName() }}</div>
                            </div>
                        </div>
                        <div class="deleteButton" v-if="this.is_edit">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_206_1033)">
                                    <circle cx="12" cy="12" r="10" fill="#D9D9D9" />
                                    <path d="M7 12H17" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_206_1033">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </draggable>
                <div class="addArtwork" v-if="this.is_edit"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import { VueDraggableNext } from 'vue-draggable-next'
    export default {
        name: 'ModifiableArtworkTrackList',
        components: { draggable: VueDraggableNext },
        props: {
            source: String,
            category_list: Array,
            artwork_track_list: Array,
            is_edit: Boolean
        },
        watch: {
            'category_list': {
                deep: true,
                handler () {
                    this.modified_category_list = this.category_list.slice()
                }
            },
            'artwork_track_list': {
                deep: true,
                async handler() {
                    this.modified_artwork_track_list = this.artwork_track_list.slice()
                    this.modified_artwork_track_list.forEach(async (value) => {
                        value.forEach(async (artwork, index) => {
                            artwork.thumbnail = await artwork.getThumbnailImage()
                        })
                    })
                }
            }
        },
        data() {
            return {
                modified_category_list: null,
                modified_artwork_track_list: null
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
        methods: {
            log () {
                console.log(this.modified_category_list)
                console.log(this.modified_artwork_track_list)
            },
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ExhibitionModifyPage/modifiableArtworkTrackList.scss"></style>