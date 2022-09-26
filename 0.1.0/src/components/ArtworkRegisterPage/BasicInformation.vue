<template>
    <div id="basicInformation">
        <div class="material">
            <div class="label">재료</div>
            <div class="background">
                <textarea class="input" v-model="this.material" name="material" cols="30" rows="1"
                    placeholder="클레이"></textarea>
            </div>
        </div>
        <div class="type">
            <div class="label">유형</div>
            <div class="form poppins">
                <input type="radio" v-model="this.threeDimensional" name="threeDimensional" value="2D" id="2D" checked>
                <label for="2D">평면</label>
                <input type="radio" v-model="this.threeDimensional" name="threeDimensional" value="3D" id="3D">
                <label for="3D">입체</label>
            </div>
        </div>
        <div class="size">
            <div class="label">크기</div>
            <div class="form poppins">
                <div class="background">
                    <input class="input" placeholder="20" type="number" min="0" v-model="this.size.x" />
                </div>
                <div>x</div>
                <div class="background">
                    <input class="input" placeholder="20" type="number" min="0" v-model="this.size.y" />
                </div>
                <div v-if="this.threeDimensional === '3D'">x</div>
                <div class="background" v-if="this.threeDimensional === '3D'">
                    <input class="input" placeholder="20" type="number" min="0" v-model="this.size.z" />
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
                <input class="input" placeholder="2022" type="number" min="0" v-model="this.year" @keydown="this.preventTab($event)" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BasicInformation',
    components: {},
    data() {
        return {
            material: '',
            threeDimensional: '2D',
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
        'material': 'formValidCheck',
        'threeDimensional': 'formValidCheck',
        size: {
            deep: true,
            handler() {
                this.formValidCheck()
            }
        },
        'year': 'formValidCheck'
    },
    methods: {
        formValidCheck() {
            let threeDimensional = (this.threeDimensional === '3D') ? true : false

            if (this.material && this.size.x && this.size.y && (!threeDimensional || this.size.z) && this.year) {
                this.$emit('activate-next-button', true)
                this.$emit('set-artwork-entity', 'material', this.material)
                this.$emit('set-artwork-entity', 'threeDimensional', threeDimensional)
                this.$emit('set-artwork-entity', 'size', this.size)
                this.$emit('set-artwork-entity', 'unit', this.unit)
                this.$emit('set-artwork-entity', 'year', this.year)
            }
            else {
                this.$emit('activate-next-button', false)
            }
        },
        preventTab (event) {
            if (event.keyCode === 9) {
                event.preventDefault()
            }
        },
        resetInput() {
            this.material = ''
            this.threeDimensional = '2D',
            this.size = {
                x: null,
                y: null,
                z: null,
            }
            this.unit = 'cm',
            this.year = null
        }
    }
}
</script>
<style lang="scss" scoped src="../../scss/ArtworkRegisterPage/basicInformation.scss">
</style>