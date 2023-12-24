<template>
    <div id="waveform">
    </div>
    <div>
        <button @click="togglePlayState()">play</button>
    </div>
  
</template>

<script setup lang="ts">
import WaveSurfer from 'wavesurfer.js'
const soundstore = useSoundStore()

let wave:WaveSurfer;



watch(()=>soundstore.soundURL, (value)=> {
    if(value){
        
        wave = useWaves('#waveform',value) as WaveSurfer

        wave.on('ready',()=> {
            wave.zoom(500)
        })

        wave.on('scroll',(visibleStartTime, visibleEndTime)=> {
            console.log(visibleStartTime, visibleEndTime)
        })

        wave.on('zoom', (event)=> {
            console.log(event)
        })

        wave.on('drag', (event)=> {
            console.log(event)
        })
    }
})

const togglePlayState = ()=> {
    if(wave.isPlaying())wave.pause()
    else wave.play()
}











</script>

<style scoped>

</style>