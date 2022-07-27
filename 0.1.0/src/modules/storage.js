// Deploying axios module, Setting base url for production mode
import axios from 'axios'
import { sendRequest } from './api'
if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL
}
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

// Constants for AWS S3 upload
const BUCKET_NAME = 'seek-customer-storage'

// Amazon Cognito 인증 공급자를 초기화합니다
AWS.config.region = 'ap-northeast-2' 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-2:340b6f96-55ca-4cb5-a355-75cf434f0655',
})

// Amazon S3 설정을 초기화합니다
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {
        Bucket: BUCKET_NAME
    }
})

// Send request for source's signed url
// - type : 'image', 'video', 'file'
// - target : 'user', 'artist', 'artwork', 'advertisement'
// - sub-target : 'profile', 'background', 'represent', 'all' or empty string
// return the signed url (or an array of urls), or empty string (or []) if the respond is not given successfully
async function sendStorageRequest(type, target, sub_target, target_id) {
    const url = '/storage/' + type + '/' + target + '/' + sub_target
    const body = {
        target_id: target_id,
    }
    const { status, data } = await sendRequest('get', url, body)
    return new Promise(function (resolve) {
        if (status < 500) {
            resolve(data)
        }
        else {
            (sub_target === 'all') ? resolve([]) : resolve("");
        }
    })
}

// Send request for uploading files
// - target : 'user', 'artist', 'artwork', 'advertisement'
// - file_names : an array of file names
// - file_lists : an array of file bodies
// return true, or false if the upload failed
async function sendStorageUpload(target, target_id, file_names, file_lists) {
    if (file_names.length !== file_lists.length) {
        return false
    }
    const file_urls = file_names.map(file_name => target + '/' + target_id + '/' + file_name)
    return new Promise(function (resolve) {
        for (let i = 0 ; i < file_names.length ; i++) {
            s3.upload({
                Key: file_urls[i],
                Body: file_lists[i],
                ACL: 'public-read'
            }, function (err, data) {
                if (err) {
                    console.log(err)
                    resolve(false)
                } 
                else {
                    if (i === file_names.length - 1) {
                        resolve(true)
                    }
                }
            })
        }
    })
}

// Send request for deleting file
// - target : 'user', 'artist', 'artwork', 'advertisement'
// - file_names : an array of file names
// - file_lists : an array of file bodies
// return true, or false if the upload failed
async function sendStorageDelete(target, target_id, file_names) {
    const file_urls = file_names.map(file_name => target + '/' + target_id + '/' + file_name)
    return new Promise(function (resolve) {
        for (let i = 0 ; i < file_names.length ; i++) {
            s3.deleteObject({
                Key: file_urls[i],
            }, function (err, data) {
                if (err) {
                    console.log(err)
                    resolve(false)
                } 
                else {
                    if (i === file_names.length - 1) {
                        resolve(true)
                    }
                }
            })
        }
    })
}

// Send request for creating new directory
// - target : 'user', 'artist', 'artwork', 'advertisement'
// return true, or false if the creation failed
async function sendStoragePutDirectory(target, target_id) {
    const url = target + '/' + target_id + '/'
    return new Promise(function (resolve) {
        s3.headObject({
            Key: url
        }, function (err, data) {
            if (!err || err.code !== 'NotFound') {
                console.log(err)
                resolve(false)
            }
            else {
                s3.putObject({
                    Key: url
                }, function (err, data) {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    else {
                        resolve(true)
                    }
                })
            }
        })
    })
}

// Send request for deleting directory
// - target : 'user', 'artist', 'artwork', 'advertisement'
// return true, or false if the deletion failed
async function sendStorageDeleteDirectory(target, target_id) {
    const url = target + '/' + target_id + '/'
    return new Promise(function (resolve) {
        s3.listObjects({
            Prefix: url
        }, function (err, data) {
            if (err) {
                console.log(err)
                resolve(false)
            }
            else {
                const objects = data.Contents.map(function (object) {
                    return { Key: object.Key }
                })
                s3.deleteObjects({
                    Delete: {
                        Objects: objects,
                        Quiet: true
                    }
                }, function (err, data) {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    else {
                        resolve(true)
                    }
                })
            }
        })
    })
}

// Get signed urls for artwork's images
// - target_id : artwork's id
// return an array of signed urls, or [] if the respond is not given successfully
export async function getArtworkImages (target_id) {
    return await sendStorageRequest('image', 'artwork', 'all', target_id)
}

// Get signed urls for artwork's images
// - target_id : artwork's id
// return an array of signed urls, or [] if the respond is not given successfully
export async function getArtworkThumbnailImage (target_id) {
    return await sendStorageRequest('image', 'artwork', 'thumbnail', target_id)
}

// Get signed url for artwork's represenative image
// - target_id : artwork's id
// return signed url of the image, or empty string if the respond is not given successfully
export async function getArtworkRepresentImage (target_id) {
    return await sendStorageRequest('image', 'artwork', 'represent', target_id)
}

// Upload artwork's all images
// - target_id : artwork's id
// return the result of upload
export async function putArtworkImages (target_id, files) {
    if (!files) {
        return false
    }
    const name_array = Array.from(
            Array(files.length).keys()
        ).map(x => String(x) + '.jpg')
    return await sendStorageUpload('artwork', target_id, name_array, files)
}

// Upload artwork's thumbnail (representative) image
// - target_id : artwork's id
// return the result of upload
export async function putArtworkThumbnailImage (target_id, file) {
    if (!file) {
        return false
    }
    return await sendStorageUpload('artwork', target_id, ['thumbnail/thumbnail.jpg'], [file])
}

// Delete artwork's thumbnail (representative) image
// - target_id : artwork's id
// return the result of upload
export async function deleteArtworkThumbnailImage (target_id) {
    return await sendStorageDelete('artwork', target_id, ['thumbnail/thumbnail.jpg'])
}

// Create artwork's directory
// - target_id : artwork's id
// return the result of upload
export async function putArtworkDirectory (target_id) {
    return await sendStoragePutDirectory('artwork', target_id)
}

// Delete artwork's directory
// - target_id : artwork's id
// return the result of upload
export async function deleteArtworkDirectory (target_id) {
    return await sendStorageDeleteDirectory('artwork', target_id)
}