<template>
    <div id="background" :style="this.backgroundDisplayFlag ? 'display:none' : ''"></div>
</template>
<script>
    export default {
        name: 'Background',
        components: {},
        props: {
            backgroundDisplayFlag: {
                type: Boolean,
                default: false
            }
        },
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
        methods: {}
    }
</script>
<style lang="scss" scoped src="../scss/widgets/background.scss"></style>