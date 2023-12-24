

<template>
  <div class="bg-gray-400 w-full text-white">
    <div class="flex justify-between">
      <div v-if="!soundstore.soundURL">
        <input type="file" class="hidden" ref="soundUpload" @change="handleUpload" accept="audio/*">
        <label for="sound" @click="handleOpenFileUpload()">Upload</label>
      </div>
      <div>
       
      </div>
      
    </div>
    <div class="w-full">
      <WaveSurferCanvas/>
    </div>
    <div>

    </div>
  </div>
  
</template>

<script lang="ts" setup>

  const soundstore = useSoundStore()
 
  const soundUpload = ref<HTMLInputElement|null>(null)
  const handleOpenFileUpload = ()=> {
    if(soundUpload.value){
      soundUpload.value.click()
    }
  }

  const handleUpload = ()=> {
    if(soundUpload.value && soundUpload.value.files !== null){
      const blob:Blob = soundUpload.value.files[0]
      soundstore.soundURL = URL.createObjectURL(blob)
    }
  }
 



  // soundstore.sound?.addEventListener(, (event)=> {
  //   console.log('event')
  // })
</script>

<style scoped></style>
