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
                <input type="radio" v-model="this.type" name="type" value="plane" id="plane" checked>
                <label for="plane">평면</label>
                <input type="radio" v-model="this.type" name="type" value="cubic" id="cubic">
                <label for="cubic">입체</label>
            </div>
        </div>
        <div class="size">
            <div class="label">크기</div>
            <div class="form poppins">
                <div class="background">
                    <input class="input" placeholder="20" type="number" v-model="this.size.x" />
                </div>
                <div>x</div>
                <div class="background">
                    <input class="input" placeholder="20" type="number" v-model="this.size.y" />
                </div>
                <div v-if="this.type === 'cubic'">x</div>
                <div class="background" v-if="this.type === 'cubic'">
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
    name: 'BasicInformation',
    components: {},
    data() {
        return {
            material: '',
            type: 'plane',
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
        'type' : 'validCheck',
        size: {
            deep: true,
            handler() {
                this.validCheck()
            }
        },
        'year': 'validCheck'
    },
    methods: {
        validCheck() {
            let type = (this.type === 'plane') ? true : false

            if (this.material && this.size.x && this.size.y && (type || this.size.z) && this.year) {
                this.$emit('activate-next-button', true)
                this.$emit('set-artwork-entity', 'material', this.material)
                this.$emit('set-artwork-entity', 'type', this.type)
                this.$emit('set-artwork-entity', 'size', this.size)
                this.$emit('set-artwork-entity', 'unit', this.unit)
                this.$emit('set-artwork-entity', 'year', this.year)
            }
            else {
                this.$emit('activate-next-button', false)
            }
        }
    }
}
</script>
<style lang="scss" scoped src="../../scss/ArtworkRegisterPage/basicInformation.scss">
</style>