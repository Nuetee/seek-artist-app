<template>
    <div class="artworkMoreInfo normal">
        <div class="label">설명</div>
        <div class="content">
            {{ this.information }}
            <br /><br />
            <div v-if="this.price !== ''"> <b> {{ this.price }} </b> </div>
        </div>
        <MoreButton v-show="this.showMoreButton" @click="this.showMore($event)"></MoreButton>
    </div>
</template>
<script>
    import MoreButton from './MoreButton.vue';

    export default {
        name: 'ArtworkMoreInfo',
        components: {
            MoreButton
        },
        props: {
            artwork: Object
        },
        data() {
            return {
                information: '',
                price: '',
                showMoreButton: false
            };
        },
        created() {
            const data = this.artwork.getInformation().split('\n')
            const formatter = new Intl.NumberFormat('ko-KR', {
                style: 'currency',
                currency: 'KRW'
            })

            this.information = data[0]
            this.price = (data[1]) ? formatter.format(data[1]) : ''
        },
        mounted() {
            const _this = this
            
            const oberver = new ResizeObserver(async entries => {
                const el = entries[0].target;
                if (el.clientHeight < el.scrollHeight) {
                    _this.showMoreButton = true
                    el.classList.add('opacity-gradient')
                }
                else {
                    _this.showMoreButton = false
                    el.classList.remove('opacity-gradient')
                }
            })

            let content = document.getElementsByClassName('content')[0]
            oberver.observe(content, { box: 'content-box' });
        },
        methods: {
            showMore (event) {
                if (event.stopPropagation) event.stopPropagation();
                else event.cancelBubble = true; // IE 대응
                this.$emit('show-more');
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ArtworkModifyPage/artworkMoreInfo.scss"></style>