<template>
    <div id="titleInput">
        <div>
            <textarea v-model="this.title" name="title" id="title" cols="30" rows="1" placeholder="작품명을 입력하세요"></textarea>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TitleInput',
        components: {},
        data() {
            return {
                title: ''
            };
        },
        watch: {
            'title': {
                async handler (newVal, oldVal) {
                    await this.$nextTick()
                    if (newVal.length > 0) {
                        this.$emit('activate-next-button', true)
                    }
                    else {
                        this.$emit('activate-next-button', false)
                    }
                },
                immediate: true
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
        methods: {}
    }
</script>
<style lang="scss" scoped src="../../scss/ArtworkRegisterPage/titleInput.scss"></style>