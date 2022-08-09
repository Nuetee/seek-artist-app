<template>
    <button class="commonButton editButton" @click="this.edit()">
        <div class="inner poppins" :style="'background-color: ' + this.color + '; color: ' + ((this.color==='black' ) ? 'white' : 'black' )">
            <div class="phrase" v-if="this.editInProgress">
                Done
            </div>
            <div class="phrase" v-else>
                Edit
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
                editInProgress: false,
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
            edit () {}
        }
    }
</script>
<style lang="scss" scoped src="../scss/widgets/editButton.scss"></style>