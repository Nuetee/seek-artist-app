<template>
    <div id="description">
        <div class="material">
            <div class="label">재료</div>
            <div class="background">
                <textarea class="input" v-model="this.material" name="material" cols="30" rows="1"
                    placeholder="클레이"></textarea>
            </div>
        </div>
        <div class="size">
            <div class="label">크기</div>
            <div class="form poppins">
                <div class="background">
                    <input class="input" placeholder="20" type="number" v-model="this.size.x" />
                </div>
                x
                <div class="background">
                    <input class="input" placeholder="20" type="number" v-model="this.size.y" />
                </div>
                x
                <div class="background">
                    <input class="input" placeholder="20" type="number" v-model="this.size.z" />
                </div>
                <div class="background unit">
                    <select class="input" name="unit" id="unit-select" v-model="this.unit">
                        <option value="mm">mm</option>
                        <option value="cm">cm</option>
                        <option value="m">m</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="manufacturedDate">
            <div class="label">제작연도</div>
            <div class="background poppins">
                <input class="input" placeholder="2022" type="number" v-model="this.year" />
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Description',
        components: {},
        data() {
            return {
                material: '',
                size: {
                    x: null,
                    y: null,
                    z: null,
                },
                unit: 'cm',
                year: null
            };
        },
        watch: {
            'material': 'validCheck',
            size: {
                deep: true,
                handler() {
                    this.validCheck()
                }
            },
            'year': 'validCheck'
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
            validCheck () {
                if (this.material && this.size.x && this.size.y && this.year) {
                    this.$emit('activate-next-button', true)
                }
                else {
                    this.$emit('activate-next-button', false)
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ArtworkRegisterPage/description.scss"></style>