<template>
    <div class="list" :class="is_artwork?'artwork_list':'exhibition_list'">
    </div>
</template>
<script>
import { Artwork } from '@/classes/artwork';
import { Exhibition } from '@/classes/exhibition';

export default {
    name: 'List',
    components: {},
    props: {
        single_column: {
            type: Boolean,
            default: true
        },
        id_list: {
            type: Array,
            default: null
        },
        is_artwork: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            abortController: null,
            first_column_height: 0,
            second_column_height: 0
        };
    },
    watch: {
        'single_column': {
            handler() {
                this.abortController.abort()
                this.switchChildrenSorting(this.id_list)
            }
        },
        'id_list': {
            handler () {
                const _this = this
                this.abortController.abort()
                this.abortController = null
                this.abortController = new AbortController()
                this.loadChildren(this.abortController.signal)
                    .catch(function (err) { 
                        console.log('Load is cutting off.')
                        _this.switchChildrenSorting(_this.id_list)
                    })
            }
        }
    },
    beforeCreate() {},
    created() {
        this.abortController = new AbortController()
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    methods: {
        loadChildren (abortSignal) {
            return new Promise(async (resolve, reject) => {
                abortSignal.addEventListener('abort', () => {
                    const error = new DOMException('Calculation aborted by the user', 'AbortError');
                    return reject(error);
                })
                
                let list_element = null
                if (this.is_artwork) {
                    list_element = document.getElementsByClassName("list artwork_list")[0]
                }
                else {
                    list_element = document.getElementsByClassName("list exhibition_list")[0]
                }
                
                if (!list_element) {
                    resolve(true)
                }
                else {
                    let loaded_elements_number = list_element.children.length
                    let id_list = this.id_list.slice(loaded_elements_number)

                    if (this.single_column) {
                        list_element.classList.remove('doubleColumn')
                        list_element.classList.add('singleColumn')
                    }
                    else {
                        list_element.classList.add('doubleColumn')
                        list_element.classList.remove('singleColumn')
                    }

                    for (let index in id_list) {
                        let child = document.createElement("div")
                        let thumbnail = document.createElement("img")
                        let name = document.createElement("div")

                        child.classList.add('child')
                        thumbnail.classList.add('thumbnail')
                        name.classList.add('name')

                        let id = id_list[index]
                        let thumbnail_src = null
                        let name_text = null
                        let Object = null

                        if (this.is_artwork) {
                            Object = await new Artwork(id).init()
                        }
                        else {
                            Object = await new Exhibition(id.page_id).init()
                        }

                        thumbnail_src = await Object.getThumbnailImage()
                        name_text = Object.getName()
                        thumbnail.setAttribute("src", thumbnail_src)

                        name.append(name_text)
                        child.appendChild(thumbnail)
                        child.appendChild(name)
                        list_element.appendChild(child)

                        await this.imageLoaded(thumbnail.src)

                        this.setChildStyle(child)
                    }
                    resolve(true)
                }
            })
            
        },
        switchChildrenSorting (id_list) {
            this.first_column_height = 0
            this.second_column_height = 0
            let list_element = null
            if (this.is_artwork) {
                list_element = document.getElementsByClassName("list artwork_list")[0]
            }
            else {
                list_element = document.getElementsByClassName("list exhibition_list")[0]
            }
            
            for (let child of list_element.children) {
                child.style.setProperty('transition', 'transform 0.3s ease, width 0.3s ease')
            }

            if (this.single_column) {
                list_element.classList.remove('doubleColumn')
                list_element.classList.add('singleColumn')
            }
            else {
                list_element.classList.add('doubleColumn')
                list_element.classList.remove('singleColumn')
            }

            for (let child of list_element.children) {
                this.setChildStyle(child, true)
            }
        },
        /**
         * List child element들의 style 속성을 설정하는 함수.
         * : child의 순서에 따라 transform: translate 속성을 설정한다.
         * : transition이 적용된 경우, width/height 값이 변화하기 전의 값으로 반영되므로  single_column/double_column의 상황에 맞게 translate의 y값에 child.offsetHeight의 2배 또는 1/2배를 더하여 올바른 위치를 설정한다.
         * @param {Object} child // child DOM Element 
         * @param {Boolean} width_transition // child DOM Element에 width_transition이 적용되지 않았으면 false
         */
        setChildStyle(child, width_transition = false) {
            
            if (this.single_column) {
                let name = child.children[1]

                child.style.transform = `translate(0px, ${this.first_column_height}px)`

                if (width_transition) {
                    this.first_column_height += (name.offsetHeight + ((2 * child.offsetWidth) * (child.offsetHeight - name.offsetHeight)) / (child.offsetWidth - (window.innerWidth * 0.015)))
                }
                else {
                    this.first_column_height += child.offsetHeight
                }

                // padding 속성을 first_column_height 계산 전에 먼저 설정하면 child의 height가 달라지므로 계산 값이 달라질 수 있다. 따라서 마지막에 설정한다.
                child.style.setProperty("padding-right", "0")
                child.style.setProperty("padding-left", "0")
            }
            else {
                if (this.first_column_height <= this.second_column_height) {
                    child.style.transform = `translate(0px, ${this.first_column_height}px)`
                    let name = child.children[1]

                    if (width_transition) {
                        this.first_column_height += name.offsetHeight + ((child.offsetHeight - name.offsetHeight) * ((child.offsetWidth / 2) - (window.innerWidth * 0.015))) / child.offsetWidth
                    }
                    else {
                        this.first_column_height += child.offsetHeight
                    }
                    child.style.setProperty("padding-right", "calc(var(--vw, 1vw) * 1.5)")
                }
                else {
                    child.style.transform = `translate(100%, ${this.second_column_height}px)`
                    let name = child.children[1]

                    if (width_transition) {
                        this.second_column_height += name.offsetHeight + ((child.offsetHeight - name.offsetHeight) * ((child.offsetWidth / 2) - (window.innerWidth * 0.015))) / child.offsetWidth
                    }
                    else {
                        this.second_column_height += child.offsetHeight
                    }
                    child.style.setProperty("padding-left", "calc(var(--vw, 1vw) * 1.5)")
                }
            }
        },
        imageLoaded(src) {
            return new Promise((resolve, reject) => {
                let img = new Image()
                img.onload = () => {
                    resolve(true)
                }
                img.onerror = reject
                img.src = src
            })
        }
    }
}
</script>
<style lang="scss" scoped>
* {
    border: none;
}
div.list {
    position: relative;
    margin-left: calc(var(--vw, 1vw) * 3);
    margin-right: calc(var(--vw, 1vw) * 3);
}
</style>
<style lang="scss">
.list {
    .child {
        position: absolute;
        left: 0;
        top: 0;

        .thumbnail {
            width: 100%;
            border-radius: calc(var(--vw, 1vw) * 3);
        }
        .name {
            text-align: left;
            font-weight: 500;
            font-size: 15px;
            height: calc(var(--vw, 1vw) * 9);
            padding-left: calc(var(--vw, 1vw) * 1.5);
            padding-right:calc(var(--vw, 1vw) * 1.5);
            padding-top: calc(var(--vw, 1vw) * 1);
        }
    }
}
.list.singleColumn {
    .child {
        width: 100%;
    }
}
.list.doubleColumn {
    .child {
        width: 50%;
    }
}
</style>