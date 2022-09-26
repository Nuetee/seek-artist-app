<template>
    <div class="categoryRegister">
        <div class="header">
            <div class="backButton" @click="[this.reset(), this.$emit('close-category-register')]">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div>카테고리명 입력</div>
            <div class="completeButton" @click="this.setCategoryList()">완료</div>
        </div>
        <draggable 
            v-model="this.modified_category_list"
            handle=".handle" 
            @change="this.log"
            class="draggableContainer"
        >
            <div class="categoryContainer" v-for="(category, i) in modified_category_list" v-show="category !== '' || i !== 0">
                <div class="handle" v-show="category !== ''" @click="()=>{}">
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H13" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1 7H13" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div class="category">
                    <input type="text" v-model="this.modified_category_list[i]" placeholder="카테고리명을 입력하세요!">
                </div>
                <div class="deleteButton" @click="this.deleteCategory(i)" v-show="category !== ''">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_206_1033)">
                            <circle cx="12" cy="12" r="10" fill="#D9D9D9" />
                            <path d="M7 12H17" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_206_1033">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
        </draggable>
        <div class="addCategory" @click="this.addCategory()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_11_2208)">
                    <circle cx="12" cy="12" r="10" fill="#D9D9D9" />
                    <path d="M12 6V18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6 12H18" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_11_2208">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <p>카테고리 추가</p>
        </div>
    </div>
</template>
<script>
    import { VueDraggableNext } from 'vue-draggable-next'
    export default {
        name: 'CategoryRegister',
        components: {
            draggable: VueDraggableNext
        },
        props: {
            category_list: Array
        },
        watch: {
            'category_list': {
                deep:true,
                handler () {
                    this.modified_category_list = this.category_list.slice()
                }
            },
        },
        data() {
            return {
                modified_category_list: [],
                sampleData: ['1', '2', '3']
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
            reset () {
                this.modified_category_list = this.category_list.slice()
            },
            addCategory () {
                this.modified_category_list.push('')
            },
            deleteCategory (index) {
                this.modified_category_list.splice(index, 1)
            },
            setCategoryList () {
                let is_dup = false

                this.modified_category_list.forEach((value, index) => {
                    this.modified_category_list.forEach ((value_2, index_2) => {
                        if (value === value_2 && index !== index_2) {
                            is_dup = true
                        }
                    })
                })

                const is_empty = this.modified_category_list.lastIndexOf('')

                if (is_dup || is_empty !== 0) {
                    alert ('중복된 카테고리 또는 빈 카테고리는 사용할 수 없습니다')
                    return
                }
                else {
                    this.$emit('close-category-register')
                    this.$emit('set-category-list', this.modified_category_list)
                }
            },
            log () {
                //console.log(this.modified_category_list)
            }
        }
    }
</script>
<style lang="scss" scoped src="../../scss/ExhibitionModifyPage/categoryRegister.scss"></style>