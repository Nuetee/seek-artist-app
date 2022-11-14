<template>
    <div class="existingArtworkRegister">
        <MainHeader :background_color="'white'">
            <template v-slot:left>
                <div @click="this.cancle()">
                    취소
                </div>
            </template>
            <template v-slot:middle>작품 선택</template>
            <template v-slot:right>
                <div @click="this.AddArtworks()">
                    완료
                </div>
            </template>
        </MainHeader>
        <div class="artworkList" ref="artworkList">
            <div class="artworkContainer" v-for="(artwork, i) in this.own_artworks" :key="i" @click="this.selectArtwork(artwork, i)">
                <div class="artwork" v-if="artwork !== undefined && artwork !== null">
                    <div class="thumbnail">
                        <div class="imageContainer">
                            <img class="thumbnailImage" :src="artwork.thumbnail" :style="artwork.style">
                        </div>
                    </div>
                    <div class="artworkInformation">
                        <div class="artworkName poppins">{{ artwork.getName() }}</div>
                        <div class=" artist">{{ artwork.getArtistName() }}</div>
                    </div>
                    <div class="registeredArtwork" v-if="!artwork.exhibitionPossible">이미 전시 중인 작품입니다.</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import MainHeader from '../../widgets/MainHeader.vue';
    import {
        isAuth,
        getAuth
    } from '@/modules/auth';
    import { Artwork } from '@/classes/artwork';
    import { Exhibition } from '@/classes/exhibition';
    import { cropImage } from '@/modules/image';
    
    export default {
        name: 'ExistingArtworkRegister',
        components: { MainHeader },
        props: {
            exhibition: Object,
            exhibited_artwork_track_list: Array
        },
        data() {
            return {
                user: null,
                offset: 0,
                limit: 10,
                loading: false,
                own_artworks: null,
                selected_artworks: []
            };
        },
        beforeCreate() {},
        async created() {
            if (isAuth()) {
                // Fetch profile thumbnail and set
                this.user = getAuth()
            }
            else {
                this.$router.replace('/login')
                return
            }

            this.own_artworks = new Array(0)
            await this.load()
        },
        beforeMount() {},
        mounted() {
            const _this = this

            this.$refs.artworkList.addEventListener('scroll', async function (event) {
                const scroll_height = event.target.scrollHeight
                const scroll_top = event.target.scrollTop
                const offset_height = event.target.offsetHeight
                if (scroll_height === scroll_top + offset_height) {
                    await _this.load()
                }
            })
        },
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {
            async cancle () {
                this.$emit('close-artwork-register')
                await this.resetPage()
            },
            async resetPage () {
                this.selected_artworks = []
                let artworkContianer_list = document.getElementsByClassName('artworkContainer')
                for (let i = 0; i < artworkContianer_list.length; i++) {
                    artworkContianer_list[i].style.backgroundColor = 'white'
                }
                this.offset = 0
                this.limit = 10
                this.loading = false
                this.own_artworks = new Array(0)
                await this.load()
            },
            async load () {
                if (this.own_artworks.length < this.offset || this.loading) {
                    return
                }
                
                this.loading = true
                
                // 내 아트워크에 대한 page_id 리스트를 받아온다.
                let artwork_page_id_list = await this.user.getOwnArtworks(this.offset, this.limit)

                // 내 아트워크들이 현재 전시에 전시 가능한 상태인지 검사한다.
                artwork_page_id_list.forEach(async (value, index) => {
                    let artwork = new Object()
                    artwork = await new Artwork(value).init()
                    artwork.thumbnail = await artwork.getThumbnailImage()
                    artwork.style = await cropImage(artwork.thumbnail, 1)

                    // 1. 현재 전시의 전시기간이 설정 돼있지 않은 경우
                    if (this.exhibition.getStartDate() === null || this.exhibition.getEndDate() === null) {
                        artwork.exhibitionPossible = this.isExhibitedArtwork(artwork)
                    }
                    // 2. 현재 전시의 전시기간이 설정 돼있는 경우
                    else {
                        // 검사 중인 artwork가 전시돼있는 exhibition들의 page_id 리스트를 받아온다.
                        let exhibition_list = await artwork.getAttachedExhibitions()
                        // 2-1. 검사 중인 artwork가 전시된 exhibition이 있는 경우
                        if (exhibition_list.length !== 0) {
                            let index = 0
                            // artwork가 전시된 exhibition들의 전시 날짜와 현재 전시의 전시날짜 비교
                            while (index < exhibition_list.length) {
                                let exhibition = await new Exhibition(exhibition_list[index]).init()

                                let start_date = exhibition.getStartDate()
                                let end_date = exhibition.getEndDate()

                                if (start_date !== null && end_date !== null) {
                                    if (exhibition.getPageID() === this.exhibition.getPageID()) {
                                        
                                    }
                                    if (start_date < this.exhibition.getStartDate() && end_date >= this.exhibition.getStartDate()) {
                                        break
                                    }
                                    else if (start_date > this.exhibition.getStartDate() && start_date <= this.exhibition.getEndDate()) {
                                        break
                                    }
                                    else if (start_date === this.exhibition.getStartDate() && end_date === this.exhibition.getEndDate()) {
                                        if (exhibition.getPageID() !== this.exhibition.getPageID()) {
                                            break
                                        }
                                    }
                                }
                                index++
                            }

                            // 2-1-1. artwork가 전시된 exhibition(현재 전시와 다른 전시) 중 현재 전시와 전시 날짜가 겹치는 경우가 존재하는 경우
                            if (index < exhibition_list.length) {
                                artwork.exhibitionPossible = false
                            }
                            // 2-1-2. artwork가 전시된 exhibition 중 현재 전시와 전시 날짜가 겹치는 경우가 없거나 현재 전시에 이미 전시돼있던 artwork인 경우
                            else if (index === exhibition_list.length){
                                // 해당 아트워크가 현재 전시의 수정 과정에서 전시에 추가된 상태인지를 검사하여 전시 가능여부 판단.
                                artwork.exhibitionPossible = this.isExhibitedArtwork(artwork)
                            }
                        }
                        // 검사 중인 artwork가 전시된 exhibition이 없는 경우
                        else {
                            // 해당 아트워크가 현재 전시의 수정 과정에서 전시에 추가된 상태인지를 검사하여 전시 가능여부 판단.
                            artwork.exhibitionPossible = this.isExhibitedArtwork(artwork)
                        }
                    }
                    

                    this.own_artworks.push(artwork)
                })

                this.offset += this.limit
                this.loading = false
            },
            /**
             * artwork 객체를 받아서 해당 artwork가 현재 전시에 이미 전시돼있는 artwork인지 검사.
             * @param {Object} artwork 
             */
            isExhibitedArtwork(artwork) {
                let j = 0
                //console.log(this.exhibited_artwork_track_list)
                // 이미 본 전시에 추가된 아트워크이면 전시 불가.
                while (j < this.exhibited_artwork_track_list.length) {
                    let k = 0
                    while (k < this.exhibited_artwork_track_list[j].length) {
                        if (this.exhibited_artwork_track_list[j][k].getPageID() === artwork.getPageID()) {
                            break
                        }

                        k++
                    }
                    
                    if (k < this.exhibited_artwork_track_list[j].length) {
                        break
                    }

                    j++
                }
                if (j < this.exhibited_artwork_track_list.length) {
                    return false
                }
                else {
                    return true
                }
            },
            selectArtwork (artwork, index) {
                if (artwork.exhibitionPossible === false) {
                    return
                }
                let i = 0
                while (i < this.selected_artworks.length) {
                    if (this.selected_artworks[i].getID() === artwork.getID()) {
                        break
                    }
                    i++
                }

                // 이미 선택한 아트워크인 경우
                if (i !== this.selected_artworks.length) {
                    this.selected_artworks.splice(i, 1)
                    document.getElementsByClassName('artworkContainer')[index].style.backgroundColor = 'white'
                }
                // 새로 선택한 아트워크인 경우
                else {
                    this.selected_artworks.push(artwork)
                    document.getElementsByClassName('artworkContainer')[index].style.backgroundColor = '#AEAEAE'
                }
                
            },
            async AddArtworks () {
                this.$emit('add-artworks', this.selected_artworks)
                this.$emit('close-artwork-register')
                await this.resetPage()
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ExhibitionModifyPage/existingArtworkRegister.scss"></style>