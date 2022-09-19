<template>
    <div id="linkUpload">
        <div class="goodsLinkContainer">
            <div class="title">
                굿즈 링크
            </div>
            <div class="body">
                <input v-for="(goods_link, i) in this.goods_link_array" 
                    type="text"
                    v-model="this.goods_link_array[i]"
                    placeholder="www.seek_shopping.com"
                    />
                <div class="link_addition" @click="() => { this.goods_link_array.push('') }">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#D9D9D9"/>
                    <path d="M12 6V18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 12H18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    링크 추가
                </div>
            </div>
        </div>
        <div class="videoLinkContainer">
            <div class="title">
                영상 링크
            </div>
            <div class="body">
                <input v-for="(video_link, i) in this.video_link_array" 
                    type="text"
                    v-model="this.video_link_array[i]"
                    placeholder="www.seek_shopping.com"
                    @keydown="(i === this.video_link_array.length - 1) ? this.preventTab($event) : null"
                    />
                <div class="link_addition" @click="() => { this.video_link_array.push('') }">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#D9D9D9"/>
                    <path d="M12 6V18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 12H18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    링크 추가
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'LinkUpload',
        components: {},
        data() {
            return {
                goods_link_array: [''],
                video_link_array: [''],
            };
        },
        watch: {
            goods_link_array: {
                deep: true,
                handler() {
                    this.formValidCheck()
                }
            },
            video_link_array: {
                deep: true,
                handler() {
                    this.formValidCheck()
                }
            },
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
            /**
             * - Optional이므로 항상 activate-next-button(true)
             * - 아무 값도 들어있지 않은 배열값(링크)은 제외해야 하므로 arr.filter를 통해 valid한 값만을 거른다.
             */
            formValidCheck () {
                let valid_goods_array = this.goods_link_array.filter((data) => {
                    return  data !== ''
                })
                let valid_video_array = this.video_link_array.filter((data) => {
                    return  data !== ''
                })

                this.$emit('activate-next-button', true)
                this.$emit('set-artwork-entity', 'goods_link', valid_goods_array)
                this.$emit('set-artwork-entity', 'video_link', valid_video_array)
            },
            preventTab (event) {
                if (event.keyCode === 9) {
                    event.preventDefault()
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ExhibitionRegisterPage/linkUpload.scss"></style>