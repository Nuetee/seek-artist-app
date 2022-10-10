<template>
    <div id="textModificationPage">
        <div class="top">
            <div @click="this.back" class="prevButton">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <div class="presentStep">텍스트 수정</div>
            <div class="nextButton" :style="(this.activateNextButton) ? 'color:black' : 'color:#959595'"
                @click="this.closeWindow()">
                <div>완료</div>
            </div>
        </div>
        <div class="textModification" v-if="!this.exhibition_selection_page && !this.cateogry_selection_page">
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
                    <input type="radio" v-model="this.threeDimensional" name="threeDimensional" :value="false" id="2D"
                        :checked="!this.old_threeDimensional">
                    <label for="2D">평면</label>
                    <input type="radio" v-model="this.threeDimensional" name="threeDimensional" :value="true" id="3D"
                        :checked="this.old_threeDimensional">
                    <label for="3D">입체</label>
                </div>
            </div>
            <div class="size">
                <div class="label">크기</div>
                <div class="form poppins">
                    <div class="background">
                        <input class="input" :placeholder="this.old_size.x" type="number" min="0"
                            v-model="this.size_x" />
                    </div>
                    <div>x</div>
                    <div class="background">
                        <input class="input" :placeholder="this.old_size.y" type="number" min="0"
                            v-model="this.size_y" />
                    </div>
                    <div v-if="(this.threeDimensional !== null) ? this.threeDimensional : this.old_threeDimensional">x
                    </div>
                    <div class="background"
                        v-if="(this.threeDimensional !== null) ? this.threeDimensional : this.old_threeDimensional">
                        <input class="input" :placeholder="this.old_size.z" type="number" min="0"
                            v-model="this.size_z" />
                    </div>
                    <div class="background unit">
                        <select class="input" name="unit" id="unit-select" @change="this.changeUnit"
                            v-model="this.old_unit">
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
            <hr class="solid">
            <div class="exhibition">
                <div class="label">전시설정</div>
                <div class="currentExhibition" v-if="this.exhibition !== null">
                    <div class="modificationContainer">
                        <div class="content">{{ this.exhibition.getName() }}</div>
                        <div class="button" @click="() => { this.exhibition_selection_page = true; this.cateogry_selection_page = false }">변경</div>
                    </div>
                    <div class="modificationContainer">
                        <div class="content">{{ this.artwork_category ? this.artwork_category : '카테고리 없음' }}</div>
                        <div class="button" @click="() => { this.exhibition_selection_page = false; this.cateogry_selection_page = true }">변경</div>
                    </div>
                </div>
                <div class="setExhibitionButton" v-else>전시에 추가하기</div>
            </div>
        </div>
        <div class="exhibitionSelection" v-else-if="this.exhibition_selection_page && !this.cateogry_selection_page">
            <div class="exhibitionContainer" v-for="(exhibition, i) in this.own_exhibitions" :key="i"
                @click="this.selectExhibition(exhibition, i)">
                <div class="exhibition" v-if="exhibition !== undefined && exhibition !== null">
                    <div class="thumbnail">
                        <div class="imageContainer">
                            <img class="thumbnailImage" :src="exhibition.thumbnail" :style="exhibition.style">
                        </div>
                    </div>
                    <div class="exhibitionInformation">
                        <div class="exhibitionkName poppins">{{ exhibition.getName() }}</div>
                    </div>
                    <div class="registeredExhibition" v-if="!exhibition.exhibitionPossible"></div>
                </div>
            </div>
        </div>
        <div class="categorySelection" v-else-if="!this.exhibition_selection_page && this.cateogry_selection_page"></div>
    </div>
</template>
<script>
    import { getAuth } from '@/modules/auth';
    import { Exhibition } from '@/classes/exhibition';
    import { cropImage } from '@/modules/image';

    export default {
        name: 'TextModification',
        props: {
            //originalArtwork: Object
            artwork: Object
        },
        data() {
            return {
                //artwork: null,
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

                exhibition: null,
                artwork_category: null,
                own_exhibitions: null,
                offset: 0,
                limit: 10,

                title: null,
                material: null,
                threeDimensional: null,
                size_x: null,
                size_y: null,
                size_z: null,
                unit: null,
                year: null,
                description: null,
                activateNextButton: false,

                exhibition_selection_page: false,
                cateogry_selection_page: false
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
            //this.artwork = this.originalArtwork
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

            let own_exhibition_page_id_list = await getAuth().getTotalExhibitions(this.offset, this.limit)
            this.offset += this.limit
            this.own_exhibitions = new Array(own_exhibition_page_id_list.length)
            
            let i = 0
            while (i < own_exhibition_page_id_list.length) {
                let exhibition = await new Exhibition(own_exhibition_page_id_list[i].page_id).init()
                exhibition.thumbnail = await exhibition.getThumbnailImage()
                exhibition.style = await cropImage(exhibition.thumbnail, 1)
                this.own_exhibitions[i] = exhibition

                i++
            }

            let attached_exhibitions = await this.artwork.getAttachedExhibitions()
            // 현재 artwork가 전시된 전시가 있는지 검사
            // 1. artwork가 전시된 전시가 없는 경우
            if (attached_exhibitions.length === 0) {
                this.exhibition = null
            }
            // 2. artwork가 전시된 전시가 있는 경우
            else {
                // 해당 전시들의 전시기간을 확인하여 현재 전시 여부 확인
                let i = 0
                let current_date = new Date()
                console.log(current_date)
                while (i < attached_exhibitions.length) {
                    let exhibition = await new Exhibition(attached_exhibitions[i]).init()
                    let end_date = new Date(exhibition.getEndDate())
                    // 만약 아직 종료되지 않은 전시인 경우 전시 설정 후 break
                    if (end_date >= current_date) {
                        this.exhibition = exhibition
                        break
                    }

                    i++
                }

                if (i < attached_exhibitions.length) {
                    // 작품이 현재 전시중인 exhibition의 name과 artwork category를 얻어옴
                    await this.exhibition.initializePage()
                    let artwork_list = this.exhibition.getArtworkList()
                    let category_list = this.exhibition.getCategoryList()
                    
                    let j = 0
                    while (j < artwork_list.length) {
                        if (artwork_list[j].getPageID() === this.artwork.getPageID()) {
                            break
                        }

                        j++
                    }

                    while (j >= 0) {
                        if (category_list[j] !== null) {
                            this.artwork_category = category_list[j]
                            break
                        }

                        j--
                    }
                }
                else {
                    this.exhibition = null
                }
            }
        },
        mounted() {},
        methods: {
            reset () {
                this.title = null
                this.material = null
                this.threeDimensional = null
                this.size_x = null
                this.size_y = null
                this.size_z = null
                this.unit = null
                this.year = null
                this.description = null
                this.activateNextButton = false
                
            },
            back () {
                //this.artwork = this.originalArtwork
                this.reset()
                this.closeWindow()
            },
            closeWindow () {
                this.$emit('close-text-modification', 'text')
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
<style lang="scss" scoped src="../../scss/ArtworkModifyPage/textModification.scss"></style>