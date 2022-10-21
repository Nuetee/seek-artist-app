<template>
    <div class="artworkCard" v-if="this.loadFlag" @click="this.redirectMain">
        <ArtworkImageContainer :isArtwork="this.is_artwork" :image-src="this.cardImage" :order="this.order"></ArtworkImageContainer>
        <div class="exhibitionOwnerIcon" v-if="this.exhibitionId !== null">
            <svg v-if="this.is_owner === 1" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="13" cy="13" r="13" fill="white" fill-opacity="0.8" />
                <path
                    d="M18.7778 18.7778V17.3333C18.7778 16.5672 18.4734 15.8324 17.9316 15.2906C17.3899 14.7488 16.6551 14.4444 15.8889 14.4444H10.1111C9.34492 14.4444 8.61012 14.7488 8.06835 15.2906C7.52658 15.8324 7.22221 16.5672 7.22221 17.3333V18.7778"
                    stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M13 11.5556C14.5955 11.5556 15.8889 10.2622 15.8889 8.66667C15.8889 7.07118 14.5955 5.77778 13 5.77778C11.4045 5.77778 10.1111 7.07118 10.1111 8.66667C10.1111 10.2622 11.4045 11.5556 13 11.5556Z"
                    stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="13" cy="13" r="13" fill="white" fill-opacity="0.8" />
                <path
                    d="M16.3102 18.2361V16.912C16.3102 16.2097 16.0312 15.5361 15.5346 15.0395C15.0379 14.5429 14.3644 14.2639 13.662 14.2639H8.36574C7.66341 14.2639 6.98984 14.5429 6.49322 15.0395C5.99659 15.5361 5.71759 16.2097 5.71759 16.912V18.2361"
                    stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M11.0139 11.6157C12.4764 11.6157 13.662 10.4301 13.662 8.96759C13.662 7.50506 12.4764 6.31945 11.0139 6.31945C9.55136 6.31945 8.36574 7.50506 8.36574 8.96759C8.36574 10.4301 9.55136 11.6157 11.0139 11.6157Z"
                    stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M20.2824 18.2361V16.912C20.282 16.3253 20.0867 15.7553 19.7272 15.2916C19.3677 14.8279 18.8644 14.4966 18.2963 14.35"
                    stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M15.6482 6.40551C16.2178 6.55136 16.7227 6.88264 17.0832 7.34713C17.4438 7.81162 17.6395 8.3829 17.6395 8.9709C17.6395 9.5589 17.4438 10.1302 17.0832 10.5947C16.7227 11.0592 16.2178 11.3904 15.6482 11.5363"
                    stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        <ArtworkInfo :exhibition="this.exhibition" :artwork="this.artwork"></ArtworkInfo>
    </div>
</template>
<script>
    import ArtworkImageContainer from './ArtworkImageContainer.vue';
    import ArtworkInfo from './ArtworkInfo.vue';
    import { Artwork } from '@/classes/artwork';
    import { Exhibition } from '@/classes/exhibition';

    export default {
        name: 'ArtworkCard',
        components: {
            ArtworkImageContainer,
            ArtworkInfo
        },
        props: {
            artworkId: {
                type: String,
                default: null
            },
            exhibitionId: {
                type: String,
                default: null
            },
            is_owner: {
                type: Number,
                default: 0
            },
            order: String
        },
        data() {
            return {
                artwork: null,
                artworkInfo: null,
                exhibition: null,
                is_artwork: true,
                cardImage: '',
                loadFlag: false
            };
        },
        beforeCreate() {},
        async created() {
            if (this.artworkId) {
                const artwork = await new Artwork(this.artworkId).init()
                this.artwork = artwork
                this.cardImage = await this.artwork.getThumbnailImage()
            }
            else if (this.exhibitionId){
                this.is_artwork = false
                const exhibition = await new Exhibition(this.exhibitionId).init()
                this.exhibition = exhibition
                this.cardImage = await this.exhibition.getThumbnailImage()
            }

            this.loadFlag = true
        },
        methods: {
            redirectMain () {
                const _this = this
                if (this.artworkId) {
                    this.$router.push({
                        path: '/artwork-modify',
                        query: {
                            id: _this.artworkId
                        }
                    })
                }
                else if (this.exhibitionId) {
                    this.$router.push({
                        path: '/exhibition-modify',
                        query: {
                            id: _this.exhibitionId
                        }
                    })
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/widgets/artworkCard.scss"></style>