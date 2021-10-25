
var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
});
base64string = ""
var snd = new Audio("data:audio/wav;base64," + base64string);



const playSound = () =>{
    wavesurfer.play();
}
const changeWave = () =>{
    var x = document.getElementById("input_bit64").value;
    var snd = new Audio("data:audio/wav;base64," + x);
    wavesurfer.load(snd);
}
var slideIndex = 0;
fetch('MissingKeyBit64.txt')
  .then(response => response.text())
  .then(text => {
    base64string=text;
    var snd = new Audio("data:audio/wav;base64," + base64string);
    wavesurfer.load(snd);
  })
