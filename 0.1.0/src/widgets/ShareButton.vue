<template>
    <button class="shareButton commonButton">
        <svg v-show="this.isShare" @click="this.share()" width="38" height="38" viewBox="0 0 38 38" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M33.3364 21.7637V28.097C33.3364 28.9369 33.0028 29.7423 32.4089 30.3362C31.8151 30.93 31.0096 31.2637 30.1698 31.2637H8.00309C7.16324 31.2637 6.35779 30.93 5.76392 30.3362C5.17006 29.7423 4.83643 28.9369 4.83643 28.097V21.7637"
                :stroke="(this.color === 'black') ? '#000' : '#fff'" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round" />
            <path d="M27.003 10.6803L19.0863 2.76367L11.1697 10.6803"
                :stroke="(this.color === 'black') ? '#000' : '#fff'" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round" />
            <path d="M19.0864 2.76367V21.7637" :stroke="(this.color === 'black') ? '#000' : '#fff'" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <svg v-show="!this.isShare" @click="this.delete" width="32" height="35" viewBox="0 0 32 35" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M24.2348 6.48885V3.58163C24.2348 2.61799 23.5504 1.84446 22.6565 1.84446H10.3133C9.41987 1.84446 8.73497 2.61839 8.73497 3.58163V6.48885H2.53392C2.15038 6.48885 1.83945 6.79978 1.83945 7.18332C1.83945 7.56687 2.15038 7.87779 2.53392 7.87779H30.4359C30.8194 7.87779 31.1304 7.56687 31.1304 7.18332C31.1304 6.79978 30.8194 6.48885 30.4359 6.48885H24.2348ZM10.2068 3.58163C10.2068 3.45143 10.2431 3.35767 10.2801 3.29845C10.2988 3.26847 10.3173 3.2481 10.3305 3.23645C10.3318 3.23531 10.333 3.23429 10.3341 3.2334H22.6357C22.6368 3.23429 22.638 3.23531 22.6393 3.23645C22.6526 3.2481 22.671 3.26847 22.6898 3.29845C22.7268 3.35767 22.763 3.45143 22.763 3.58163V6.48885H10.2068V3.58163ZM10.3419 3.22766C10.3431 3.227 10.3429 3.22724 10.3415 3.22792L10.3419 3.22766Z"
                fill="black" stroke="black" stroke-width="0.2" />
            <path
                d="M4.84851 7.67783H4.74851V7.77783V31.7101C4.74851 33.04 5.79641 34.1278 7.09162 34.1278H25.8781C25.8783 34.1278 25.8784 34.1278 25.8785 34.1278C27.1736 34.1276 28.2212 33.0403 28.2212 31.7101V7.77783V7.67783H28.1212H26.8651H26.7651V7.77783V31.7101C26.7651 32.2743 26.357 32.7139 25.8781 32.7139H7.09162C6.61315 32.7139 6.20469 32.2742 6.20469 31.7101V7.77783V7.67783H6.10469H4.84851Z"
                fill="black" stroke="black" stroke-width="0.2" />
            <path
                d="M14.6455 25.7651V14.0959C14.6455 13.7729 14.3837 13.5111 14.0607 13.5111C13.7377 13.5111 13.4758 13.7729 13.4758 14.0959V25.7651C13.4758 26.0881 13.7377 26.35 14.0607 26.35C14.3837 26.35 14.6455 26.0881 14.6455 25.7651Z"
                fill="black" stroke="black" stroke-width="0.2" />
            <path
                d="M19.4939 25.7651V14.0959C19.4939 13.7729 19.232 13.5111 18.909 13.5111C18.586 13.5111 18.3242 13.7729 18.3242 14.0959V25.7651C18.3242 26.0881 18.586 26.35 18.909 26.35C19.232 26.35 19.4939 26.0881 19.4939 25.7651Z"
                fill="black" stroke="black" stroke-width="0.2" />
        </svg>
        <div v-show="!this.isShare">
            삭제
        </div>
    </button>
</template>
<script>
    import { deleteArtworkDirectory } from '@/modules/storage';

    export default {
        name: 'ShareButton',
        components: {},
        props: {
            color: String,
            artwork: Object
        },
        data () {
            return {
                isShare: true
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
            switchButton (isShare) {
                this.isShare = isShare
            },
            async delete () {
                if (!this.artwork) {
                    return
                }
                else {
                    // await this.artwork.deleteArtwork()

                    // For development
                    await deleteArtworkDirectory(this.artwork.getPageID())
                    await this.artwork.deletePreArtwork()
                    this.$router.replace('/')
                }
            },
            share () {
                let shareTitle = this.artwork.getName()
                let shareText = this.artwork.getName() + ' ' + this.artwork.getArtist()
                let shareUrl = window.location.href

                if (navigator.share) {
                    navigator.share({
                        title: shareTitle,
                        text: shareText,
                        url: shareUrl
                    })
                    .then(function () {
                        // this.$gtag.event('click', {
                        //     event_category: 'artwork',
                        //     event_label: 'share',
                        //     value: this.artwork.getID()
                        // })
                    })
                    .catch(error => console.log('Error sharing', error))
                }
                else {
                    let textarea = document.createElement("textarea")
                    document.body.appendChild(textarea)
                    textarea.value = shareUrl
                    textarea.select()
                    document.execCommand("copy");
                    document.body.removeChild(textarea);
                    this.$gtag.event('click', {
                        event_category: 'artwork',
                        event_label: 'share',
                        value: this.artwork.getID()
                    })
                    alert("페이지 주소를 클립보드에 복사했습니다.")
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
.shareButton {
    div {
        font-weight: 350;
        font-size: 12px;
        line-height: 17px;
        text-align: center;
        letter-spacing: -0.06em;
        color: #4D4D4D;
    }
}
</style>