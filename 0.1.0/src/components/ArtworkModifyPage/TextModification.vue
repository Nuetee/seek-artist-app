<template>
    <div id="textModificationPage">
        <div class="main" v-if="!this.exhibition_selection_page && !this.cateogry_selection_page">
            <div class="top">
                <div @click="async () => {await this.back}" class="prevButton">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div class="presentStep">텍스트 수정</div>
                <div class="nextButton" :style="(this.activateNextButton) ? 'color:black' : 'color:#959595'"
                    @click="this.closeWindow()">
                    <div>완료</div>
                </div>
            </div>
            <div class="textModification">
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
                            <input class="input" :placeholder="this.old_size.x" type="number" min="0" v-model="this.size_x" />
                        </div>
                        <div>x</div>
                        <div class="background">
                            <input class="input" :placeholder="this.old_size.y" type="number" min="0" v-model="this.size_y" />
                        </div>
                        <div v-if="(this.threeDimensional !== null) ? this.threeDimensional : this.old_threeDimensional">x
                        </div>
                        <div class="background"
                            v-if="(this.threeDimensional !== null) ? this.threeDimensional : this.old_threeDimensional">
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
                        <textarea v-model="this.description" cols="auto" rows="auto" :placeholder="this.old_description"></textarea>
                    </div>
                </div>
                <hr class="solid">
                <div class="exhibition">
                    <div class="label">전시설정</div>
                    <div class="currentExhibition" v-if="this.exhibition !== null">
                        <div class="modificationContainer">
                            <div class="content">{{ this.exhibition.getName() }}</div>
                            <div class="button"
                                @click="() => { this.exhibition_selection_page = true; this.cateogry_selection_page = false }">변경
                            </div>
                        </div>
                        <div class="modificationContainer">
                            <div class="content">{{ this.artwork_category ? this.artwork_category : '카테고리 없음' }}</div>
                            <div class="button"
                                @click="() => { this.exhibition_selection_page = false; this.cateogry_selection_page = true }">변경
                            </div>
                        </div>
                    </div>
                    <div class="setExhibitionButton" v-else @click="() => { this.exhibition_selection_page = true; this.cateogry_selection_page = false }">전시에 추가하기</div>
                </div>
            </div>
        </div>
        <div class="exhibitionSelection" v-else-if="this.exhibition_selection_page && !this.cateogry_selection_page">
            <MainHeader>
                <template v-slot:left>
                    <div class="backButton" @click="async () => {
                        this.exhibition_selection_page = false
                        await this.cancelExhibitionSelection()
                    }">
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </template>
                <template v-slot:middle>
                    <div>전시 선택</div>
                </template>
                <template v-slot:right>
                    <div class="doneButton">
                        <div @click="async () => { this.exhibition_selection_page = false; await this.completeExhibitionSelection() }">완료</div>
                    </div>
                </template>
            </MainHeader>
            <div class="exhibitionContainer"
                v-for="(exhibition, i) in this.own_exhibitions" :key="i"
                @click="async () => {this.selectExhibition(exhibition, i)}"
                :style="exhibition.selected ? 'background-color:#AEAEAE' : 'background-color:white'"
            >
                <div class="exhibition" v-if="exhibition !== undefined && exhibition !== null">
                    <div class="thumbnail">
                        <div class="imageContainer">
                            <img class="thumbnailImage" :src="exhibition.thumbnail" :style="exhibition.style">
                        </div>
                    </div>
                    <div class="exhibitionInformation">
                        <div class="exhibitionkName poppins">{{ exhibition.getName() }}</div>
                        <div class="status">
                            {{ exhibition.status }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="categorySelection" v-else-if="!this.exhibition_selection_page && this.cateogry_selection_page">
            <MainHeader>
                <template v-slot:left>
                    <div class="backButton" @click="() => { this.cateogry_selection_page = false; this.artwork_category = this.old_artwork_category}">
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </template>
                <template v-slot:middle>
                    <div>카테고리 선택</div>
                </template>
                <template v-slot:right>
                    <div class="doneButton">
                        <div @click="() => {this.cateogry_selection_page = false; this.old_artwork_category = this.artwork_category}">완료</div>
                    </div>
                </template>
            </MainHeader>
            <div class="categoryContainer" v-for="(category, i) in this.category_object_list" :key="i"
                @click="this.selectCategory(i)"
                :style="category.name === this.artwork_category ? 'background-color:#AEAEAE' : 'background-color:white'">
                <div class="category" v-if="category !== undefined && category !== null">
                    {{ category.name }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { getAuth } from '@/modules/auth';
    import { Exhibition } from '@/classes/exhibition';
    import { cropImage } from '@/modules/image';
    import MainHeader from '../ExhibitionModifyPage/MainHeader.vue';

    export default {
    name: "TextModification",
    components: { MainHeader },
    props: {
        artwork: Object
    },
    data() {
        return {
            old_title: "",
            old_material: "클레이",
            old_threeDimensional: false,
            old_size: {
                x: 20,
                y: 20,
                z: 20
            },
            old_unit: "cm",
            unit_candidates: ["mm", "cm", "m"],
            old_year: 2022,
            old_description: "작품에 대한 설명을 써 주세요!",

            old_exhibition: null,
            // 전시 변경 수정 중 전시
            exhibition: null,

            original_artwork_category: null,
            old_artwork_category: null,
            artwork_category: null,

            old_selected_exhibitions_list: null,
            own_exhibitions: null,
            attached_exhibitions: null,
            category_object_list: null,

            offset: 0,
            limit: 10,
            loading:false,

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
            cateogry_selection_page: false,
        };
    },
    watch: {
        title() {
            this.formValidCheck();
        },
        material() {
            this.formValidCheck();
        },
        threeDimensional() {
            this.formValidCheck();
        },
        size_x() {
            this.formValidCheck();
        },
        size_y() {
            this.formValidCheck();
        },
        size_z() {
            this.formValidCheck();
        },
        year() {
            this.formValidCheck();
        },
        description() {
            this.formValidCheck();
        },
    },
    async created() {
        await this.totalReset()
    },
    mounted() { },
    methods: {
        async totalReset() {
            this.old_title = this.artwork.getName();
            this.old_material = this.artwork.getMaterial();
            this.old_threeDimensional = this.artwork.getThreeDimensional();
            const old_size_array = this.artwork.getDimension().split("x").map(x => x.trim());
            const old_x = parseInt(old_size_array[0]);
            this.old_size.x = (isNaN(old_x)) ? 20 : old_x;
            if (this.old_threeDimensional) {
                const old_y = parseInt(old_size_array[1]);
                this.old_size.y = (isNaN(old_y)) ? 20 : old_y;
                const old_unit_array = old_size_array[2].split(" ");
                const old_z = parseInt(old_unit_array[0]);
                this.old_size.z = (isNaN(old_z)) ? 20 : old_z;
                this.old_unit = old_unit_array[1];
            }
            else {
                const old_unit_array = old_size_array[1].split(" ");
                const old_y = parseInt(old_unit_array[0]);
                this.old_size.y = (isNaN(old_y)) ? 20 : old_y;
                this.old_unit = old_unit_array[1];
            }
            this.old_year = this.artwork.getYear();
            this.old_description = this.artwork.getInformation();

            await this.reset()
        },
        async reset() {
            this.title = this.old_title;
            this.material = this.old_material;
            this.threeDimensional = this.old_threeDimensional;
            this.size_x = this.old_size.x;
            this.size_y = this.old_size.y;
            this.size_z = this.old_size.z;
            this.unit = this.old_unit;
            this.year = this.old_year;
            this.description = this.old_description;
            this.activateNextButton = true;

            await this.resetExhibitionSetting()
        },
        async resetExhibitionSetting() {
            let attached_exhibition_page_id_list = await this.artwork.getAttachedExhibitions();
            this.attached_exhibitions = new Array(0)
            this.exhibition = null

            // 현재 artwork가 전시된 전시가 있는지 검사
            // 1. artwork가 전시된 전시가 없는 경우
            if (attached_exhibition_page_id_list.length === 0) {
                this.exhibition = null;
            }
            // 2. artwork가 전시된 전시가 있는 경우
            else {
                // 해당 전시들의 전시기간을 확인하여 현재 전시 여부 확인
                let i = 0;
                let current_date = new Date();

                while (i < attached_exhibition_page_id_list.length) {
                    let exhibition = await new Exhibition(attached_exhibition_page_id_list[i]).init();
                    let end_date = new Date(exhibition.getEndDate());
                    // 만약 아직 종료되지 않은 전시인 경우 전시 설정 후 break
                    if (end_date >= current_date) {
                        this.exhibition = exhibition;
                    }

                    this.attached_exhibitions.push(exhibition)
                    i++;
                }
                if (this.exhibition !== null) {
                    // 작품이 현재 전시중인 exhibition의 name과 artwork category를 얻어옴
                    await this.exhibition.initializePage();
                    let artwork_list = this.exhibition.getArtworkList();
                    let category_list = this.exhibition.getCategoryList();
                    let j = 0;
                    while (j < artwork_list.length) {
                        if (artwork_list[j].getPageID() === this.artwork.getPageID()) {
                            break;
                        }
                        j++;
                    }
                    while (j >= 0) {
                        if (category_list[j] !== null) {
                            this.artwork_category = category_list[j];
                            break;
                        }
                        j--;
                    }
                }
                else {
                    this.exhibition = null;
                }
                await this.setCategoryObjectList()
                this.old_exhibition = this.exhibition
                this.old_artwork_category = this.artwork_category
            }

            this.own_exhibitions = new Array(0)
            await this.loadOwnExhibitions()
            this.old_selected_exhibitions_list = new Array(this.own_exhibitions.length)
            this.own_exhibitions.forEach((value, index) => {
                this.old_selected_exhibitions_list[index] = value.selected
            })
        },
        async back() {
            await this.reset();
            this.closeWindow();
        },
        closeWindow() {
            this.$emit("close-text-modification", "text");
        },
        async loadOwnExhibitions() {
            if (this.own_exhibitions.length < this.offset || this.loading) {
                return
            }

            this.loading = true

            let own_exhibition_page_id_list = await getAuth().getTotalExhibitions(this.offset, this.limit);
            this.offset += this.limit;
            
            let i = 0;
            while (i < own_exhibition_page_id_list.length) {
                let exhibition = await new Exhibition(own_exhibition_page_id_list[i].page_id).init();
                exhibition.thumbnail = await exhibition.getThumbnailImage();
                exhibition.style = await cropImage(exhibition.thumbnail, 1);
                let current_date = new Date()
                let end_date = new Date(exhibition.getEndDate())
                if (end_date < current_date) {
                    exhibition.status = '종료'
                }
                else {
                    exhibition.status = '진행 중'
                }

                exhibition.selected = this.checkExhibitionSelected(exhibition, this.attached_exhibitions)

                this.own_exhibitions.push(exhibition);
                i++;
            }

            this.loading = false
        },
        checkExhibitionSelected(exhibition, exhibition_list) {
            for (let i = 0; i < exhibition_list.length; i++) {
                if (exhibition.getPageID() === exhibition_list[i].getPageID()) {
                    return true
                }
            }
            return false
        },
        async cancelExhibitionSelection () {
            this.offset = 0
            this.limit = 10
            this.exhibition = this.old_exhibition
            this.artwork_category = this.old_artwork_category
            this.old_selected_exhibitions_list.forEach((value, index) => {
                this.own_exhibitions[index].selected = value
            })
        },
        async completeExhibitionSelection () {
            this.old_exhibition = this.exhibition
            this.old_artwork_category = this.artwork_category
            this.own_exhibitions.forEach((value, index) => {
                this.old_selected_exhibitions_list[index] = value.selected
            })
            await this.setCategoryObjectList()
        },
        async setCategoryObjectList () {
            this.category_object_list = new Array(0)
            if (this.exhibition === null) {
                return
            }
            
            await this.exhibition.initializePage()
            let artwork_list = this.exhibition.getArtworkList()
            let category_list = this.exhibition.getCategoryList()

            // 아무 카테고리에도 속하지 않은 아트워크들이 있는 경우
            if (category_list[0] === null) {
                category_list[0] = ''
            }
            let category_object_list_index = 0
            category_list.forEach((value, index) => {
                if (value !== null) {
                    let category_object = new Object()
                    category_object.name = value
                    category_object.artwork_list = new Array(0)

                    this.category_object_list.push(category_object)
                    category_object_list_index = this.category_object_list.length - 1
                }

                if (category_object_list_index >= 0) {
                    this.category_object_list[category_object_list_index].artwork_list.push(artwork_list[index])
                }
            })
        },
        selectCategory(index) {
            let category_object = this.category_object_list[index]
            // 선택한 카테고리를 해제하는 경우
            if (this.artwork_category === category_object.name) {
                this.artwork_category = ''
            }
            else {
                this.artwork_category = category_object.name
            }
        },
        async submit() {
            if (!this.activateNextButton || !this.artwork) {
                return;
            }
            let result = true;
            if (this.title) {
                result = result && await this.artwork.putName(this.title);
            }
            if (this.material) {
                result = result && await this.artwork.putMaterial(this.material);
            }
            if (this.size_x || this.size_y || this.size_z || this.unit) {
                const new_x = (this.size_x) ? this.size_x : this.old_size.x;
                const new_y = (this.size_y) ? this.size_y : this.old_size.y;
                const new_unit = (this.unit) ? this.unit : this.old_unit;
                const new_three_dimensional = (this.threeDimensional !== null) ? this.threeDimensional : this.old_threeDimensional;
                if (new_three_dimensional) {
                    const new_z = (this.size_z) ? this.size_z : this.old_size.z;
                    const new_size = new_x + " x " + new_y + " x " + new_z + " " + new_unit;
                    result = result && await this.artwork.putDimension(new_size);
                    if (!this.old_threeDimensional) {
                        result = result && await this.artwork.putThreeDimensional(true);
                    }
                }
                else {
                    const new_size = new_x + " x " + new_y + " " + new_unit;
                    result = result && await this.artwork.putDimension(new_size);
                    if (this.old_threeDimensional) {
                        result = result && await this.artwork.putThreeDimensional(false);
                    }
                }
            }
            if (this.year) {
                result = result && await this.artwork.putYear(this.year);
            }
            if (this.description) {
                result = result && await this.artwork.putInformation(this.description);
            }

            // 아트워크가 삭제된 전시와 아트워크가 추가된 전시를 얻어온다
            let deleted_exhibition_list = new Array(0)
            let added_exhibition_list = new Array(0)
            // 새로 선택된 전시 리스트
            let selected_exhibition_list = new Array(0)
            this.own_exhibitions.forEach((value) => {
                if (value.selected) {
                    selected_exhibition_list.push(value)
                }
            })
            
            this.attached_exhibitions.forEach((value) => {
                let i = 0
                while (i < selected_exhibition_list.length) {
                    if (value.getPageID() === selected_exhibition_list[i].getPageID()) {
                        break
                    }
                    i++
                }
                if (i === selected_exhibition_list.length) {
                    deleted_exhibition_list.push(value)
                }
            })

            selected_exhibition_list.forEach((value) => {
                let i = 0
                while (i < this.attached_exhibitions.length) {
                    if (value.getPageID() === this.attached_exhibitions[i].getPageID()) {
                        break
                    }
                    i++
                }
                if (i === this.attached_exhibitions.length) {
                    added_exhibition_list.push(value)
                }
            })

            // 전시에서 아트워크 삭제
            for (let i = 0; i < deleted_exhibition_list.length; i++) {
                let deleted_exhibition = deleted_exhibition_list[i]
                await deleted_exhibition.initializePage()
                let category_list = deleted_exhibition.getCategoryList()
                let artwork_list = deleted_exhibition.getArtworkList()
                let deleted_artwork_category = null
                if (category_list[0] === null) {
                    category_list[0] = ''
                }

                for (let j = 0; j < artwork_list.length; j++) {
                    if (artwork_list[j].getPageID() === this.artwork.getPageID()) {
                        for (let k = j; k >= 0; k--) {
                            if (category_list[k] !== null) {
                                deleted_artwork_category = category_list[k]
                                category_list.splice(j, 1)
                                artwork_list.splice(j, 1)
                                // 삭제한 category_element가 category값을 저장하고 있는 category_element인 경우
                                if (j === k) {
                                    // 해당 category에 속하는 category_element가 1개 초과일 경우
                                    if (category_list[j] === null) {
                                        category_list[j] = deleted_artwork_category
                                    }
                                }
                                break
                            }
                        }
                        break
                    }
                }

                let artwork_id_list = new Array(artwork_list.length)
                artwork_list.forEach((value, index) => {
                    artwork_id_list[index] = value.getID()
                })

                result = result && await deleted_exhibition.putCategory(category_list, artwork_id_list)
            }

            // 전시에 아트워크 추가
            for (let i = 0; i < added_exhibition_list.length; i++) {
                let added_exhibition = added_exhibition_list[i]
                await added_exhibition.initializePage()
                let category_list = added_exhibition.getCategoryList()
                let artwork_list = added_exhibition.getArtworkList()
                if (category_list[0] === null) {
                    category_list[0] = ''
                }

                if (this.exhibition.getPageID() === added_exhibition.getPageID()) {
                    for (let j = 0; j < category_list.length; j++) {
                        if (this.artwork_category === category_list[j]) {
                            // 해당 카테고리에 아트워크 개수 하나 추가
                            category_list.splice(j + 1, 0, null)
                            // 현재 아트워크를 해당 카테고리의 첫번째 위치에 삽입
                            artwork_list.splice(j, 0, this.artwork)
                        }
                    }
                }
                else {
                    if (category_list[0] === '') {
                        category_list.splice(1, 0, null)
                        artwork_list.splice(0, 0, this.artwork)
                    }
                    else {
                        category_list.splice(0, 0, '')
                        artwork_list.splice(0, 0, this.artwork)
                    }
                }

                let artwork_id_list = new Array(artwork_list.length)
                artwork_list.forEach((value, index) => {
                    artwork_id_list[index] = value.getID()
                })
                result = result && await added_exhibition.putCategory(category_list, artwork_id_list)
            }

            // 현재 전시에서 카테고리 변경 사항 저장
            if (this.exhibition !== null) {
                let category_list = this.exhibition.getCategoryList()
                let artwork_list = this.exhibition.getArtworkList()
                if (category_list[0] === null) {
                    category_list[0] = ''
                }

                let artwork_index = 0
                let original_category_index = 0
                for (let i = 0; i < artwork_list.length; i++) {
                    if (this.artwork.getPageID() === artwork_list[i].getPageID()) {
                        artwork_index = i
                        for (let j = i; j >= 0; j--) {
                            if (category_list[j] !== null) {
                                original_category_index = j
                                break
                            }
                        }
                        break
                    }
                }

                let modified_category_index = 0
                for (let i = 0; i < category_list.length; i++) {
                    if (this.artwork_category === category_list[i]) {
                        modified_category_index = i
                        break
                    }
                }

                if (original_category_index !== modified_category_index) {
                    // original category에 artwork가 현재 아트워크 하나 존재했던 경우
                    // original_category_index + 1가 범위를 넘어가면 undefined로 아트워크 하나인 경우에 속한다.
                    if (category_list[original_category_index + 1] !== null) {
                        category_list.splice(original_category_index, 1)
                        artwork_list.splice(artwork_index, 1)
                    }
                    else {
                        category_list.splice(original_category_index + 1, 1)
                        artwork_list.splice(artwork_index, 1)
                    }

                    if (original_category_index < modified_category_index) {
                        modified_category_index -= 1
                    }
                    category_list.splice(modified_category_index + 1, 0, null)
                    artwork_list.splice(modified_category_index, 0, this.artwork)

                    let artwork_id_list = new Array(artwork_list.length)
                    artwork_list.forEach((value, index) => {
                        artwork_id_list[index] = value.getID()
                    })
                    result = result && await this.exhibition.putCategory(category_list, artwork_id_list)
                }
            }

            if (!result) {
                alert("텍스트 수정에 실패했습니다.");
            }

            await this.totalReset()
        },
        async changeUnit() {
            this.unit = this.old_unit;
            this.formValidCheck();
        },
        formValidCheck() {
            if (this.title
                || this.material
                || this.size_x || this.size_y || this.size_z
                || this.unit
                || this.year
                || this.description) {
                let result = true;
                const new_three_dimensional = (this.threeDimensional !== null) ? this.threeDimensional : this.old_threeDimensional;
                result = result && ((this.size_x) ? this.size_x : this.old_size.x);
                result = result && ((this.size_y) ? this.size_y : this.old_size.y);
                if (new_three_dimensional) {
                    result = result && ((this.size_z) ? this.size_z : this.old_size.z);
                }
                this.activateNextButton = result;
            }
            else {
                this.activateNextButton = false;
            }
        },
        async selectExhibition (exhibition, index) {
            if (!exhibition.selected) {
                let current_date = new Date()
                if (current_date < new Date(exhibition.getEndDate())) {
                    for (let i = 0; i < this.own_exhibitions.length; i++) {
                        if (this.own_exhibitions[i].selected) {
                            if (current_date < new Date(this.own_exhibitions[i].getEndDate())) {
                                alert('진행 중인 전시는 하나만 선택 가능합니다!')
                                return
                            }
                        }
                    }
                    this.exhibition = exhibition
                    //await this.setCategoryObjectList()
                    this.artwork_category = ''
                }
            }
            else if (this.exhibition !== null) {
                if (exhibition.getPageID() === this.exhibition.getPageID()) {
                    this.exhibition = null
                    //await this.setCategoryObjectList()
                    this.artwork_category = null
                }
            }
            exhibition.selected = !exhibition.selected
        },
    },
}
</script>
<style lang="scss" scoped src="../../scss/ArtworkModifyPage/textModification.scss"></style>