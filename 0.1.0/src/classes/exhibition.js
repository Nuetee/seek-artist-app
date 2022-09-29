// Deploying axios module, Setting base url for production mode
import axios from 'axios'
import { sendRequest } from '../modules/api'
import { 
    getExhibitionImages, 
    getExhibitionThumbnailImage,
    getExhibitionRepresentVideo
} from '@/modules/storage'

import { User } from './user'
import { Artwork } from './artwork'

if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL
}
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

// Exhibition : class for exhibition
// Specification is available on official documentation
// Usage - const artwork = await new Exhibition(<id>).init()
export class Exhibition {
    id
    page_id
    name
    nickname
    information
    is_video

    owner
    link
    category
    artwork_list = []
    category_list = []

    constructor (page_id) {
        this.page_id = page_id
    }

    init = async function () {
        const { status, data } = await sendRequest('get', '/exhibition', {
            target_id : this.page_id
        })
        if (status < 400) {
            const exhibition_data = data[0][0]
            this.id = exhibition_data.id
            this.name = exhibition_data.name
            this.nickname = exhibition_data.nickname
            
            return this
        }
        else {
            return null
        }
    }

    initializePage = async function () {
        const { status, data } = await sendRequest('get', '/exhibition/page', {
            target_id : this.page_id
        })
        if (status < 400) {
            const page_data = data[0][0]
            this.information = page_data.information
            this.category = page_data.category
            this.link = page_data.link
            
            this.is_video = page_data.is_video
            this.owner = await new User(page_data.owner_id).init()
            
            this.artwork_list = new Array(0)
            this.category_list = new Array(0)

            const { status: category_status, data: category_data } = await sendRequest('get', '/exhibition/category', {
                target_id : this.page_id
            })
            const category_list = category_data[0]

            if (category_status < 400) {
                let current_category
                for (let i = 0 ; i < category_list.length; i++) {
                    const new_page_id = category_list[i].page_id
                    const new_category = category_list[i].category

                    const artwork = await new Artwork(new_page_id).init()
                    this.artwork_list.push(artwork)

                    if (i > 0 && new_category === current_category) {
                        this.category_list.push(null)
                    }
                    else {
                        this.category_list.push(new_category)
                        current_category = new_category
                    }
                }
            }
        }
    }

    getImages = async function () {
        return await getExhibitionImages(this.page_id)
    }

    getThumbnailImage = async function () {
        return await getExhibitionThumbnailImage(this.page_id)
    }

    getVideo = async function () {
        if (this.is_video !== null) {
            return await getExhibitionRepresentVideo(this.page_id)
        }
        else {
            return null
        }
    }

    getLinkList () {
        return this.link
    }

    getCollaboratorList = async function () {
        const { status, data } = await sendRequest('get', '/exhibition/collaborator', {
            target_id : this.page_id
        })
        if (status < 500) {
            return data[0].map(x => x.id)
        }
        else {
            return []
        }
    }

    getID () {
        return this.id
    }

    getPageID () {
        return this.page_id
    }

    getName () {
        return this.name
    }

    getInformation () {
        return this.information
    }

    getOwner () {
        return this.owner
    }

    getOwnerName () {
        return this.nickname
    }

    getCategoryJson () {
        return this.category
    }

    isVideo () {
        return this.is_video
    }

    getCategoryList () {
        return this.category_list
    }

    getArtworkList () {
        return this.artwork_list
    }

    postLink = async function (json_object) {
        const { status, data } = await sendRequest('post', '/exhibition/link', {
            target_id : this.id,
            data : json_object
        })
        if (status < 500) {
            return data
        }
        else {
            return false
        }
    }

    postCollaborator = async function (artist) {
        const { status, data } = await sendRequest('post', '/exhibition/collaborator', {
            target_id : this.id,
            data : artist.getID()
        })
        if (status < 500) {
            return data
        }
        else {
            return false
        }
    }

    deleteCollaborator = async function (artist) {
        const { status, data } = await sendRequest('delete', '/exhibition/collaborator', {
            target_id : this.page_id,
            page_id : artist.getPageID()
        })
        if (status < 500) {
            return data
        }
        else {
            return false
        }
    }

    putExhibitionData = async function (target, value) {
        const { status, data } = await sendRequest('put', '/exhibition/' + target, {
            target_id : this.id,
            data : value
        })
        if (status < 500) {
            this[target] = value
            return true
        }
        else {
            return false
        }
    }

    putName = async function (name) {
        const result = await this.putExhibitionData('name', name)
        return result
    }

    putInformation = async function (information) {
        const result = await this.putExhibitionData('information', information)
        return result
    }

    putIsVideo = async function (is_video) {
        const result = await this.putExhibitionData('is_video', is_video)
        return result
    }

    putCategory = async function (category) {
        const { status, data } = await sendRequest('put', '/exhibition/category', {
            target_id : this.id,
            data : category
        })
        if (status < 500) {
            return true
        }
        else {
            return false
        }
    }
    
    deletePreExhibition = async function () {
        const { status, data } = await sendRequest('delete', '/exhibition', {
            registered : false,
            target_id : this.page_id
        })
        if (status < 500) {
            return data
        }
        else {
            return false
        }
    }

    deleteExhibition = async function () {
        const { status, data } = await sendRequest('delete', '/exhibition', {
            registered : true,
            target_id : this.page_id
        })
        if (status < 500) {
            return data
        }
        else {
            return false
        }
    }

}