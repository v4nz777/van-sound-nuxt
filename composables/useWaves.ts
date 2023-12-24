import WaveSurfer from "wavesurfer.js"

export const useWaves = (elemetID:string,soundURL:string):WaveSurfer=> {
    return WaveSurfer.create({
        container: elemetID,
        waveColor: '#black',
        progressColor: '#black',
        cursorColor: 'white',
        autoCenter:true,
        autoScroll:true,
        autoplay: false,
        width: '100%',
        barGap: 1,
        barWidth: 2,
        cursorWidth: 2,
        barRadius: 10,
        url: soundURL
    }) as WaveSurfer
}