<template>
    <div class="exhibitionEditButton poppins">
        <div class="previewMode" v-if="!this.is_edit">
            <div class="editButton" @click="this.switchMode()">
                Edit
            </div>
        </div>
        <div class="editMode" v-else>
            <div class="deleteButton" @click="this.deleteExhibition()">
                Delete
            </div>
            <div class="editDoneButton" @click="this.switchMode()">
                Done
            </div>
        </div>
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
        methods: {
            switchMode() {
                this.$emit('switch-mode')
            },
            deleteExhibition () {
                this.$emit('delete-exhibition')
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ExhibitionModifyPage/exhibitionEditButton.scss"></style>