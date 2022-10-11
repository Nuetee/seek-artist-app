// Import FFmpeg wasm library
// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"

// Change given file's data URI to Binary large object
// - dataURI : URI of given image data
function dataURItoBlob (dataURI) {
    const bytes = dataURI.split(',')[0].indexOf('base64') >= 0
        ? window.atob(dataURI.split(',')[1])
        : decodeURI(dataURI.split(',')[1])
    const mime = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const max = bytes.length
    const ia = new Uint8Array(max)
    for (let i = 0; i < max; i += 1) {
        ia[i] = bytes.charCodeAt(i)
    }
    return new Blob([ia], { type: mime })
}

// Get css string for cropped image
// - image_source : source of image (after url has been mapped)
// return css style for cropped image, empty string if error occurred
 // ratio = width/height
export async function cropImage (image_source, container_ratio, fill_container = true) {
    const crop_process = (src, ratio, fill) => {
        return new Promise(function (resolve) {
            const image = new Image()
            image.src = src
            
            image.onload = function () {
                if (fill) {
                    if (image.width > ratio * image.height) {
                        resolve("height:100%;width:auto")
                    }
                    else {
                        resolve("width:100%;height:auto")
                    }
                }
                else {
                    if (image.width > ratio * image.height) {
                        resolve("width:100%;height:auto")
                    }
                    else {
                        resolve("height:100%;width:auto")
                    }
                }
                
            }

            // NO ERROR HANDLING!!
            // image.onerror = resolve("s")
        })
    }
    return crop_process(image_source, container_ratio, fill_container)
}

// Get new file form of resized image
// - file : file source of image (after url has been mapped)
// return css style for cropped image, empty string if error occurred
 // ratio = width/height
export async function resizeImage (file, max_size) {
    const reader = new FileReader();
    const image = new Image();
    const canvas = document.createElement('canvas');

    const resize = function () {
        let { width, height } = image
        if (width < height) {
            if (width > max_size.x) {
                height *= max_size.x / width;
                width = max_size.x;
            } 
        } 
        else if (height > max_size.y) {
            width *= max_size.y / height;
            height = max_size.y;
        }

        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        return dataURItoBlob(dataUrl)
    }

    return new Promise(function (resolve) {
        reader.onload = function (readerEvent) {
            image.onload = () => resolve(resize())
            image.src = readerEvent.target.result
        }
        reader.readAsDataURL(file)
    })
    
}

// Get new file form of m3u8 and ts files
// - file : file source of video (mp4, less than 7 min and 150MB)
// export async function transcode (file) {
//     const ffmpeg = (process.env.NODE_ENV === 'production')
//         ? createFFmpeg()
//         : createFFmpeg({
//             log: true,
//             progress: ({ ratio }) => {
//                 console.log(`Complete: ${(ratio * 100.0).toFixed(2)}%`)
//             }
//         })

//     await ffmpeg.load()
//     ffmpeg.FS("writeFile", "0.mp4", await fetchFile(file))

//     await ffmpeg.run("-i", "0.mp4", 
//         "-profile:v", "baseline",
//         "-strict", "-2",
//         "-level", "3.0",
//         "-start-number", "0",
//         "-hls_time", "200",
//         "-hls_list_size", "0",
//         "-f", "fls",
//         "0.m3u8"
//     )

//     const data = ffmpeg.FS("readFile", "0.m3u8")
//     const result = URL.createObjectURL(
//         new Blob([data.buffer], {
//             type: "application/x-mpegURL"
//         })
//     )

//     const ts_files = []
//     let i = 0
//     while (true) {
//         try {
//             const ts_data = ffmpeg.FS("readFile", `0${i}.ts`)
//             const ts_result = URL.createObjectURL(
//                 new Blob([ts_data.buffer], {
//                     type: "application/x-mpegURL"
//                 })
//             )
//             ts_files.push(ts_result)
//         }
//         catch (e) {
//             console.log(`Created ${i} ts files for HLS`)
//             break
//         }
//         i++
//     }

//     if (i > 0) {
//         return {
//             m3u8: result,
//             ts: ts_files
//         }
//     }
//     return null
// }