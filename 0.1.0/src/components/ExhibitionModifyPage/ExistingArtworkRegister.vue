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
    import MainHeader from './MainHeader.vue';
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
            exhibition: Object
        },
        data() {
            return {
                user: null,
                offset: 0,
                limit: 20,
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

            let artwork_page_id_list = await this.user.getOwnArtworks(this.offset, this.limit)

            this.own_artworks = new Array(artwork_page_id_list.length)
            artwork_page_id_list.forEach(async (value, index) => {
                let artwork = new Object()
                artwork = await new Artwork(value).init()
                artwork.thumbnail = await artwork.getThumbnailImage()
                artwork.style = await cropImage(artwork.thumbnail, 1)
                
                let exhibition_list = await artwork.getAttachedExhibitions()
                if (exhibition_list.length !== 0) {
                    let index = 0
                    // 현재 전시가 전시기간 설정이 안돼있는 경우
                    if (this.exhibition.getStartDate() === null || this.exhibition.getEndDate() === null) {
                        while (index < exhibition_list.length) {
                            let exhibition = await new Exhibition(exhibition_list[index]).init()
                            // 작품이 현재 전시에 이미 전시돼있는 작품인 경우 break
                            if (exhibition.getPageID() === this.exhibition.getPageID()) {
                                break
                            }

                            index++
                        }
                    }
                    else {
                        while (index < exhibition_list.length) {
                            let exhibition = await new Exhibition(exhibition_list[index]).init()

                            let start_date = exhibition.getStartDate()
                            let end_date = exhibition.getEndDate()

                            if (start_date !== null && end_date !== null) {
                                if (start_date <= this.exhibition.getStartDate() && end_date >= this.exhibition.getStartDate()) {
                                    break
                                }
                                else if (start_date >= this.exhibition.getStartDate() && start_date <= this.exhibition.getEndDate()) {
                                    break
                                }
                            }
                            index++
                        }
                    }

                    if (index < exhibition_list.length) {
                        artwork.exhibitionPossible = false
                    }
                    else {
                        artwork.exhibitionPossible = true
                    }
                }
                else {
                    artwork.exhibitionPossible = true
                }
                
                this.own_artworks[index] = artwork
            })

            this.offset += this.limit
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
            cancle () {
                this.$emit('close-artwork-register')
                this.resetPage()
            },
            resetPage () {
                this.selected_artworks = new Array(0)
                let artworkContianer_list = document.getElementsByClassName('artworkContainer')
                for (let i = 0; i < artworkContianer_list.length; i++) {
                    artworkContianer_list[i].style.backgroundColor = 'white'
                }
            },
            async load () {
                if (this.own_artworks.length < this.offset) {
                    return
                }

                let artwork_page_id_list = await this.user.getOwnArtworks(this.offset, this.limit)
                let new_own_artworks = new Array()
                artwork_page_id_list.forEach(async (value, index) => {
                    let artwork = new Object()
                    artwork = await new Artwork(value).init()
                    artwork.thumbnail = await artwork.getThumbnailImage()
                    artwork.style = await cropImage(artwork.thumbnail, 1)
                    new_own_artworks.push(artwork)
                })

                this.own_artworks = [
                    ...this.own_artworks,
                    ...new_own_artworks
                ]
            },
            selectArtwork (artwork, index) {
                let i = 0
                while (i < this.selected_artworks.length) {
                    if (this.selected_artworks[i].getID() === artwork.getID()) {
                        break
                    }
                    i++
                }

                if (i !== this.selected_artworks.length) {
                    this.selected_artworks.splice(i, 1)
                    document.getElementsByClassName('artworkContainer')[index].style.backgroundColor = 'white'
                }
                else {
                    this.selected_artworks.push(artwork)
                    document.getElementsByClassName('artworkContainer')[index].style.backgroundColor = '#AEAEAE'
                }
                
            },
            AddArtworks () {
                this.$emit('add-artworks', this.selected_artworks)
                this.$emit('close-artwork-register')
                this.resetPage()
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ExhibitionModifyPage/existingArtworkRegister.scss"></style>