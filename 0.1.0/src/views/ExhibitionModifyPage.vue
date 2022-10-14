<template>
    <div id="exhibitionModifyPage">
        <div class="mainPage" v-show="!this.artwork_register_process && !this.category_register_process">
            <MainHeader :background_color="'white'" v-show="this.bodyShowFlag">
                <template v-slot:left>
                    <div v-if="!this.is_edit" class="seekLogo">
                        <img src="../assets/seek_logo.png">
                        <div class="poppins">for artist</div>
                    </div>
                    <div v-else @click="this.reset()" class="backButton">
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </template>
                <template v-slot:middle>
                    <div v-if="this.is_edit">전시 편집</div>
                </template>
                <template v-slot:right>
                    <RoundProfile :profile="this.user_thumbnail" @click="this.openSideBar($event)" :color="'black'"></RoundProfile>
                </template>
            </MainHeader>
            <div id="viewPort">
                <div id="loading">
                    <div class="notArchive">
                        <div class="eye">
                            <svg class="eyelid" width="36" height="34" viewBox="0 0 36 34" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18.0002 0C13.1921 0 8.67214 1.76831 5.27225 4.97929C1.87235 8.19028 0 12.4591 0 17C0 21.5409 1.87235 25.8101 5.27225 29.0207C8.67179 32.2317 13.1921 34 18.0002 34C22.8083 34 27.3286 32.2317 30.7281 29.0207C32.76 27.1018 34.2897 24.7367 35.1516 22.181L35.2706 21.828H33.571L33.5047 22.0114C32.6954 24.2509 31.3758 26.2454 29.5826 27.9392C26.4888 30.8611 22.3753 32.4703 17.9998 32.4703C13.6243 32.4703 9.51119 30.8611 6.41737 27.9392C3.32356 25.0173 1.70103 21.3148 1.62253 17.2918H35.4767V17.2708H36V17C36 12.4591 34.1277 8.19028 30.7278 4.97929C27.3279 1.76831 22.8079 0 17.9998 0H18.0002ZM18.0002 1.52967C22.3757 1.52967 26.4888 3.13888 29.583 6.06079C31.0027 7.40158 32.1345 8.9458 32.9474 10.6508C33.7173 12.2651 34.1814 13.9833 34.3294 15.7618H1.67128C1.81894 13.9833 2.28344 12.2654 3.05331 10.6508C3.86619 8.9458 4.99806 7.40158 6.41773 6.06079C9.51155 3.13888 13.625 1.52967 18.0002 1.52967Z"
                                    fill="white" />
                            </svg>
                            <svg class="pupil" width="17" height="8" viewBox="0 0 17 8" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 8C13.1944 8 17 4.41829 17 0H0C0 4.41829 3.80556 8 8.5 8Z" fill="white" />
                            </svg>
                        </div>
                        <div class="eye">
                            <svg class="eyelid" width="36" height="34" viewBox="0 0 36 34" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18.0002 0C13.1921 0 8.67214 1.76831 5.27225 4.97929C1.87235 8.19028 0 12.4591 0 17C0 21.5409 1.87235 25.8101 5.27225 29.0207C8.67179 32.2317 13.1921 34 18.0002 34C22.8083 34 27.3286 32.2317 30.7281 29.0207C32.76 27.1018 34.2897 24.7367 35.1516 22.181L35.2706 21.828H33.571L33.5047 22.0114C32.6954 24.2509 31.3758 26.2454 29.5826 27.9392C26.4888 30.8611 22.3753 32.4703 17.9998 32.4703C13.6243 32.4703 9.51119 30.8611 6.41737 27.9392C3.32356 25.0173 1.70103 21.3148 1.62253 17.2918H35.4767V17.2708H36V17C36 12.4591 34.1277 8.19028 30.7278 4.97929C27.3279 1.76831 22.8079 0 17.9998 0H18.0002ZM18.0002 1.52967C22.3757 1.52967 26.4888 3.13888 29.583 6.06079C31.0027 7.40158 32.1345 8.9458 32.9474 10.6508C33.7173 12.2651 34.1814 13.9833 34.3294 15.7618H1.67128C1.81894 13.9833 2.28344 12.2654 3.05331 10.6508C3.86619 8.9458 4.99806 7.40158 6.41773 6.06079C9.51155 3.13888 13.625 1.52967 18.0002 1.52967Z"
                                    fill="white" />
                            </svg>
                            <svg class="pupil" width="17" height="8" viewBox="0 0 17 8" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 8C13.1944 8 17 4.41829 17 0H0C0 4.41829 3.80556 8 8.5 8Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                    <div class="phrase poppins">
                        입장 중<span>.</span><span>.</span><span>.</span>
                    </div>
                </div>
                <transition-group name="slide-fade" tag="div">
                    <div id="body" v-if="this.exhibition" v-show="this.bodyShowFlag">
                        <div class="poster">
                            <img id="posterImage" 
                                @load="() => {this.bodyShowFlag = true}" 
                                :src="this.modified_poster_image"
                            />
                            <div
                                class="posterEdit"
                                v-if="this.is_edit && this.user.getID() === this.exhibition.getOwner().getID()"
                            >
                                <label 
                                    class="posterEditButton poppins"
                                    for="posterImageSelection"
                                >
                                    Edit
                                </label>
                                <input type="file" id="posterImageSelection" ref="posterImageSelection" accept="image/*">
                            </div>
                        </div>
                        <div class="collaboratorContainer" v-if="this.is_edit">
                            <div class="containerName">참여 멤버</div>
                            <div class="collaboratorList">
                                <RoundProfile v-for="(artist, i) in collaborator_list" :profile="artist.thumbnail"></RoundProfile>
                            </div>
                            <div class="inviteButton" @click="() => { this.$refs.invitationDrawer.showDrawer(); }">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" fill="#D9D9D9" />
                                    <path d="M12 6V18" stroke="#959595" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M6 12H18" stroke="#959595" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                추가
                            </div>
                        </div>
                        <div class="editExhibitionInformation" v-if="this.is_edit && this.user.getID() === this.exhibition.getOwner().getID()">
                            <div class="editTitle">
                                <div class="label">전시명</div>
                                <div class="background">
                                    <input class="titleInput" type="text" placeholder="전시제목" v-model="this.modified_name" />
                                </div>
                            </div>
                            <div class="editInformation">
                                <div class="label">전시 설명</div>
                                <div class="background">
                                    <textarea class="introductionInput" :placeholder="this.exhibition.getInformation()"
                                        v-model="this.modified_information"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="exhibitionInformation" v-else>
                            <TitleHeader ref="informationTitle" 
                                :document_element_id="'viewPort'"
                                :title="this.exhibition.getName() ? this.exhibition.getName() : '제목없음'"
                                :startHeight="(this.vw * 30)" 
                                :heightUnit="this.vw / 2">
                            </TitleHeader>
                            <pre class="exhibitionIntroduction">
                                {{ this.exhibition.getInformation() ? this.exhibition.getInformation() : '' }}
                            </pre>
                        </div>
                        <div class="exhibitionArtworks">
                            <div class="label" v-if="this.is_edit && this.user.getID() === this.exhibition.getOwner().getID()">작품목록</div>
                            <TitleHeader v-else ref="artworksTitle" :title="'Artworks'" :startHeight="(this.vw * 30)"
                                :heightUnit="this.vw / 2" :document_element_id="'viewPort'">
                            </TitleHeader>
                            <ModifiableArtworkTrackList
                                ref="modifiableArtworkTrackList"
                                :source="this.source" :artwork_track_list="this.original_artwork_track_list"
                                :category_list="this.modified_category_list" :is_edit="this.is_edit"
                                @start-process = this.startProcess
                                @set-modified-category-list="this.setModifiedCategoryList"
                                @set-modified-artwork-track-list="(modified_artwork_track_list) => {
                                    this.modified_artwork_track_list = modified_artwork_track_list.map(v => v.slice())
                                }"
                            ></ModifiableArtworkTrackList>
                        </div>
                        <div class="editexhibitionMoreInformation" v-if="this.is_edit && this.user.getID() === this.exhibition.getOwner().getID()">
                            <!-- video는 얕은 복사되므로 emit을 통해 받아오지 않아도 됨. -->
                            <LinkUpload
                                :prop_link_list="this.link_list"
                                :prop_video="this.modified_video"
                                @set-exhibition-entity="(entity, value) => { if (entity ==='link_list') { this.link_object = value } }"
                            ></LinkUpload>
                        </div>
                        <div class="exhibitionMoreInformation" v-else>
                            <TitleHeader ref="moreInformationTitle" 
                                :title="'전시 더보기'"
                                :startHeight="(this.vw * 30)"
                                :heightUnit="this.vw / 2"
                                :document_element_id="'viewPort'">
                            </TitleHeader>
                            <div class="video" v-if="this.video_info.title !== null">
                                <div class="videoTitle">{{ this.video_info.title }}</div>
                                <video id="video" :src="this.video_info.src" controls></video>
                            </div>
                            <div class="linkList" v-if="this.link_list.length > 0">
                                <a v-for="(link, i) in this.link_list" :href="link.link" target="blank">
                                    {{link.title}}
                                </a>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
            <SideBar ref="sideBar"></SideBar>
            <div style="display:none;width:0;height:0;position:fixed;bottom:0;left:0;z-index:0;">{{this.posterImageElement}}</div>
            <Background :background_display="this.background_display" @click="()=>{ this.$refs.invitationDrawer.closeDrawer() }"></Background>
            <Drawer ref="invitationDrawer" @is-drawer-open="(drawer_opened) => { this.background_display = !drawer_opened }">
                <template v-slot:default>
                    <div class="drawerBody">
                        <div class="collaboratorContainer">
                            <div class="title">
                                참여 멤버
                            </div>
                            <div class="collaboratorList">
                                <div class="collaborator" v-for="(artist, i) in collaborator_list">
                                    <RoundProfile :profile="artist.thumbnail"></RoundProfile>
                                    <div class="artistName">{{ artist.name }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="invitation">
                            <div class="title">링크 공유로 초대</div>
                            <div class="invitationButton" @click="this.share($event)">링크 복사</div>
                        </div>
                    </div>
                </template>
            </Drawer>
            <ExhibitionEditButton v-show="this.bodyShowFlag" :is_edit="this.is_edit" @switch-mode="this.switchEditMode()" @delete-exhibition="() => { this.delete_popup_falg = true }">
            </ExhibitionEditButton>
            <div class="deletePopUp" v-if="this.delete_popup_falg">
                <div class="guidance">이 전시를<br />삭제하시겠습니까?</div>
                <div class="buttonContainer">
                    <div class="deleteButton" @click="this.deleteExhibition()">삭제</div>
                    <div class="cancelButton" @click="() => { this.delete_popup_falg = false }">취소</div>
                </div>
            </div>
        </div>
        <div class="artworkRegisterPage" v-show="this.is_edit && this.artwork_register_process && !this.category_register_process">
            <div class="artworkRegisterOption" v-if="!this.new_artwork_register && !this.existing_artwork_register">
                <div class="newArtworkRegisterButton" @click="() => { this.new_artwork_register = true; this.existing_artwork_register = false }">
                    <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.3447 2V48.6869" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2 25.3435H48.69" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>새로 만들기</p>
                </div>
                <div class="exisitingArtworkRegisterButton" @click="() => { this.new_artwork_register = false; this.existing_artwork_register = true }">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M37.5 35L50 22.5L37.5 10" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 50V32.5C10 29.8478 11.0536 27.3043 12.9289 25.4289C14.8043 23.5536 17.3478 22.5 20 22.5H50"
                            stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>이전 아트워크 불러오기</p>
                </div>
            </div>
            <ArtworkRegisterPage
                v-else-if="this.new_artwork_register && !this.existing_artwork_register"
                :from_exhibition_modify_page="true"
                @artwork-add="async (artwork) => {
                    await this.$refs.modifiableArtworkTrackList.addArtwork(artwork)
                }"
                @close-artwork-register="() => {
                    this.artwork_register_process = false
                    this.new_artwork_register = false
                    this.existing_artwork_register = false
                }"
            ></ArtworkRegisterPage>
            <ExistingArtworkRegister v-else
                :exhibition="this.exhibition"
                :exhibited_artwork_track_list="this.modified_artwork_track_list"
                @close-artwork-register="() => {
                    this.artwork_register_process = false
                    this.new_artwork_register = false
                    this.existing_artwork_register = false
                }"
                @add-artworks="async (artwork_list) => {
                    const _this = this;
                    artwork_list.forEach(async (artwork) => {
                        await this.$refs.modifiableArtworkTrackList.addArtwork(artwork)
                    })
                }"
            ></ExistingArtworkRegister>
        </div>
        <div class="categoryRegisterPage" v-show="this.is_edit && !this.artwork_register_process && this.category_register_process">
            <CategoryRegister
                ref="categoryRegister"
                :category_list = this.modified_category_list
                @close-category-register="() => { this.category_register_process = false }"
                @set-category-list="(category_list) => this.$refs.modifiableArtworkTrackList.setCategoryList(category_list)"
            ></CategoryRegister>
        </div>
    </div>
</template>
<script>
    import MainHeader from '@/components/ExhibitionModifyPage/MainHeader.vue';
    import TitleHeader from '@/components/ExhibitionModifyPage/TitleHeader.vue';
    import SideBar from '@/widgets/SideBar.vue';
    import RoundProfile from '@/widgets/RoundProfile.vue';
    import ExhibitionEditButton from '@/components/ExhibitionModifyPage/ExhibitionEditButton.vue';
    import { Exhibition } from '@/classes/exhibition';
    import { 
        isAuth, 
        getAuth 
    } from '@/modules/auth';
    import { User } from '@/classes/user';
    import Drawer from '@/widgets/Drawer.vue';
    import ModifiableArtworkTrackList from '@/components/ExhibitionModifyPage/ModifiableArtworkTrackList.vue';
    import ArtworkRegisterPage from './ArtworkRegisterPage.vue';
    import CategoryRegister from '@/components/ExhibitionModifyPage/CategoryRegister.vue';
    import Background from '@/widgets/Background.vue';
    import { resizeImage } from '@/modules/image';
    import {
        putExhibitionImages,
        putExhibitionThumbnailImage,
        putExhibitionVideo,
        deleteExhibitionDirectory
    } from '@/modules/storage';
    import LinkUpload from '@/components/ExhibitionRegisterPage/LinkUpload.vue';
    import ExistingArtworkRegister from '@/components/ExhibitionModifyPage/ExistingArtworkRegister.vue';

    export default {
        name: 'ExhibitionModifyPage',
        components: {
            MainHeader,
            TitleHeader,
            SideBar,
            RoundProfile,
            ExhibitionEditButton,
            Drawer,
            ModifiableArtworkTrackList,
            ArtworkRegisterPage,
            CategoryRegister,
            Background,
            LinkUpload,
            ExistingArtworkRegister
        },
        data() {
            return {
                source: (this.$route.query.utm_source) 
                    ? this.$route.query.utm_source 
                    : '',
                id: this.$route.query.id,
                exhibition: null,
                original_artwork_track_list: [],
                modified_artwork_track_list: [],
                original_category_list : [],
                modified_category_list: [],

                original_poster_image: null,
                modified_poster_image: null,
                bodyShowFlag: false,
                vw: null,

                main_header_element: null,
                poster_element: null,
                poster_image_element: null,
                information_element: null,
                artworks_element: null,

                video_info: {
                    src: null,
                    title: null
                },
                link_list: [],
                
                header_scale: 1,
                user_thumbnail: '',

                interval_return: null,

                // ModifyPage
                is_edit: false,
                collaborator_id_list: null,
                collaborator_list: null,
                artwork_register_process: false,
                new_artwork_register: false,
                existing_artwork_register: false,
                category_register_process: false,
                background_display: true,
                new_poster_files: null,
                modified_name: null,
                modified_information: null,
                modified_video: {
                    title: null,
                    file: null,
                    src: null
                },
                link_object: null,
                delete_popup_falg: false
            };
        },
        computed: {
            posterImageElement () {
                /*
                * - posterImage의 사진이 로드되고 나면, MainPage의 각 DOMElement들을 얻어오고 fade-in 효과를 추가한다.
                */
                if (this.poster_image_element) {
                    this.poster_image_element.onload = () => {
                        clearInterval(this.interval_return)

                        this.poster_element = document.getElementsByClassName('poster')[0]
                        this.information_element = document.getElementsByClassName('exhibitionInformation')[0]
                        this.artworks_element = document.getElementsByClassName('exhibitionArtworks')[0]
                        this.more_information_element = document.getElementsByClassName('exhibitionMoreInformation')[0]
                        
                        this.$refs.informationTitle.setInitialPosition()
                        this.$refs.artworksTitle.setInitialPosition()
                        this.$refs.moreInformationTitle.setInitialPosition()

                        let elementList = [this.poster_element, this.information_element, this.artworks_element, this.more_information_element]
                        elementList.forEach(function(element) {
                            let children = Array.from(element.children)
                            children.forEach(function(child) {
                                child.classList.add('before-enter')
                            })
                        })
                        this.fadeInEffect(true)

                        const _this = this
                        document.getElementById('viewPort').addEventListener('scroll', function () { _this.fadeInEffect(false) })
                    }
                }
                return this.poster_image_element
            }
        },
        async created() {
            // 유저 썸네일을 빠르게 로드하기 위해 Update history 코드와 분리
            // Check login and load user thumbnail
            if(isAuth()) {
                // Fetch profile thumbnail and set
                this.user = getAuth()
                this.user_thumbnail = this.user.getThumbnail()
            }
            else {
                this.$router.replace('/login')
                return
            }
            
            this.vw = parseFloat(document.documentElement.style.getPropertyValue('--vw').replace("px", ""))

            // Load exhibition
            let exhibition = await new Exhibition(this.id).init()
            await exhibition.initializePage()

            this.collaborator_id_list = await exhibition.getCollaboratorList()
            this.collaborator_id_list.splice(0, 0, exhibition.getOwner().getID())
            
            if (!this.collaborator_id_list.includes(this.user.getID())) {
                alert('접근 권한이 없습니다!')
                this.$router.replace('/')
                return
            }
            
            this.collaborator_list = new Array()
            this.collaborator_id_list.forEach(async (value, index) => {
                let artist = await new User(value).init()
                let element = new Object()
                if (artist.getID() === this.user.getID())
                    element.thumbnail = artist.getThumbnail()
                else {
                    element.thumbnail = ''
                }
                element.name = artist.getNickname()
                this.collaborator_list.push(element)
            })

            this.exhibition = exhibition
            let images = await this.exhibition.getImages()
            this.original_poster_image = images[0]
            this.modified_poster_image = images[0]
            this.poster_image_element = document.getElementById('posterImage')
            if (this.exhibition.isVideo() !== null) {
                this.video_info.title = this.exhibition.isVideo()
                this.video_info.file = null
                this.video_info.src = await this.exhibition.getVideo()
                this.modified_video = this.cloneObject(this.video_info)
            }

            this.setLinkList()
            this.setCategoryAndTrackList()

            if (isAuth()) {
                // Update history
                if (this.source === 'qrcode') {
                    const is_history = await this.user.isExhibitionHistory(this.exhibition)
                    if (!is_history) {
                        await this.user.putExhibitionHistory(this.exhibition)
                    }
                    else {
                        await this.user.updateExhibitionHistory(this.exhibition)
                    }
                }
            }
        },
        mounted() {
            const _this = this

            // setTimeout(function() {
            //     _this.scrollBottom()
            //     window.addEventListener('scroll', _this.scrollBottom)
            // }, 0)
            document.getElementById('viewPort').addEventListener('scroll', this.setHeaderScale)

            this.main_header_element = document.getElementsByClassName('mainHeader')[0]

            let dot_1 = document.getElementsByClassName('phrase')[0].children[0]
            let dot_2 = document.getElementsByClassName('phrase')[0].children[1]
            let dot_3 = document.getElementsByClassName('phrase')[0].children[2]

            dot_1.style.setProperty('opacity', '0')
            dot_2.style.setProperty('opacity', '0')
            dot_3.style.setProperty('opacity', '0')

            setTimeout(() => {
                dot_1.style.setProperty('opacity', '1')
            }, 1000)
            setTimeout(() => {
                dot_2.style.setProperty('opacity', '1')
            }, 2000)
            setTimeout(() => {
                dot_3.style.setProperty('opacity', '1')
            }, 3000)

            this.interval_return = setInterval(() => {
                dot_1.style.setProperty('opacity', '0')
                dot_2.style.setProperty('opacity', '0')
                dot_3.style.setProperty('opacity', '0')

                setTimeout(() => {
                    dot_1.style.setProperty('opacity', '1')
                }, 1000)
                setTimeout(() => {
                    dot_2.style.setProperty('opacity', '1')
                }, 2000)
                setTimeout(() => {
                    dot_3.style.setProperty('opacity', '1')
                }, 3000)
            }, 4000)
        },
        unmounted() {
            //window.removeEventListener('scroll', this.scrollBottom)
        },
        methods: {
            /**
             * Object를 깊은 복사하여 반환하는 함수
             * @param {Object} obj 
             */
            cloneObject(obj) {
                var clone = {};
                for (var key in obj) {
                    if (typeof obj[key] == "object" && obj[key] != null) {
                        clone[key] = cloneObject(obj[key]);
                    } else {
                        clone[key] = obj[key];
                    }
                }

                return clone;
            },
            setLinkList () {
                let link_list = this.exhibition.getLinkList()
                if (link_list) {
                    Object.keys(link_list).forEach(key => {
                        let link = new Object()
                        link.title = key
                        link.link = link_list[key]
                        this.link_list.push(link)
                    })
                }
            },
            setCategoryAndTrackList () {
                let artwork_list = this.exhibition.getArtworkList()
                let category_list = this.exhibition.getCategoryList()
                
                // 아무 카테고리에도 속하지 않은 아트워크들이 있는 경우
                if (category_list[0] === null) {
                    category_list[0] = ''
                }

                this.original_artwork_track_list = new Array(0)
                this.original_category_list = new Array(0)
                this.modified_category_list = new Array(0)
                let category_index = 0

                category_list.forEach((value, index) => {
                    if (value !== null) {
                        this.original_artwork_track_list.push(new Array())
                        this.modified_artwork_track_list.push(new Array())
                        category_index = this.original_artwork_track_list.length - 1
                    }

                    if (category_index >= 0) {
                        this.original_artwork_track_list[category_index].push(artwork_list[index])
                        this.modified_artwork_track_list[category_index].push(artwork_list[index])
                    }
                })

                this.original_category_list = category_list.filter((data) => {
                    return data !== null
                })
                
                if (this.original_category_list.length === 0) {
                    this.original_category_list = ['']
                    this.original_artwork_track_list = [[]]
                    this.modified_artwork_track_list = [[]]
                }
                else if (this.original_category_list[0] !== '') {
                    this.original_category_list.splice(0, 0, '')
                    this.original_artwork_track_list.splice(0, 0, [])
                    this.modified_artwork_track_list.splice(0, 0, [])
                }

                this.modified_category_list = this.original_category_list.slice()
            },
            // scrollBottom () {
            //     window.scrollTo(0, document.getElementById('exhibitionModifyPage').clientHeight)
            // },
            // SideBar component의 openSideBar함수를 실행시켜 sideBar가 열리도록 하는 함수
            openSideBar (event) {
                this.$refs.sideBar.openSideBar(event)
            },
            /**
            * - MainPage 스크롤 시 header의 scale값을 계산하는 함수.
            * 1. 스크롤 거리 10vw를 기준으로 header의 Y scale 값을 변경한다.
            * 2. 스크롤 거리 10vw를 기준으로 header의 child elements들의 X scale값을 변경한다.
            */
            setHeaderScale () {
                if (this.main_header_element === null || this.information_element === null || this.poster_element === null || this.artworks_element === null) {
                    console.log('Failed to get dom elements.')
                    return
                }
                
                let header_scale = (document.getElementById('viewPort').scrollTop / this.vw > 10) ? (0.7) : (1 - (document.getElementById('viewPort').scrollTop / (this.vw * 10)) * 0.3)
                if (document.getElementById('viewPort').scrollTop <= 0) {
                    header_scale = 1
                }
                this.main_header_element.style.setProperty('transform', `translate(-50%, 0) scaleY(${header_scale})`)

                for (let i = 0; i < this.main_header_element.children.length; i++) {
                    this.main_header_element.children[i].style.setProperty('transform', `scaleX(${header_scale})`)
                }
            },
            fadeInEffect (first_call) {
                if (this.is_edit) {
                    return
                }
                let elementList = [
                    this.poster_element,
                    this.information_element,
                    this.artworks_element,
                    this.more_information_element
                ]

                const _this = this
                elementList.forEach(function(element) {
                    let children = Array.from(element.children)

                    const __this = _this
                    children.forEach(function(child) {
                        var rect = child.getBoundingClientRect()
                        var in_viewport =  !(rect.right < 0 || rect.left > window.innerWidth || rect.top > (window.innerHeight - 30 * __this.vw))
                        // if (__this.checkMobile() === 'ios') {
                        //     in_viewport =  !(rect.right < 0 || rect.left > window.innerWidth || (window.innerHeight - (rect.height - rect.bottom)) >  (window.innerHeight - 30 * __this.vw))
                        // }
                        
                        if (first_call) {
                            if (in_viewport) {
                                child.classList.add('enter')
                                child.classList.remove('before-enter')
                            }
                            if (child.id == 'posterImage') {
                                child.classList.add('enter')
                                child.classList.remove('before-enter')
                            }
                        }
                        else {
                            if (in_viewport) {
                                child.classList.add('enter')
                                child.classList.remove('after-enter')
                                child.classList.remove('before-enter')
                            }
                            else {
                                child.classList.remove('enter')
                                child.classList.add('after-enter')
                            }
                        }
                        
                    })
                })

            },
            checkMobile () {
                var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
                
                if ( varUA.indexOf('android') > -1) {
                    //안드로이드
                    return "android";
                } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
                    //IOS
                    return "ios";
                } else {
                    //아이폰, 안드로이드 외
                    return "other";
                }
            },
            /**
             * 수정 모드/보기 모드를 전환해 주는 함수, Edit/Done button이 클릭되면 호출된다.
             * 1. is_edit === true 인 경우(Done button을 누른 경우)
             *  1.1 this.updateExhibition() 함수를 호출하여 변경사항을 저장한다.
             *  1.2. 전시의 소유자가 '나' 일 경우 posterImageSelection input에 대해 eventListener를 제거한다.
             * 
             * 2. is_edit === false 인 경우 (Edit button을 누른 경우)
             *  2.1 편집모드에서는 fade in effect가 동작하지 않는다.
             *  2.2 이 때 편집모드/보기모드에서 공통으로 존재하는 element는 poster와 modifiableArtworkList.
             *  2.3 poster는 처음부터 예외처리, modifiableArtworkList는 그렇지 않으므로 edit mode로 전환할 때 모든 fade in effect와 관련된 class를 삭제한다. 그렇지 않으면 전환후 보이지 않을 수 있다.
             * 
             * 3. is_edit의 값을 바꿔 모드를 전환한다.
             * 4. 수정모드로 전환되었고 전시의 소유자가 '나' 일 경우 posterImageSelection input에 대해 eventListener를 등록한다.
             */
            async switchEditMode () {
                if (this.is_edit === true) {
                    await this.updateExhibition()
                    if (this.user.getID() === this.exhibition.getOwner().getID()) {
                        this.$refs.posterImageSelection.removeEventListener('change', this.setPosterImage)
                    }
                }
                else {
                    document.getElementsByClassName('modifiableArtworkTrackList')[0].classList.remove('before-enter')
                    document.getElementsByClassName('modifiableArtworkTrackList')[0].classList.remove('after-enter')
                    document.getElementsByClassName('modifiableArtworkTrackList')[0].classList.remove('enter')
                }

                this.is_edit = !this.is_edit

                if (this.is_edit === true && this.user.getID() === this.exhibition.getOwner().getID()) {
                    await this.$nextTick()
                    this.$refs.posterImageSelection.addEventListener('change', this.setPosterImage)
                }
            },
            async updateExhibition () {
                this.modified_artwork_track_list = this.$refs.modifiableArtworkTrackList.modified_artwork_track_list.map(v => v.slice())

                let delete_index_list = []

                this.modified_category_list.forEach((value, index) => {
                    if (this.modified_artwork_track_list[index].length === 0) {
                        delete_index_list.push(index)
                    }
                })
                
                let delete_count = 0
                delete_index_list.forEach((value, index) => {
                    this.modified_category_list.splice(value - delete_count, 1)
                    this.modified_artwork_track_list.splice(value - delete_count, 1)
                    delete_count++
                })
                
                let category_list = []
                let artwork_id_list = []
                let i = 0
                while (i < this.modified_category_list.length) {
                    let category = this.modified_category_list[i]
                    category = category.toString()

                    this.modified_artwork_track_list[i].forEach((value, index) => {
                        category_list.push(category)
                        artwork_id_list.push(value.getID().toString())
                    })
                    i++
                }
                
                await this.exhibition.putCategory(category_list, artwork_id_list)

                if (this.new_poster_files !== null) {
                    const poster_image = await resizeImage(this.$refs.posterImageSelection.files[0], {
                        x: 1200,
                        y: 1200
                    })
                    let poster_images = []
                    poster_images.push(poster_image)

                    const thumbnail = await resizeImage(this.$refs.posterImageSelection.files[0], {
                        x: 400,
                        y: 400
                    })
                    const image_result = await putExhibitionImages(this.exhibition.getPageID(), poster_images)

                    if (image_result) {
                        const thumbnail_result = await putExhibitionThumbnailImage(this.exhibition.getPageID(), thumbnail)

                        if (!thumbnail_result) {
                            console.log('썸네일 등록 실패')
                        }
                    }
                    else {
                        console.log('이미지 등록 실패')
                    }

                }

                if (this.modified_name !== this.exhibition.getName() && this.modified_name !== null) {
                    const name_result = await this.exhibition.putName (this.modified_name)
                    if (!name_result) {
                        alert('제목 수정 실패')
                    }
                }

                if(this.modified_information !== this.exhibition.getInformation() && this.modified_information !== null) {
                    const info_result = await this.exhibition.putInformation(this.modified_information)
                    if (!info_result) {
                        alert('설명 수정 실패')
                    }
                }

                if (this.link_object !== null && Object.keys(this.link_object).length !== 0) {
                    const link_result = await this.exhibition.postLink(this.link_object)
                    if (!link_result) {
                        alert('링크 수정 실패')
                    }
                }

                if (this.video_info.src !== this.modified_video.src) {
                    let video_result = await this.exhibition.putIsVideo(this.modified_video.title)

                    video_result = video_result && await putExhibitionVideo(this.exhibition, this.modified_video.title, this.exhibition.getPageID(), this.modified_video.file)

                    if (!video_result) {
                        alert('비디오 수정 실패')
                    }
                }
                
                await this.exhibition.initializePage()
                this.setCategoryAndTrackList()

                this.$refs.categoryRegister.reset()
                await this.$refs.modifiableArtworkTrackList.reset()
            },
            /**
             * 가져온 이미지 파일을 포스터 이미지로 설정하는 함수
             */
            setPosterImage () {
                this.new_poster_files = new Array()
                this.new_poster_files = this.$refs.posterImageSelection.files
                this.modified_poster_image = URL.createObjectURL(this.$refs.posterImageSelection.files[0])
            },
            share (event) {
                // 이벤트 전파 방지
                if (event.stopPropagation) event.stopPropagation();
                else event.cancelBubble = true; // IE 대응

                let shareUrl = 'https://se-ek.netlify.app/invitation' + '?id=' + this.$route.query.id

                let textarea = document.createElement("textarea")
                document.body.appendChild(textarea)
                textarea.value = shareUrl
                textarea.select()
                document.execCommand("copy");
                document.body.removeChild(textarea);
                if (process.env.NODE_ENV === 'production') {
                    this.$gtag.event('click', {
                        event_category: 'artwork',
                        event_label: 'share',
                        value: this.artwork.getID()
                    })
                }
                alert("페이지 주소를 클립보드에 복사했습니다.")
            },
            startProcess(artwork_register_process, category_register_process) {
                this.artwork_register_process = artwork_register_process
                this.category_register_process = category_register_process
            },
            setModifiedCategoryList (new_category_list) {
                this.modified_category_list = new_category_list
                this.$refs.categoryRegister.reset()
            },
            async reset () {
                this.modified_category_list = this.original_category_list.slice()
                this.modified_poster_image = this.original_poster_image
                this.modified_name = this.exhibition.getName()
                this.modified_information = this.exhibition.getInformation()
                this.modified_video = this.cloneObject(this.video_info)
                this.setLinkList()

                await this.$refs.modifiableArtworkTrackList.reset()
                this.is_edit = false
            },
            async deleteExhibition () {
                if (!this.exhibition) {
                    return
                }
                
                await deleteExhibitionDirectory(this.exhibition.getPageID())

                // For production
                if (process.env.NODE_ENV === 'production') {
                    await this.exhibition.deleteExhibition()
                }
                // For development
                else {
                    await this.exhibition.deletePreExhibition()
                }

                this.$router.replace('/')
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/ExhibitionModifyPage/exhibitionModifyPage.scss"></style>