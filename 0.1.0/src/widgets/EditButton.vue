<template>
    <button class="commonButton editButton" @click="this.edit()">
        <div class="edit inner">
            <div v-if="this.editInProgress" class="poppins">
                Done
            </div>
            <div v-else class="poppins">
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
            artwork: Object,
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