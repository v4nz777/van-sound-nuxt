<!-- <template>
    <div class="w-full flex justify-center items-center p-2">  
        <canvas id="waveAreaCanvas">
            hello
        </canvas>
        
    </div>
</template>

<script setup lang="ts">

    const soundstore = useSoundStore()

    
    let ctx: CanvasRenderingContext2D|null|undefined;
    const canvasWidth = ref(960)
    const canvasHeight = ref(200)

 

    onMounted(async() => {
        await setCanvas(window.innerWidth - 75)

        window.onresize = async ()=> {
            await setCanvas(window.innerWidth - 75)
        }
        
    })

    const drawContents = (data:any)=> {
        if(!ctx)return

        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle = 'white'

        const sliceWidth = (canvasWidth.value * 1.0) / data.length;
        let x = 0;

        for (const item of data) {
            const y = (item / 255.0) * canvasHeight.value;
            if (x === 0) {
            ctx.moveTo(x, y);
            } else {
            ctx.lineTo(x, y);
            }
            x += sliceWidth;
        }

        // ctx.lineTo(canvasWidth.value, canvasHeight.value / 2);
        ctx.stroke();
    }

    const setCanvas = async (width:number=canvasWidth.value)=> {
        canvasWidth.value = width
        const _canvas = await loadCanvas('#waveAreaCanvas')
        
        ctx = _canvas?.getContext('2d')

        if(_canvas && ctx && soundstore.sound){
            
            ctx.clearRect(0, 0, _canvas.width, _canvas.height)

            const audioContext = new (AudioContext)();
            const audioSrc = audioContext.createMediaElementSource(soundstore.sound);
            const analyser = audioContext.createAnalyser();

            audioSrc.connect(analyser);
            audioSrc.connect(audioContext.destination);

            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

    
            function renderFullWaveform() {
    
                analyser.getByteTimeDomainData(dataArray);
                drawContents(dataArray);
            }

            if (!soundstore.sound)return

            soundstore.sound.addEventListener('canplaythrough', ()=> {
                const duration = soundstore.duration;

                const samples = Math.floor(duration * 44100); // Assuming sample rate of 44100
                const bufferLength = samples > 1024 ? samples : 1024; // Minimum buffer length

                analyser.fftSize = bufferLength;
                const fullBuffer = new Uint8Array(bufferLength);
                const float32Buffer = new Float32Array(bufferLength);

                const audioCtx = new AudioContext();

                if (!soundstore.sound)return
                const audioSrc = audioCtx.createMediaElementSource(soundstore.sound);
                const offlineCtx = new OfflineAudioContext(1, bufferLength, 44100);

                audioSrc.connect(offlineCtx.destination);
                offlineCtx.startRendering().then(rendering => {
                rendering.copyFromChannel(float32Buffer, 0);
                drawContents(fullBuffer);
                });
            })

            renderFullWaveform()

            
            
        }
    }




    const loadCanvas = (elementID:string):Promise<HTMLCanvasElement|null>=> {
        return new Promise((resolve, reject)=> {
            const wait = setInterval(():void=>{
                if(document && document.querySelector(elementID))
                {
                    const waveArea:HTMLCanvasElement|null 
                            = document.getElementById('waveAreaCanvas') as HTMLCanvasElement
                    clearInterval(wait)
                    waveArea.width = canvasWidth.value
                    waveArea.height = canvasHeight.value
                    resolve(waveArea)

                }
                
            },100)
        })
    }

</script>

<style scoped>

</style> -->