<template>
    <div id="textModification">
        <div class="top">
            <div @click="this.back" class="prevButton">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <div class="presentStep">텍스트 수정</div>
            <div 
                class="nextButton" 
                :style="(this.activateNextButton) ? 'color:black' : 'color:#959595'" 
                @click="this.editComplete()"
            >
                <div>완료</div>
            </div>
        </div>
        <div class="bottom">
            <div class="material">
                <div class="label">작품명</div>
                <div class="background">
                    <textarea class="input" v-model="this.title" name="title" cols="30" rows="1"
                        :placeholder="this.old_title"></textarea>
                </div>
            </div>
            <hr class="solid">
            <div class="material">
                <div class="label">재료</div>
                <div class="background">
                    <textarea class="input" v-model="this.material" name="material" cols="30" rows="1"
                        :placeholder="this.old_material"></textarea>
                </div>
            </div>
            <div class="type">
                <div class="label">유형</div>
                <div class="form poppins">
                    <input type="radio" 
                        v-model="this.threeDimensional" 
                        name="threeDimensional" 
                        :value="false" 
                        id="2D" 
                        :checked="!this.old_threeDimensional">
                    <label for="2D">평면</label>
                    <input 
                        type="radio" 
                        v-model="this.threeDimensional" 
                        name="threeDimensional" 
                        :value="true" 
                        id="3D"
                        :checked="this.old_threeDimensional">
                    <label for="3D">입체</label>
                </div>
            </div>
            <div class="size">
                <div class="label">크기</div>
                <div class="form poppins">
                    <div class="background">
                        <input class="input" :placeholder="this.old_size.x" type="number" min="0" v-model="this.size_x" />
                    </div>
                    <div>x</div>
                    <div class="background">
                        <input class="input" :placeholder="this.old_size.y" type="number" min="0" v-model="this.size_y" />
                    </div>
                    <div v-if="(this.threeDimensional !== null) ? this.threeDimensional : this.old_threeDimensional">x</div>
                    <div class="background" v-if="(this.threeDimensional !== null) ? this.threeDimensional : this.old_threeDimensional">
                        <input class="input" :placeholder="this.old_size.z" type="number" min="0" v-model="this.size_z" />
                    </div>
                    <div class="background unit">
                        <select class="input" name="unit" id="unit-select" @change="this.changeUnit" v-model="this.old_unit">
                            <option v-for="value in this.unit_candidates" :key="value" :value="value">{{value}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="manufacturedDate">
                <div class="label">제작연도</div>
                <div class="background poppins">
                    <input class="input" :placeholder="this.old_year" type="number" min="0" v-model="this.year" />
                </div>
            </div>
            <hr class="solid">
            <div class="description">
                <div class="label">작품 설명</div>
                <div class="background">
                    <textarea v-model="this.description" cols="auto" rows="auto"
                        :placeholder="this.old_description"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Artwork } from '@/classes/artwork'

    export default {
        name: 'TextModification',
        props: {
            originalArtwork: Object
        },
        data() {
            return {
                artwork: null,
                old_title: '',
                old_material: '클레이',
                old_threeDimensional: false,
                old_size: {
                    x: 20,
                    y: 20,
                    z: 20
                },
                old_unit: 'cm',
                unit_candidates: ['mm', 'cm', 'm'],
                old_year: 2022,
                old_description: '작품에 대한 설명을 써 주세요!',
                title: null,
                material: null,
                threeDimensional: null,
                size_x: null,
                size_y: null,
                size_z: null,
                unit: null,
                year: null,
                description: null,
                activateNextButton: false
            };
        },
        watch: {
            title () {
                this.formValidCheck()
            },
            material () {
                this.formValidCheck()
            },
            threeDimensional () {
                this.formValidCheck()
            },
            size_x () {
                this.formValidCheck()
            },
            size_y () {
                this.formValidCheck()
            },
            size_z () {
                this.formValidCheck()
            },
            year () {
                this.formValidCheck()
            },
            description () {
                this.formValidCheck()
            }
        },
        async created() {
            this.artwork = this.originalArtwork
            
            this.old_title = this.artwork.getName()
            this.old_material = this.artwork.getMaterial()
            this.old_threeDimensional = this.artwork.getThreeDimensional()

            const old_size_array = this.artwork.getDimension().split('x').map(x => x.trim())
            const old_x = parseInt(old_size_array[0])
            this.old_size.x = (isNaN(old_x)) ? 20 : old_x
        
            if (this.old_threeDimensional) {
                const old_y = parseInt(old_size_array[1])
                this.old_size.y = (isNaN(old_y)) ? 20 : old_y

                const old_unit_array = old_size_array[2].split(' ')
                const old_z = parseInt(old_unit_array[0])
                this.old_size.z = (isNaN(old_z)) ? 20 : old_z
                this.old_unit = old_unit_array[1]
            }
            else {
                const old_unit_array = old_size_array[1].split(' ')
                const old_y = parseInt(old_unit_array[0])
                this.old_size.y = (isNaN(old_y)) ? 20 : old_y
                this.old_unit = old_unit_array[1]
            }

            this.old_year = this.artwork.getYear()
            this.old_description = this.artwork.getInformation()
        },
        mounted() {},
        methods: {
            back () {
                this.$router.replace('/')
            },
            editComplete () {
                this.$emit('edit-complete', 'text')
            },
            async submit () {
                if (!this.activateNextButton || !this.artwork) {
                    return
                }

                let result = true
                if (this.title) {
                    result = result && await this.artwork.putName(this.title) 
                }
                if (this.material) {
                    result = result && await this.artwork.putMaterial(this.material)
                }
                if (this.size_x || this.size_y || this.size_z || this.unit) {
                    const new_x = (this.size_x) ? this.size_x : this.old_size.x
                    const new_y = (this.size_y) ? this.size_y : this.old_size.y
                    const new_unit = (this.unit) ? this.unit : this.old_unit
                    const new_three_dimensional = (this.threeDimensional !== null) ? this.threeDimensional : this.old_threeDimensional
                    if (new_three_dimensional) {
                        const new_z = (this.size_z) ? this.size_z : this.old_size.z
                        const new_size = new_x + ' x ' + new_y + ' x ' + new_z + ' ' + new_unit
                        result = result && await this.artwork.putDimension(new_size)
                        if (!this.old_threeDimensional) {
                            result = result && await this.artwork.putThreeDimensional(true)
                        }
                    }
                    else {
                        const new_size = new_x + ' x ' + new_y + ' ' + new_unit
                        result = result && await this.artwork.putDimension(new_size)
                        if (this.old_threeDimensional) {
                            result = result && await this.artwork.putThreeDimensional(false)
                        }
                    }
                }
                if (this.year) {
                    result = result && await this.artwork.putYear(this.year)
                }
                if (this.description) {
                    result = result && await this.artwork.putInformation(this.description)
                }

                if (!result) {
                    alert('프로필 수정에 실패했습니다.')
                }
                else {
                    this.$router.replace('/')
                }
            },
            async changeUnit () {
                this.unit = this.old_unit
                this.formValidCheck()
            },
            formValidCheck () {
                if (this.title 
                    || this.material 
                    || this.size_x || this.size_y || this.size_z
                    || this.unit
                    || this.year
                    || this.description) {
                    let result = true
                    const new_three_dimensional = (this.threeDimensional !== null) ? this.threeDimensional : this.old_threeDimensional
                    result = result && ((this.size_x) ? this.size_x : this.old_size.x)
                    result = result && ((this.size_y) ? this.size_y : this.old_size.y)
                    if (new_three_dimensional) {
                        result = result && ((this.size_z) ? this.size_z : this.old_size.z)
                    }
                    this.activateNextButton = result
                }
                else {
                    this.activateNextButton = false
                }
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/ArtworkModifyPage/textModification.scss"></style>