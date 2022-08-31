<template>
    <div id="description">
        <div class="background">
            <textarea v-if="this.isExhibition" v-model="this.description" cols="auto" rows="auto"
                placeholder="전시에 대한 설명을 써주세요!"></textarea>
            <textarea v-else v-model="this.description" cols="auto" rows="auto"
                placeholder="500자를 넘어갈 경우, 나머지 설명은 팝업창으로 볼 수 있습니다."></textarea>
            <div v-if="!this.isExhibition" class="letterCount">{{ this.formValidCheck + '/500' }}</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Description',
        components: {},
        props: {
            isExhibition: {
                type: Boolean,
                default: false
            }
        },
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
                        
                        if (this.isExhibition) {
                            this.$emit('set-exhibition-entity', 'description', this.description)
                        }
                        else {
                            this.$emit('set-artwork-entity', 'description', this.description)
                        }
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
                        
                        if (this.isExhibition) {
                            this.$emit('set-exhibition-entity', 'description', this.description)
                        }
                        else {
                            this.$emit('set-artwork-entity', 'description', this.description)
                        }
                    }
                    else
                        this.$emit('activate-next-button', false)
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ArtworkRegisterPage/description.scss"></style>