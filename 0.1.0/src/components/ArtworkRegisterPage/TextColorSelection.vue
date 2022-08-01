<template>
    <div id="textColorSelection">
        <div>탭하여 카드 넘기기</div>
        <Preview :artworkData="this.artworkData" :textColor="this.textColor"></Preview>
        <div class="textColorButtonContainer">
            <input type="radio" v-model="this.textColor" name="textColor" id="black" value="#000000">
            <label for="black">
                <svg v-if="this.textColor==='#000000'" width="18" height="13" viewBox="0 0 18 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 1L6 12L1 7" stroke="white" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </label>
            <input type="radio" v-model="this.textColor" name="textColor" id="white" value="#ffffff">
            <label for="white">
                <svg v-if="this.textColor==='#ffffff'" width="18" height="13" viewBox="0 0 18 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 1L6 12L1 7" stroke="black" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </label>
        </div>
    </div>
</template>
<script>
    import ArtworkComponent from '@/widgets/ArtworkComponent.vue';
    import Preview from './Preview.vue';
    
    export default {
        name: 'TextColorSelection',
        components: { ArtworkComponent, Preview },
        props: {
            artworkData: Object
        },
        data() {
            return {
                textColor: '#ffffff'
            };
        },
        watch: {
            textColor: function(newVal) {
                this.$emit('set-artwork-entity', 'textColor', newVal)
            }
        },
        beforeCreate() {},
        created() {
            this.formValdCheck()
        },
        beforeMount() {},
        mounted() {},
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {
            formValdCheck () {
                this.$emit('activate-next-button', true)
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ArtworkRegisterPage/TextColorSelection.scss"></style>