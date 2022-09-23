<template>
    <div class="exhibitionEditButton">
        <div class="previewMode" v-if="!this.is_edit">Edit</div>
        <div class="editMode" v-else>Done</div>
    </div>
</template>
<script>
    export default {
        name: 'ExhibitionEditButton',
        components: {},
        props: {
            is_edit: {
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
<style lang="scss" scoped src="../../scss/ExhibitionModifyPage/exhibitionEditButton.scss"></style>