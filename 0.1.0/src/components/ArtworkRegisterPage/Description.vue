<template>
    <div id="description">
        <div class="background">
            <textarea v-model="this.description" cols="auto" rows="auto"
                placeholder="500자를 넘어갈 경우, 나머지 설명은 팝업창으로 볼 수 있습니다."></textarea>
            <div class="letterCount">{{ this.formValidCheck + '/500' }}</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Description',
        components: {},
        data() {
            return {
                description: '',
                isFirst: true
            };
        },
        computed: {
            formValidCheck () {
                if (this.isFirst) {
                    this.isFirst = false
                }
                else {
                    if (this.description) {
                        this.$emit('activate-next-button', true)
                        this.$emit('set-artwork-entity', 'description', this.description)
                    }
                    else
                        this.$emit('activate-next-button', false)
                }

                return this.description.length
            }
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
            descriptionValidCheck () {
                if (this.isFirst) {
                    this.isFirst = false
                }
                else {
                    if (this.description) {
                        this.$emit('activate-next-button', true)
                        this.$emit('set-artwork-entity', 'description', this.description)
                    }
                    else
                        this.$emit('activate-next-button', false)
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ArtworkRegisterPage/description.scss"></style>