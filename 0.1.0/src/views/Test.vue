<template>
  <div>
    <input type="file" id="videoUpload" accept="video/mp4">
    <button @click="this.submit" type="submit"></button>
  </div>
</template>

<script>
import { transcode } from '@/modules/image';

export default {
    methods: {
        submit () {
            const video = document.getElementById('videoUpload')
            console.log(video)
        }
    }
}
</script>

<style>

</style>