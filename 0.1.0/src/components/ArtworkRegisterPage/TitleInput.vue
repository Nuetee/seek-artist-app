<template>
    <div id="titleInput">
        <div>
            <textarea 
                v-model="this.title" 
                name="title" 
                id="title" 
                cols="30" 
                rows="1" 
                :placeholder="(this.isExhibition)? '전시명을 입력하세요' :  '작품명을 입력하세요'"
                @keydown="this.preventTab($event)">
            </textarea>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TitleInput',
        components: {},
        props: {
            isExhibition: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                title: ''
            };
        },
        watch: {
            'title': {
                async handler () {
                    await this.formValidCheck()
                },
                immediate: true
            }
        },
        methods: {
            async formValidCheck () {
                await this.$nextTick()

                if (this.title.length > 0) {
                    this.$emit('activate-next-button', true)
                    
                    if (this.isExhibition) {
                        this.$emit('set-exhibition-entity', 'title', this.title)
                    }
                    else {
                        this.$emit('set-artwork-entity', 'title', this.title)
                    }
                }
                else {
                    this.$emit('activate-next-button', false)
                }
            },
            preventTab (event) {
                if (event.keyCode === 9) {
                    event.preventDefault()
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ArtworkRegisterPage/titleInput.scss"></style>