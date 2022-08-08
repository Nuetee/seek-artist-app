<template>
    <button class="shareButton commonButton">
        <svg @click="this.share()" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.95 15.2375C14.8826 15.1722 14.829 15.094 14.7925 15.0076C14.7559 14.9212 14.737 14.8283 14.737 14.7344C14.737 14.6406 14.7559 14.5477 14.7925 14.4612C14.829 14.3748 14.8826 14.2966 14.95 14.2313L22.4969 6.68441C22.5622 6.61703 22.6404 6.56345 22.7268 6.52687C22.8133 6.49029 22.9061 6.47144 23 6.47144C23.0939 6.47144 23.1867 6.49029 23.2732 6.52687C23.3596 6.56345 23.4378 6.61703 23.5031 6.68441L31.05 14.2313C31.1174 14.2966 31.1709 14.3748 31.2075 14.4612C31.2441 14.5477 31.263 14.6406 31.263 14.7344C31.263 14.8283 31.2441 14.9212 31.2075 15.0076C31.1709 15.094 31.1174 15.1722 31.05 15.2375C30.9847 15.3049 30.9065 15.3585 30.82 15.3951C30.7336 15.4317 30.6407 15.4505 30.5469 15.4505C30.453 15.4505 30.3601 15.4317 30.2737 15.3951C30.1873 15.3585 30.1091 15.3049 30.0437 15.2375L23.7188 8.9305V27.3125C23.7188 27.5032 23.643 27.686 23.5082 27.8208C23.3734 27.9556 23.1906 28.0313 23 28.0313C22.8094 28.0313 22.6266 27.9556 22.4918 27.8208C22.357 27.686 22.2812 27.5032 22.2812 27.3125V8.9305L15.9563 15.2375C15.8909 15.3049 15.8127 15.3585 15.7263 15.3951C15.6399 15.4317 15.547 15.4505 15.4531 15.4505C15.3593 15.4505 15.2664 15.4317 15.18 15.3951C15.0935 15.3585 15.0153 15.3049 14.95 15.2375ZM38.8125 26.5938C38.6219 26.5938 38.4391 26.6695 38.3043 26.8043C38.1695 26.9391 38.0938 27.1219 38.0938 27.3125V37.375C38.0938 37.5657 38.018 37.7485 37.8832 37.8833C37.7484 38.0181 37.5656 38.0938 37.375 38.0938H8.625C8.43438 38.0938 8.25156 38.0181 8.11677 37.8833C7.98198 37.7485 7.90625 37.5657 7.90625 37.375V27.3125C7.90625 27.1219 7.83052 26.9391 7.69573 26.8043C7.56094 26.6695 7.37812 26.5938 7.1875 26.5938C6.99688 26.5938 6.81406 26.6695 6.67927 26.8043C6.54448 26.9391 6.46875 27.1219 6.46875 27.3125V37.375C6.46875 37.9469 6.69593 38.4954 7.1003 38.8997C7.50468 39.3041 8.05313 39.5313 8.625 39.5313H37.375C37.9469 39.5313 38.4953 39.3041 38.8997 38.8997C39.3041 38.4954 39.5312 37.9469 39.5312 37.375V27.3125C39.5312 27.1219 39.4555 26.9391 39.3207 26.8043C39.1859 26.6695 39.0031 26.5938 38.8125 26.5938Z" fill="black"/>
        </svg>
        <div v-show="this.nameShowFlag">
            공유
        </div>
    </button>
</template>
<script>
    export default {
        name: 'ShareButton',
        components: {},
        props: {
            artwork: Object
        },
        data () {
            return {
                nameShowFlag: false
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
            showButtonName(showFlag) {
                this.nameShowFlag = showFlag
            },
            share () {
                let shareTitle = this.artwork.getName()
                let shareText = this.artwork.getName() + ' ' + this.artwork.getArtistName()
                let shareUrl = window.location.href

                if (navigator.share) {
                    navigator.share({
                        title: shareTitle,
                        text: shareText,
                        url: shareUrl
                    })
                    .then(function () {
                        console.log('Sharing success', error)
                        this.$gtag.event('click', {
                            event_category: 'artwork',
                            event_label: 'share',
                            value: this.artwork.getID()
                        })
                    })
                    .catch((error) => console.log('Error sharing', error))
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