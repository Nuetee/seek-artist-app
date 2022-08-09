<template>
    <button class="commonButton editButton">
        <div class="inner poppins"
            :style="'background-color: ' + this.color + '; color: ' + ((this.color==='black' ) ? 'white' : 'black' )">
            <div class="phrase" v-if="this.isEdit" @click="this.goEdit()">
                Edit
            </div>
            <div class="phrase" v-else @click="this.submit()">
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
                this.$emit('switch-page', true)
            },
            submit () {
                this.$emit('submit-artwork')
                this.$emit('switch-page', false)
            },
            switchButton (isEdit) {
                this.isEdit = isEdit
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/widgets/editButton.scss"></style>