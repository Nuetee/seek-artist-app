<template>
    <div id="description">
        <div class="background">
            <textarea v-model="this.description" cols="auto" rows="auto"
                :placeholder="(this.isExhibition) ? '전시에 대한 설명을 써주세요!' : '500자를 넘어갈 경우, 나머지 설명은 팝업창으로 볼 수 있습니다.'"
                @keydown="this.preventTab($event)"></textarea>
            <div v-show="!this.isExhibition" class="letterCount">{{ this.formValidCheck + '/500' }}</div>
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
        mounted () {
            if (this.isExhibition) {
                this.isFirst = false
            }
        },
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
            },
            preventTab (event) {
                if (event.keyCode === 9) {
                    event.preventDefault()
                }
            },
            resetInput() {
                this.isFirst = true
                this.description = ''
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ArtworkRegisterPage/description.scss"></style>