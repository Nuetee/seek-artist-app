<template>
    <div @click="this.redirect" class="profileModifyButton">
        프로필 수정
    </div>
</template>
<script>
    export default {
        name: 'ProfileModifyButton',
        components: {},
        data() {
            return {
                sampleData: ''
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
            redirect () {
                this.$router.replace('/profile-modify')
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/MyPage/profileModifyButton.scss"></style>