<template>
    <div v-show="this.loadFlag" class="artworkComponent normal">
        <div class="card" @click="this.flip()" @touchstart="this.touchStartHandler($event)">
            <div class="front">
                <ArtworkImageSlider :artwork="this.artwork"></ArtworkImageSlider>
                <ArtworkInfo :artwork="this.artwork"></ArtworkInfo>
                <ArchiveInfo :artwork="this.artwork"></ArchiveInfo>
            </div>
            <div class="back">
                <ArtworkInfo :artwork="this.artwork" :isBack="true"></ArtworkInfo>
                <ArtworkBasicInfo @show-more="this.$emit('show-more', true)" :artwork="this.artwork"></ArtworkBasicInfo>
            </div>
        </div>
    </div>
</template>
<script>
import ArtworkImageSlider from '../components/ArtworkModifyPage/ArtworkImageSlider.vue'
import ArtworkInfo from './ArtworkInfo.vue';
import ArchiveInfo from './ArchiveInfo.vue';
import ArtworkBasicInfo from '../components/ArtworkModifyPage/ArtworkBasicInfo.vue'

export default {
    name: 'ArtworkComponent',
    components: {
        ArtworkImageSlider,
        ArtworkInfo,
        ArchiveInfo,
        ArtworkBasicInfo
    },
    props: {
        artwork: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            card: null,
            isFlipped: false,
            loadFlag: false,
            touchStart: {
                x: 0,
                y: 0
            },
            touchEnd: {
                x: 0,
                y: 0
            }
        };
    },
    beforeCreate() { },
    created() { },
    beforeMount() { },
    mounted() {
        const _this = this
        _this.$nextTick(function () {
            _this.loadFlag = true
            let artworkComponent = document.getElementsByClassName('artworkComponent')[0]
            setTimeout(function () {
                artworkComponent.style.opacity = '1'
            }, 100)
            this.setEvent()
        })
    },
    methods: {
        /*
         * card DOMElement를 180도 회전시키는 함수.
         * 1. !isFlipped(뒤집어지지 않았음)이면 180도 회전된 상태로 바꿈.
         * 2. isFlipped(뒤집어진 상태)이면 0도 회전된 상태(원래 상태)로 바꿈.
         * 3. isFlipped 값을 현재 상태에 맞게 바꿔줌.
         */
        flip() {
            let front = document.getElementsByClassName('artworkComponent')[0].firstChild.firstChild
            let artworkImageSlider = front.childNodes[0]
            let artworkInfo = front.childNodes[1]

            artworkImageSlider.style.zIndex = '0'
            artworkInfo.style.zIndex = '1'

            if (this.tapClicked) {
                this.tapClicked = false
            }
            if (this.card == null) {
                this.card = document.getElementsByClassName("card")[0]
            }
            if (!this.isFlipped) {
                this.card.classList.add('flipped');
                this.$emit('show-button-name', true)
            }
            else {
                this.card.classList.remove('flipped');
                this.$emit('show-button-name', false)
            }
            this.isFlipped = !this.isFlipped
        },
        setEvent() {
            let artworkComponent = document.getElementsByClassName("artworkComponent")[0]

            artworkComponent.addEventListener('touchstart', this.touchStartHandler)
            artworkComponent.addEventListener('touchend', this.touchEndHandler)
        },
        touchStartHandler(event) {
            this.touchStart.x = event.changedTouches[0].clientX
            this.touchStart.y = event.changedTouches[0].clientY
        },
        touchEndHandler(event) {
            this.touchEnd.x = event.changedTouches[0].clientX
            this.touchEnd.y = event.changedTouches[0].clientY

            let vw = window.innerWidth / 100
            let vh = window.innerHeight / 100

            if ((this.touchEnd.y - this.touchStart.y > 10 * vh) && (Math.abs(this.touchEnd.x - this.touchStart.x)) < 20 * vw) {
                this.$emit('setComponentHeight', true)
            }
        },
        showPopUp(time) {
            let popUp = document.getElementById('archivePopUp')
            let endTime = time + 1500

            setTimeout(function () {
                popUp.classList.add('show')
            }, time)
            setTimeout(function () {
                popUp.classList.remove('show')
            }, endTime)
        },
    }
}
</script>
<style lang="scss" scoped src="../scss/widgets/artworkComponent.scss">
</style>