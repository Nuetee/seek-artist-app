<template>
    <button class="commonButton editButton">
        <div class="inner poppins" v-if="this.isEdit" @click="this.goEdit()"
            :style="'background-color: ' + this.color + '; color: ' + ((this.color==='black' ) ? 'white' : 'black' )">
            <div class="phrase">
                Edit
            </div>
        </div>
        <div class="inner poppins"  v-else @click="this.submitPopup()"
            :style="'background-color: ' + this.color + '; color: ' + ((this.color==='black' ) ? 'white' : 'black' )">
            <div class="phrase">
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
            goEdit () {
                this.$emit('switch-page')
            },
            submitPopup () {
                this.$emit('show-submit-popup', true)
                // this.$emit('submit-artwork')
                // this.$emit('switch-page')
            },
            switchButton (isEdit) {
                this.isEdit = isEdit
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/widgets/editButton.scss"></style>