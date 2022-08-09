<template>
    <button class="commonButton editButton">
        <div class="inner poppins"
            :style="'background-color: ' + this.color + '; color: ' + ((this.color==='black' ) ? 'white' : 'black' )">
            <div class="phrase" v-if="this.isEdit">
                Edit
            </div>
            <div class="phrase" v-else>
                Done
            </div>
        </div>
    </button>
</template>
<script>

    export default {
        name: 'EditButton',
        components: {},
        props: {
            color: String,
        },
        data() {
            return {
                isEdit: true,
            };
        },
        beforeCreate() {},
        created () {},
        beforeMount() {},
        mounted() {},
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {
            switchButton (isEdit) {
                this.isEdit = isEdit
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/widgets/editButton.scss"></style>