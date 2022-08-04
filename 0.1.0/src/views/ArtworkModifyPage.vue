<template>
    <div id="artworkModifyPage" v-if="this.artwork !== null">
        <div class="top normal">
            <div class="profileContainer">
                <button class="logo" @click="this.setComponentHeight(false)">
                    <img src="@/assets/seek_logo.png" alt="">
                    <div class="poppins">for artist</div>
                </button>
                <RoundProfile v-if="this.userThumbnailLoadFlag" :profile="this.userThumbnail"
                    @click="this.openSideBar($event)" />
            </div>
            <ArtworkComponent ref="artworkComponent" @show-more="this.showMore"
                @setComponentHeight="this.setComponentHeight" @show-button-name="this.showButtonName"
                :artwork="this.artwork" :is-first-access="this.isFirstAccess">
            </ArtworkComponent>
            <div class="bottomArea normal">
                <div v-if="this.artwork" class="buttonContainer">
                    <CommentButton ref="commentButton" @comment-button-click="this.setComponentHeight"></CommentButton>
                    <EditButton :artwork="this.artwork"></EditButton>
                    <ShareButton ref="shareButton" :artwork="this.artwork"></ShareButton>
                </div>
            </div>
        </div>
        <CommentComponent ref="commentComponent" @commentUpdate="this.updateDone" :artwork="this.artwork">
        </CommentComponent>
        <SideBar :minimized="this.minimized" @closeSideBar="this.closeSideBar()"></SideBar>
        <div class="background" :style="this.setBackground()" @click="this.closeSideBar"></div>
        <div id="more">
            <div id="header">
                <button class="closeMore" @click="this.showMore(false)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M0.219924 1.28181C0.1502 1.21209 0.0948912 1.12931 0.0571565 1.03821C0.0194218 0.947114 7.34668e-10 0.849474 0 0.750868C-7.34668e-10 0.652263 0.0194218 0.554623 0.0571565 0.463523C0.0948912 0.372424 0.1502 0.289649 0.219924 0.219924C0.289649 0.1502 0.372424 0.0948912 0.463523 0.0571565C0.554623 0.0194218 0.652263 -7.34668e-10 0.750868 0C0.849474 7.34667e-10 0.947114 0.0194218 1.03821 0.0571565C1.12931 0.0948912 1.21209 0.1502 1.28181 0.219924L9 7.93961L16.7182 0.219924C16.7879 0.1502 16.8707 0.0948912 16.9618 0.0571565C17.0529 0.0194218 17.1505 0 17.2491 0C17.3477 0 17.4454 0.0194218 17.5365 0.0571565C17.6276 0.0948912 17.7104 0.1502 17.7801 0.219924C17.8498 0.289649 17.9051 0.372424 17.9428 0.463523C17.9806 0.554623 18 0.652263 18 0.750868C18 0.849474 17.9806 0.947114 17.9428 1.03821C17.9051 1.12931 17.8498 1.21209 17.7801 1.28181L10.0604 9L17.7801 16.7182C17.8498 16.7879 17.9051 16.8707 17.9428 16.9618C17.9806 17.0529 18 17.1505 18 17.2491C18 17.3477 17.9806 17.4454 17.9428 17.5365C17.9051 17.6276 17.8498 17.7104 17.7801 17.7801C17.7104 17.8498 17.6276 17.9051 17.5365 17.9428C17.4454 17.9806 17.3477 18 17.2491 18C17.1505 18 17.0529 17.9806 16.9618 17.9428C16.8707 17.9051 16.7879 17.8498 16.7182 17.7801L9 10.0604L1.28181 17.7801C1.21209 17.8498 1.12931 17.9051 1.03821 17.9428C0.947114 17.9806 0.849474 18 0.750868 18C0.652263 18 0.554623 17.9806 0.463523 17.9428C0.372424 17.9051 0.289649 17.8498 0.219924 17.7801C0.1502 17.7104 0.0948912 17.6276 0.0571565 17.5365C0.0194218 17.4454 0 17.3477 0 17.2491C0 17.1505 0.0194218 17.0529 0.0571565 16.9618C0.0948912 16.8707 0.1502 16.7879 0.219924 16.7182L7.93961 9L0.219924 1.28181Z"
                            fill="black" />
                    </svg>
                </button>
            </div>
            <div>
                {{ this.information }}
            </div>
        </div>
    </div>
</template>
<script>
    import RoundProfile from '@/widgets/RoundProfile.vue';
    import ArtworkComponent from '@/widgets/ArtworkComponent.vue';
    import ShareButton from '@/widgets/ShareButton.vue';
    import EditButton from '@/widgets/EditButton.vue';
    import CommentButton from '@/components/ArtworkModifyPage/CommentButton.vue';
    import CommentComponent from '@/components/ArtworkModifyPage/CommentComponent.vue';
    import { Artwork } from '@/classes/artwork';
    import { isAuth, getAuth } from '@/modules/auth';
    import SideBar from '@/widgets/SideBar.vue';

    export default {
        name: 'ArtworkModifyPage',
        components: {
            RoundProfile,
            ArtworkComponent,
            ShareButton,
            CommentButton,
            CommentComponent,
            SideBar,
            EditButton
        },
        data() {
            return {
                id: this.$route.query.id,
                source: (this.$route.query.utm_source) ? this.$route.query.utm_source : '',
                artwork: null,
                information: '',
                user: null,
                userThumbnail: '',
                userThumbnailLoadFlag: false,
                isFirstAccess: false,
                minimized: true,
                isComment: false,
                isFliped: false,
                updateInProgress: false,
                isShow: false
            };
        },
        beforeCreate() {},
        async created() {
            const _this = this
            window.onpopstate = function (event) {
                if(_this.minimized == false) {
                    _this.minimized = true
                    return
                }
                if(_this.isComment) {
                    _this.setComponentHeight(false)
                }
            }
            let artwork = await new Artwork(this.id).init()
            this.artwork = artwork

            if(isAuth()) {
                // Fetch profile thumbnail and set
                this.user = getAuth()
                this.userThumbnail = this.user.getThumbnail()
            }

            this.userThumbnailLoadFlag = true
        },
        updated() {
            const _this = this
            // Scroll Listener
            document.getElementById('artworkModifyPage').addEventListener('scroll', async function (event) {
                if (_this.updateInProgress) {
                    return false
                }

                let scroll_height = event.target.scrollHeight
                let scroll_top = parseInt(event.target.scrollTop) + 1
                let offset_height = parseInt(event.target.offsetHeight) + 1

                if (scroll_height <= scroll_top + offset_height) {
                    _this.updateInProgress = true
                    await _this.$refs.commentComponent.load()
                }
            })
        },
        methods: {
            showButtonName (showFlag) {
                this.isFliped = showFlag
                this.$refs.commentButton.showButtonName(showFlag)
                this.$refs.shareButton.showButtonName(showFlag)
            },
            archived () {
                if (!this.isComment)
                    this.$refs.artworkComponent.showPopUp(1500)
                else
                    this.$refs.artworkComponent.showPopUp(500)
            },
            updateDone () {
                this.updateInProgress = false
            },
            setComponentHeight (byScroll) {
                let componentArray = new Array();

                let top = document.getElementsByClassName('top')[0]
                let commentComponent = document.getElementsByClassName("commentComponent")[0]
                let bottomArea = document.getElementsByClassName("bottomArea")[0]
                let artworkMoreInfo = document.getElementsByClassName("artworkMoreInfo")[0]

                componentArray.push(top)
                componentArray.push(commentComponent)
                componentArray.push(artworkMoreInfo)
                
                let archiveButton = bottomArea.firstChild.childNodes[1].childNodes
                let removeClass, addClass
                if(this.isComment || byScroll) {
                    removeClass = 'comment'
                    addClass = 'normal'
                    this.showButtonName(this.isFliped)
                    for(let button of archiveButton) {
                        if (button.classList.contains('show')) {
                            button.classList.add('activate')
                        }
                    }
                }
                else {
                    removeClass = 'normal'
                    addClass = 'comment'
                    this.$refs.shareButton.showButtonName(false)
                    for(let button of archiveButton) {
                        button.classList.remove('activate')
                    }
                    window.history.pushState(null, '', location.href)
                }
                
                for(let component of componentArray) {
                    component.classList.remove(removeClass)
                    component.classList.add(addClass)
                }

                this.isComment = !this.isComment
            },
            openSideBar (event) {
                if (event.stopPropagation) event.stopPropagation();
                else event.cancelBubble = true; // IE 대응
                
                window.history.pushState(null, '', location.href)
                this.minimized = false
            },
            closeSideBar() {
                if (!this.minimized) {
                    console.log('close')
                    window.history.back()
                }
            },
            showMore (isShow) {
                this.isShow = isShow
                let more = document.getElementById('more')
                if (isShow)
                    more.classList.add('showMore')
                else
                    more.classList.remove('showMore')
            },
            setBackground() {
                if (this.minimized && !this.isShow) {
                    return 'display: none'
                }
                else return
            }
        }
    }
</script>
<style lang="scss" scoped src="../scss/ArtworkModifyPage/artworkModifyPage.scss"></style>