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
                                <div class="imageContainer">
                                    <img class="thumbnailImage" :src="track.thumbnail" :style="track.style">
                                </div>
                            </div>
                            <div class="artworkInformation">
                                <div class="artworkName poppins">{{ track.getName() }}</div>
                                <div class=" artist">{{ track.getArtistName() }}</div>
                            </div>
                        </div>
                        <div class="deleteButton" v-if="this.is_edit" @click="this.deleteArtwork(i, j)">
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
                <div class="addArtwork" 
                    v-if="this.is_edit"
                    @click="this.startArtworkRegisterProcess(i)"
                    :style="(category === '' ? 'padding-left: 0;' : 'padding-left: calc(var(--vw, 1vw) * 5);')"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_11_2208)">
                            <circle cx="12" cy="12" r="10" fill="#D9D9D9" />
                            <path d="M12 6V18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6 12H18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_11_2208">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p>아트워크 추가</p>
                </div>
            </div>
        </div>
        <!-- <div class="addArtworkWithoutCategory" v-if="this.is_edit && this.modified_category_list.length == 0"
            @click="this.addFirstArtworkWithoutCategory()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_11_2208)">
                    <circle cx="12" cy="12" r="10" fill="#D9D9D9" />
                    <path d="M12 6V18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6 12H18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_11_2208">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <p>아트워크 추가</p>
        </div> -->
        <div class="addCategory" v-if="this.is_edit" @click="this.$emit('start-process', false, true)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_11_2208)">
                    <circle cx="12" cy="12" r="10" fill="#D9D9D9" />
                    <path d="M12 6V18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6 12H18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_11_2208">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <p>카테고리 추가/삭제</p>
        </div>
    </div>
</template>
<script>
    import { VueDraggableNext } from 'vue-draggable-next'
    import { cropImage } from '@/modules/image'
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
                    this.modified_artwork_track_list = this.artwork_track_list.map(v => v.slice())
                    this.modified_artwork_track_list.forEach(async (value) => {
                        value.forEach(async (artwork, index) => {
                            artwork.thumbnail = await artwork.getThumbnailImage()
                            artwork.style = await cropImage(artwork.thumbnail, 1)
                        })
                    })
                }
            },
            'track_row_artwork_will_be_added': {
                handler() {
                    console.log(this.track_row_artwork_will_be_added)
                }
            },
        },
        data() {
            return {
                modified_category_list: null,
                modified_artwork_track_list: null,
                track_row_artwork_will_be_added: -1,
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
                console.log(this.artwork_track_list)
                //console.log(this.modified_category_list)
                console.log(this.modified_artwork_track_list)
            },
            /**
             * modified_artwork_track_list 에서 특정 element(artwork 객체)를 삭제하는 함수
             * @param {Number} row // modified_artwork_track_list[row][column]
             * @param {Number} column // modified_artwork_track_list[row][column]
             */
            deleteArtwork (row, column) {
                this.modified_artwork_track_list[row].splice(column, 1)
            },
            startArtworkRegisterProcess (index) {
                this.$emit('start-process', true, false)
                this.track_row_artwork_will_be_added = index;
            },
            addFirstArtworkWithoutCategory () {
                this.modified_category_list.push('')
                this.$emit('start-process', true, false)
                this.track_row_artwork_will_be_added = 0
            },
            /**
             * 인자로 받은 artwork 객체를 modified_artwork_track_list에 추가.
             * @param {Object} artwork // 새로 추가할 artwork 객체
             */
            async addArtwork (artwork) {
                if (artwork === null || artwork === undefined) {
                    return
                }
                if (this.track_row_artwork_will_be_added === -1) {
                    return
                }
                if (this.track_row_artwork_will_be_added >= this.modified_artwork_track_list.length) {
                    if (this.modified_artwork_track_list.length !== 0) {
                        return
                    }
                }

                artwork.thumbnail = await artwork.getThumbnailImage()
                artwork.style = await cropImage(artwork.thumbnail, 1)

                if (this.modified_artwork_track_list.length === 0) {
                    this.modified_artwork_track_list.push([artwork])
                }
                else {
                    this.modified_artwork_track_list[this.track_row_artwork_will_be_added].push(artwork)
                }
            },
            setCategoryList (new_category_list) {
                // console.log(new_category_list)
                // console.log(this.modified_artwork_track_list)
                // new_category_list에 빈 카테고리 들이 존재하는 경우 모두 없애줌.
                let delete_count = 0
                new_category_list.forEach((new_value, new_index) => {
                    if (new_value === '') {
                        new_category_list.splice(new_index - delete_count, 1)
                        delete_count++
                    }
                })

                // modified_artwork_track_list에 빈 카테고리가 존재하는 경우 new_category_list의 맨 앞에 빈 카테고리를 만들어 줌.
                if (this.modified_artwork_track_list.indexOf('') !== -1) {
                    new_category_list.splice(0, 0, '')
                }

                // new_category_list에 맞게 새로 설정할 new_track_list 선언 및 초기화
                let new_track_list = new Array(new_category_list.length)
                for (let i = 0; i < new_category_list.length; i++) {
                    new_track_list[i] = new Array(0)
                }

                // new_category_list를 돌면서 modified_category_list에 있던 카테고리가 존재하는 경우 해당 카테고리에 속해있던 artwork들을 new_track_list의 적절한 위치로 옮겨줌
                new_category_list.forEach((new_value, new_index) => {
                    let exist_index = null
                    this.modified_category_list.forEach((value, index) => {
                        if (new_value === value) {
                            exist_index = index
                        }
                    })

                    if (exist_index !== null) {
                        new_track_list[new_index] = this.modified_artwork_track_list[exist_index]
                    }
                })

                /*
                * modified_category_list를 돌면서 modified_category_list에 있던 카테고리가 new_category_list에 없는 경우
                * 1. new_category_list에 빈 카테고리가 존재하는 경우 해당 위치에 artwork들을 옮겨줌
                * 2. new_category_list에 빈 카테고리가 존재하지 않는 경우 새로 만들어주고 해당 위치에 artwork들을 옮겨줌
                */
                this.modified_category_list.forEach((value, index) => {
                    let exist_index = null
                    new_category_list.forEach((new_value, new_index) => {
                        if (value === new_value) {
                            exist_index = new_index
                        }
                    })

                    if (exist_index === null) {
                        if (new_category_list[0] !== '') {
                            new_category_list.splice(0, 0, '')
                            new_track_list.splice(0, 0, [])
                        }
                        new_track_list[0].push(...this.modified_artwork_track_list[index])
                    }
                })

                this.modified_category_list = new_category_list.slice()
                this.modified_artwork_track_list = new_track_list.map(v => v.slice())

                this.$emit('set-modified-category-list', this.modified_category_list)
            },
            log () {
                console.log(this.modified_artwork_track_list)
            },
            async reset () {
                this.modified_artwork_track_list = this.artwork_track_list.map(v => v.slice())
                this.modified_artwork_track_list.forEach(async (value) => {
                    value.forEach(async (artwork, index) => {
                        artwork.thumbnail = await artwork.getThumbnailImage()
                        artwork.style = await cropImage(artwork.thumbnail, 1)
                    })
                })

                this.modified_category_list = this.category_list.slice()
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ExhibitionModifyPage/modifiableArtworkTrackList.scss"></style>