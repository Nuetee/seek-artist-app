<template>
    <div id="Test">
        Test
        <div id="parent"></div>
        <button @click="myFunction()">Add child</button>
    </div>
</template>
<style scoped>
#Test {
    color: red;
}

.child {
    color: blue;
}
</style>
<script>
    export default {
        name: '',
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
            myFunction () {
                let child = document.createElement('div')
                child.setAttribute('class', 'child')
                child.innerText = "child"
                let parent = document.getElementById('parent')
                parent.append(child)
            }
        }
    }
</script>
