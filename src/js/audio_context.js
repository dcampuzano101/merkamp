var THREE = require('three');

const audioContext = new AudioContext();
const audioContextTwo = new AudioContext();
const audioContextThree = new AudioContext();


const audioElement = document.getElementById('ny-state');
const audioElementTwo = document.getElementById('world');
const audioElementThree = document.getElementById('hard-to-tell');

const trackOne = audioContext.createMediaElementSource(audioElement);
const trackTwo = audioContextTwo.createMediaElementSource(audioElementTwo);
const trackThree = audioContextThree.createMediaElementSource(audioElementThree);

const gainNode = audioContext.createGain();
const gainNodeTwo = audioContextTwo.createGain();
const gainNodeThree = audioContextThree.createGain();

const analyzerOne = audioContext.createAnalyser();

trackOne.connect(analyzerOne).connect(gainNode).connect(audioContext.destination);
trackTwo.connect(gainNodeTwo).connect(audioContextTwo.destination);
trackThree.connect(gainNodeThree).connect(audioContextThree.destination);

analyzerOne.fftSize = 512;
let bufferLength = analyzerOne.frequencyBinCount;
let dataArr = new Uint8Array(bufferLength);

const playButton = document.getElementById('btn-1');
const playButton2 = document.getElementById('btn-2');
const playButton3 = document.getElementById('btn-3');

const volumeControl = document.getElementById('vol-1');
const volumeControlTwo = document.getElementById('vol-2');
const volumeControlThree = document.getElementById('vol-3');




playButton.addEventListener('click', function() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true'; 
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }
}, false);

playButton2.addEventListener('click', function () {
    if (audioContextTwo.state === 'suspended') {
        audioContextTwo.resume();
    }

    if (this.dataset.playing === 'false') {
        audioElementTwo.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElementTwo.pause();
        this.dataset.playing = 'false';
    }
}, false);

playButton3.addEventListener('click', function () {
    if (audioContextThree.state === 'suspended') {
        audioContextThree.resume();
    }

    if (this.dataset.playing === 'false') {
        audioElementThree.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElementThree.pause();
        this.dataset.playing = 'false';
    }
}, false);

audioElement.addEventListener('ended', () => {
    playButton.dataset.playing = 'false';
}, false);

audioElement.addEventListener('ended', () => {
    playButton2.dataset.playing = 'false';
}, false);

audioElement.addEventListener('ended', () => {
    playButton3.dataset.playing = 'false';
}, false);

volumeControl.addEventListener('input', function() {
    gainNode.gain.value = this.value;
});

volumeControlTwo.addEventListener('input', function () {
    gainNodeTwo.gain.value = this.value;
});

volumeControlThree.addEventListener('input', function () {
    gainNodeThree.gain.value = this.value;
});


function render() {
    analyzerOne.getByteFrequencyData(dataArr);

    //slice arr into 2 halves

    let lowerHalfArr = dataArr.slice(0, (dataArr.length/2) - 1);
    let upperHalfArr = dataArr.slice((dataArr.length/2) - 1, dataArr.length-1);

    let lowerMax = max(lowerHalfArr);
    let lowerAvg = avg(lowerHalfArr);
    let upperAvg = avg(upperHalfArr);

    let lowerMaxFr = lowerMax / lowerHalfArr.length;
    let lowerAvgFr = lowerAvg / lowerHalfArr.length;
    let upperAvgFr = upperAvg / upperHalfArr.length;

    makeRoughGround(plane, modulate(upperAvgFr, 0, 1, 0.5, 4));
    makeRoughGround(plane2, modulate(lowerMaxFr, 0, 1, 0.5, 4));

    makeRoughBall(
      ball,
      modulate(Math.pow(lowerMaxFr, 0.5), 0, 1, 0, 8),
      modulate(upperAvgFr, 0, 1, 0, 4)
    );
}
