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
analyzerOne.connect(audioContext.destination);

trackOne.connect(analyzerOne);
trackOne.connect(gainNode).connect(audioContext.destination);
trackTwo.connect(gainNodeTwo).connect(audioContextTwo.destination);
trackThree.connect(gainNodeThree).connect(audioContextThree.destination);

////////////////////////////////////////////////////////////////

console.log(analyzerOne);
analyzerOne.fftSize = 512;
let bufferLength = analyzerOne.frequencyBinCount;
let dataArr = new Uint8Array(bufferLength);

analyzerOne.getByteFrequencyData(dataArr);
//slice arr into 2 halves

let lowerHalfArr = dataArr.slice(0, (dataArr.length / 2) - 1);
let upperHalfArr = dataArr.slice((dataArr.length / 2) - 1, dataArr.length - 1);

let lowerMax = Math.max(...lowerHalfArr);
let lowerAvg = avg(lowerHalfArr);
let upperAvg = avg(upperHalfArr);

let lowerMaxFr = lowerMax / lowerHalfArr.length;
let lowerAvgFr = lowerAvg / lowerHalfArr.length;
let upperAvgFr = upperAvg / upperHalfArr.length;



///////////////////////////////////////////////////////////////


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

function avg(arr) {
    let sum = 0;

    arr.forEach(num => {
        sum += num;
    });

    return (sum / arr.length);
}

function render() {
    group.rotation.y += 0.005;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
// const listener = new THREE.AudioListener();
const group = new THREE.Group();
camera.position.set(0, 0, 100);
camera.lookAt(scene.position);
// camera.add( listener );
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x6904ce,
    side: THREE.DoubleSide,
    wireframe: true
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, 30, 0);

const plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
plane2.rotation.x = -0.5 * Math.PI;
plane2.position.set(0, -30, 0);

var geometry = new THREE.SphereGeometry(1, 12, 12);
var material = new THREE.MeshBasicMaterial({
    color: 0x6904ce,
    wireframe: true
});
var sphere = new THREE.Mesh(geometry, material);

sphere.position.set(0, 0, 0);

group.add(plane);
group.add(plane2);
group.add(sphere);
scene.add(group);
camera.position.z = 5;
console.log(dataArr);
const animate = function () {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    // analyzerOne.getByteFrequencyData(dataArr);
    // //slice arr into 2 halves

    // let lowerHalfArr = dataArr.slice(0, (dataArr.length / 2) - 1);
    // let upperHalfArr = dataArr.slice((dataArr.length / 2) - 1, dataArr.length - 1);

    // let lowerMax = Math.max(...lowerHalfArr);
    // let lowerAvg = avg(lowerHalfArr);
    // let upperAvg = avg(upperHalfArr);

    // let lowerMaxFr = lowerMax / lowerHalfArr.length;
    // let lowerAvgFr = lowerAvg / lowerHalfArr.length;
    // let upperAvgFr = upperAvg / upperHalfArr.length;


    renderer.render(scene, camera);
};

animate();



render();