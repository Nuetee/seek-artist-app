// Deploying axios module, Setting base url for production mode
import axios from 'axios'
import { sendRequest } from '../modules/api'
import { 
    getArtworkImages,
    getArtworkThumbnailImage,
    getArtworkRepresentImage
} from '../modules/storage'

if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL
}
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

// Artwork : class for artwork
// Specification is available on official documentation
// Usage - const artwork = await new Artwork(<id>).init()
export class Artwork {
    id
    name
    artist
    sns
    
    archive_count
    year
    dimension
    material
    information

    constructor (id) {
        this.id = id
    }

    init = async function () {
        const { status, data } = await sendRequest('get', '/artwork', {
            target_id : this.id
        })
        if (status < 400) {
            const artwork_data = data[0][0]
            this.name = artwork_data.name
            this.artist = artwork_data.artist
            this.sns = artwork_data.sns
            this.archive_count = artwork_data.archive_count
            this.year = artwork_data.year
            this.dimension = artwork_data.dimension
            this.material = artwork_data.material
            this.information = artwork_data.information
            this.color = artwork_data.color

            return this
        }
        else {
            return null
        }
    }

    getAllImages = async function () {
        return await getArtworkImages(this.id)
    }

    getThumbnailImage = async function () {
        return await getArtworkThumbnailImage(this.id)
    }

    getRepresentImage = async function () {
        return await getArtworkRepresentImage(this.id)
    }

    getID () {
        return this.id
    }

    getName () {
        return this.name
    }

    getArtist () {
        return this.artist
    }

    getSNS () {
        return this.sns
    }

    getArchiveCount () {
        return this.archive_count
    }

    getYear () {
        return this.year
    }

    getDimension () {
        return this.dimension
    }

    getMaterial () {
        return this.material
    }

    getInformation () {
        return this.information
    }

    getColor () {
        return this.color
    }

    getCommentList = async function (offset, limit) {
        const { status, data } = await sendRequest('get', '/artwork/comment', {
            target_id : this.id,
            offset : offset,
            limit : limit
        })
        if (status < 500) {
            return data[0].map(x => x.id)
        }
        else {
            return []
        }
    }

    // - type : 'inc', 'dec'
    setArchiveCount (type) {
        (type === 'dec')
            ? this.archive_count--
            : this.archive_count++
    } 

}