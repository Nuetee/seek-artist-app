// Deploying modules
import axios from 'axios'
import { sendRequest } from '../modules/api'
import {
    doLike,
    isLiked
} from '../modules/event'
import store from '../store'

if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL
}
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

// User : class for user
// Specification is available on official documentation
// Usage - const user = await new User(<id>).init()
export class User {
    id
    page_id
    nickname
    sns

    constructor (id) {
        this.id = id
    }

    init = async function () {
        const { status, data } = await sendRequest('post', '/artist', {
            target_id : this.id
        })
        if (status < 400) {
            const user_data = data[0][0]
            this.nickname = user_data.nickname
            this.page_id = user_data.page_id
            if (user_data.sns) {
                this.sns = user_data.sns
            }
            else {
                this.sns = ''
            }
            return this
        }
        else {
            return null
        }
    }

    getID () {
        return this.id
    }

    getPageID () {
        return this.page_id
    }

    getNickname () {
        return this.nickname
    }

    getSNS () {
        return this.sns
    }

    getThumbnail () {
        return store.getters.getThumbnail
    }

    getProfile () {
        return store.getters.getProfile
    }

    isCommentLiked = async function (comment) {
        return await isLiked(comment.getID(), this.id)
    } 

    getOwnArtworks = async function (offset, limit) {
        const { status, data } = await sendRequest('post', '/artist/artwork', {
            target_id : this.id,
            offset : offset,
            limit : limit
        }) 
        if (status < 500) {
            return data[0].map(x => x.page_id
        }
        else {
            return []
        }
    }

    putComment = async function (artwork, body) {
        const { status, data } = await sendRequest('post', '/comment', {
            user_id : this.id,
            artwork_id : artwork.getID(),
            body : body
        })
        if (status < 500) {
            return data.comment_id
        }
        else {
            return null
        }
    }

    putCommentLike = async function (comment) {
        const liked_check = await isLiked(comment.getID(), this.id)
        if (!liked_check) {
            const like_result = await doLike(comment.getID(), this.id)
            if (like_result) {
                comment.setLikeCount('inc')
                return true
            }
        } 
        return false
    }

    putCommentUnlike = async function (comment) {
        const liked_check = await isLiked(comment.getID(), this.id)
        if (liked_check) {
            const like_result = await doLike(comment.getID(), this.id, true)
            if (like_result) {
                comment.setLikeCount('dec')
                return true
            }
        } 
        return false
    }

    deleteComment = async function (comment) {
        const { status, data } = await sendRequest('put', '/comment', {
            user_id : this.id,
            comment_id : comment.getID()
        })
        if (status < 500) {
            return data
        }
        else {
            return false
        }
    }

}