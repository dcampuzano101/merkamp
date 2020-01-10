const THREE = require('three');
const SimplexNoise = require('simplex-noise');

var green = new THREE.Color('#D9FFA3');
var purple = new THREE.Color('#7F25D9');
var burntorange = new THREE.Color('#F2784B');
var forestGreen = new THREE.Color('#516D73');

const noise = new SimplexNoise();

const audioContext = new AudioContext();
const audioContextTwo = new AudioContext();
const audioContextThree = new AudioContext();
const audioContextFour = new AudioContext();

const audioElement = document.getElementById('ny-state');
const audioElementTwo = document.getElementById('world');
const audioElementThree = document.getElementById('hard-to-tell');
const audioElementFour = document.getElementById('audio');

const userTrack = document.getElementById('user-tracks');


const audioElementFile = document.getElementById("thefile");
const fileLabel = document.querySelector("label.file");

audioElementFile.onchange = function () {
    userTrack.style.display = 'flex';
    fileLabel.classList.add('normal');
    audio.classList.add('active');
    var files = this.files;
    console.log(files);
    audioElementFour.src = URL.createObjectURL(files[0]);
    console.log(audioElementFour.src);    
    // audio.load();
    // audio.play();
    // play();
};




const trackOne = audioContext.createMediaElementSource(audioElement);
const trackTwo = audioContextTwo.createMediaElementSource(audioElementTwo);
const trackThree = audioContextThree.createMediaElementSource(audioElementThree);
const trackFour = audioContextFour.createMediaElementSource(audioElementFour);

const gainNode = audioContext.createGain();
const gainNodeTwo = audioContextTwo.createGain();
const gainNodeThree = audioContextThree.createGain();
const gainNodeFour = audioContextFour.createGain();

const analyzerOne = audioContext.createAnalyser();
analyzerOne.connect(audioContext.destination);
analyzerOne.fftSize = 512;
let bufferLength = analyzerOne.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);
analyzerOne.getByteFrequencyData(dataArray);

const analyzerTwo = audioContextTwo.createAnalyser();
analyzerTwo.connect(audioContextTwo.destination);
analyzerTwo.fftSize = 512;
let bufferLength2 = analyzerTwo.frequencyBinCount;
let dataArray2 = new Uint8Array(bufferLength2);
analyzerTwo.getByteFrequencyData(dataArray2);

const analyzerThree = audioContextThree.createAnalyser();
analyzerThree.connect(audioContextThree.destination);
analyzerThree.fftSize = 512;
let bufferLength3 = analyzerThree.frequencyBinCount;
let dataArray3 = new Uint8Array(bufferLength3);
analyzerThree.getByteFrequencyData(dataArray3);

const analyzerFour = audioContextFour.createAnalyser();
analyzerFour.connect(audioContextFour.destination);
analyzerFour.fftSize = 512;
let bufferLength4 = analyzerFour.frequencyBinCount;
let dataArray4 = new Uint8Array(bufferLength4);
analyzerFour.getByteFrequencyData(dataArray4);


let analyzer = analyzerOne, dataArr = dataArray;

trackOne.connect(analyzerOne);
trackOne.connect(gainNode).connect(audioContext.destination);

trackTwo.connect(analyzerTwo);
trackTwo.connect(gainNodeTwo).connect(audioContextTwo.destination);

trackThree.connect(analyzerThree);
trackThree.connect(gainNodeThree).connect(audioContextThree.destination);

trackFour.connect(analyzerFour);
trackFour.connect(gainNodeFour).connect(audioContextFour.destination);

window.addEventListener('resize', onWindowResize, false);


const playButton = document.getElementById('btn-1');
const playButton2 = document.getElementById('btn-2');
const playButton3 = document.getElementById('btn-3');
const playButton4 = document.getElementById('btn-4');

const volumeControl = document.getElementById('vol-1');
const volumeControlTwo = document.getElementById('vol-2');
const volumeControlThree = document.getElementById('vol-3');
const volumeControlFour = document.getElementById('vol-4');

playButton.addEventListener('click', function() {
    analyzer = analyzerOne;
    dataArr = dataArray;
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

    analyzer = analyzerTwo;
    dataArr = dataArray2;
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
    analyzer = analyzerThree;
    dataArr = dataArray3;
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

playButton4.addEventListener('click', function () {
    analyzer = analyzerFour;
    dataArr = dataArray4;
    if (audioContextFour.state === 'suspended') {
        audioContextFour.resume();
    }

    if (this.dataset.playing === 'false') {
        audioElementFour.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElementFour.pause();
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

audioElement.addEventListener('ended', () => {
    playButton4.dataset.playing = 'false';
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

volumeControlFour.addEventListener('input', function () {
    gainNodeFour.gain.value = this.value;
});

function avg(arr) {
    let sum = 0;

    arr.forEach(num => {
        sum += num;
    });
    return (sum / arr.length);
}

function render() {
    analyzer.getByteFrequencyData(dataArr);

    var lowerHalfArray = dataArr.slice(0, (dataArr.length / 2) - 1);
    var upperHalfArray = dataArr.slice((dataArr.length / 2) - 1, dataArr.length - 1);

    var overallAvg = avg(dataArr);
    var lowerMax = Math.max(...lowerHalfArray);
    var lowerAvg = avg(lowerHalfArray);
    var upperMax = Math.max(...upperHalfArray);
    var upperAvg = avg(upperHalfArray);

    var lowerMaxFr = lowerMax / lowerHalfArray.length;
    // var lowerAvgFr = lowerAvg / lowerHalfArray.length;
    // var upperMaxFr = upperMax / upperHalfArray.length;
    var upperAvgFr = upperAvg / upperHalfArray.length;

    makeRoughGround(plane, modulate(upperAvgFr, 0, 1, 0.5, 2));
    makeRoughGround(plane2, modulate(lowerMaxFr, 0, 1, 0.5, 2));

    // makeRoughBall(sphere, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 0.5), modulate(upperAvgFr, 0, 1, 0, 0.5));
    makeRoughBall(torus, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 0.5), modulate(upperAvgFr, 0, 1, 0, 0.5));
    // group.rotation.y += 0.000;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function makeRoughBall(mesh, bassFr, treFr) {
    mesh.geometry.vertices.forEach(function (vertex, i) {
        var offset = mesh.geometry.parameters.radius;
        var amp = 7;
        var time = window.performance.now();
        vertex.normalize();
        var rf = 0.00001;
        var distance = (offset + bassFr) + noise.noise3D(vertex.x + time * rf * 7, vertex.y + time * rf * 8, vertex.z + time * rf * 9) * amp * treFr;
        vertex.multiplyScalar(distance);
    });
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.normalsNeedUpdate = true;
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();
}

function makeRoughGround(mesh, distortionFr) {
    mesh.geometry.vertices.forEach(function (vertex, i) {
        var amp = 2;
        var time = Date.now();
        var distance = (noise.noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) * distortionFr * amp;
        vertex.z = distance;
    });
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.normalsNeedUpdate = true;
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

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
// document.body.appendChild(renderer.domElement);
document.getElementById("container").appendChild(renderer.domElement);
renderer.domElement.className = "canvas-container";

const planeGeometry = new THREE.PlaneGeometry(400, 400, 20, 20);
const planeMaterial = new THREE.MeshLambertMaterial({
    color: forestGreen,
    side: THREE.DoubleSide,
    wireframe: true
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, 30, 0);


const plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
plane2.rotation.x = -0.5 * Math.PI;
plane2.position.set(0, -30, 0);

var geometry = new THREE.IcosahedronGeometry(1, 3);
var material = new THREE.MeshBasicMaterial({
    color: forestGreen,
    wireframe: true
});

var geometry = new THREE.TorusGeometry(1.5, 1, 6, 100);
var material = new THREE.MeshBasicMaterial({ 
    color: forestGreen,
    wireframe: true
});
var torus = new THREE.Mesh(geometry, material);
torus.position.set(0, 0, 0);
geomClone = torus.geometry.clone();
console.log(geomClone);
group.add(torus);

var light = new THREE.AmbientLight(purple); // soft white light
group.add(light);

// var geometry2 = new THREE.TorusGeometry(3, 1, 6, 100);
// var material2 = new THREE.MeshBasicMaterial({
//     color: 0xffff00,
//     wireframe: true
// });
// var torus2 = new THREE.Mesh(geometry2, material2);
// torus2.position.set(0, 0, 0);
// group.add(torus2);
function clearGroup() {
    var to_remove = [];

    group.traverse(function (child) {
        if (child instanceof THREE.Mesh && !child.userData.keepMe === true) {
            to_remove.push(child);
        }
    });

    for (var i = 0; i < to_remove.length; i++) {
        group.remove(to_remove[i]);
    }
}



group.add(plane);
group.add(plane2);
// group.add(sphere);
scene.add(group);
camera.position.z = 5;
const animate = function () {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.007;
    torus.rotation.y += 0.007;
    renderer.render(scene, camera);
    group.rotation.y += 0.002;
};

function fractionate(val, minVal, maxVal) {
    return (val - minVal) / (maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
    var fr = fractionate(val, minVal, maxVal);
    var delta = outMax - outMin;
    return outMin + (fr * delta);
}

animate();



render();
// render2();
// render3();
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////


// const audioContext = new AudioContext();
// const audioElement = document.getElementById('ny-state');
// const trackOne = audioContext.createMediaElementSource(audioElement);
// const gainNode = audioContext.createGain();
// const analyzerOne = audioContext.createAnalyser();
// analyzerOne.connect(audioContext.destination);
// analyzerOne.fftSize = 512;
// let bufferLength = analyzerOne.frequencyBinCount;
// let dataArray = new Uint8Array(bufferLength);
// analyzerOne.getByteFrequencyData(dataArray);
// trackOne.connect(analyzerOne);
// trackOne.connect(gainNode).connect(audioContext.destination);

const countryContext = new AudioContext();
const countryContextTwo = new AudioContext();
const countryContextThree = new AudioContext();

const countryElement = document.getElementById('cruise');
const countryElementTwo = document.getElementById('drunk');
const countryElementThree = document.getElementById('jolene');

const countryOne = countryContext.createMediaElementSource(countryElement);
const countryTwo = countryContextTwo.createMediaElementSource(countryElementTwo);
const countryThree = countryContextThree.createMediaElementSource(countryElementThree);

const countryGainNode = countryContext.createGain();
const countryGainNodeTwo = countryContextTwo.createGain();
const countryGainNodeThree = countryContextThree.createGain();

const countryAnalyzerOne = countryContext.createAnalyser();
countryAnalyzerOne.connect(countryContext.destination);
countryAnalyzerOne.fftSize = 512;
let countryBufferLength = countryAnalyzerOne.frequencyBinCount;
let countryDataArray = new Uint8Array(countryBufferLength);
countryAnalyzerOne.getByteFrequencyData(countryDataArray);

const countryAnalyzerTwo = countryContextTwo.createAnalyser();
countryAnalyzerTwo.connect(countryContextTwo.destination);
countryAnalyzerTwo.fftSize = 512;
let countryBufferLength2 = countryAnalyzerTwo.frequencyBinCount;
let countryDataArray2 = new Uint8Array(countryBufferLength2);
countryAnalyzerTwo.getByteFrequencyData(countryDataArray2);

const countryAnalyzerThree = countryContextThree.createAnalyser();
countryAnalyzerThree.connect(countryContextThree.destination);
countryAnalyzerThree.fftSize = 512;
let countryBufferLength3 = countryAnalyzerThree.frequencyBinCount;
let countryDataArray3 = new Uint8Array(countryBufferLength3);
countryAnalyzerThree.getByteFrequencyData(countryDataArray3);

countryOne.connect(countryAnalyzerOne);
countryOne.connect(countryGainNode).connect(countryContext.destination);

countryTwo.connect(countryAnalyzerTwo);
countryTwo.connect(countryGainNodeTwo).connect(countryContextTwo.destination);

countryThree.connect(countryAnalyzerThree);
countryThree.connect(countryGainNodeThree).connect(countryContextThree.destination);

const countryButton = document.getElementById('country-btn-1');
const countryButton2 = document.getElementById('country-btn-2');
const countryButton3 = document.getElementById('country-btn-3');
const countryControl = document.getElementById('country-vol-1');
const countryControlTwo = document.getElementById('country-vol-2');
const countryControlThree = document.getElementById('country-vol-3');

countryButton.addEventListener('click', function () {
    analyzer = countryAnalyzerOne;
    dataArr = countryDataArray;
    if (countryContext.state === 'suspended') {
        countryContext.resume();
    }

    if (this.dataset.playing === 'false') {
        countryElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        countryElement.pause();
        this.dataset.playing = 'false';
    }
}, false);

countryButton2.addEventListener('click', function () {

    analyzer = countryAnalyzerTwo;
    dataArr = countryDataArray2;
    if (countryContextTwo.state === 'suspended') {
        countryContextTwo.resume();
    }

    if (this.dataset.playing === 'false') {
        countryElementTwo.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        countryElementTwo.pause();
        this.dataset.playing = 'false';
    }
}, false);

countryButton3.addEventListener('click', function () {
    analyzer = countryAnalyzerThree;
    dataArr = countryDataArray3;
    if (countryContextThree.state === 'suspended') {
        countryContextThree.resume();
    }

    if (this.dataset.playing === 'false') {
        countryElementThree.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        countryElementThree.pause();
        this.dataset.playing = 'false';
    }
}, false);

countryElement.addEventListener('ended', () => {
    countryButton.dataset.playing = 'false';
}, false);

countryElement.addEventListener('ended', () => {
    countryButton2.dataset.playing = 'false';
}, false);

countryElement.addEventListener('ended', () => {
    countryButton3.dataset.playing = 'false';
}, false);
countryControl.addEventListener('input', function () {
    countryGainNode.gain.value = this.value;
});

countryControlTwo.addEventListener('input', function () {
    countryGainNodeTwo.gain.value = this.value;
});

countryControlThree.addEventListener('input', function () {
    countryGainNodeThree.gain.value = this.value;
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////


// const audioContext = new AudioContext();
// const audioElement = document.getElementById('ny-state');
// const trackOne = audioContext.createMediaElementSource(audioElement);
// const gainNode = audioContext.createGain();
// const analyzerOne = audioContext.createAnalyser();
// analyzerOne.connect(audioContext.destination);
// analyzerOne.fftSize = 512;
// let bufferLength = analyzerOne.frequencyBinCount;
// let dataArray = new Uint8Array(bufferLength);
// analyzerOne.getByteFrequencyData(dataArray);
// trackOne.connect(analyzerOne);
// trackOne.connect(gainNode).connect(audioContext.destination);

const emoContext = new AudioContext();
const emoContextTwo = new AudioContext();
const emoContextThree = new AudioContext();

const emoElement = document.getElementById('jesus');
const emoElementTwo = document.getElementById('cute');
const emoElementThree = document.getElementById('makedamnsure');

const emoOne = emoContext.createMediaElementSource(emoElement);
const emoTwo = emoContextTwo.createMediaElementSource(emoElementTwo);
const emoThree = emoContextThree.createMediaElementSource(emoElementThree);

const emoGainNode = emoContext.createGain();
const emoGainNodeTwo = emoContextTwo.createGain();
const emoGainNodeThree = emoContextThree.createGain();

const emoAnalyzerOne = emoContext.createAnalyser();
emoAnalyzerOne.connect(emoContext.destination);
emoAnalyzerOne.fftSize = 512;
let emoBufferLength = emoAnalyzerOne.frequencyBinCount;
let emoDataArray = new Uint8Array(emoBufferLength);
emoAnalyzerOne.getByteFrequencyData(emoDataArray);

const emoAnalyzerTwo = emoContextTwo.createAnalyser();
emoAnalyzerTwo.connect(emoContextTwo.destination);
emoAnalyzerTwo.fftSize = 512;
let emoBufferLength2 = emoAnalyzerTwo.frequencyBinCount;
let emoDataArray2 = new Uint8Array(emoBufferLength2);
emoAnalyzerTwo.getByteFrequencyData(emoDataArray2);

const emoAnalyzerThree = emoContextThree.createAnalyser();
emoAnalyzerThree.connect(emoContextThree.destination);
emoAnalyzerThree.fftSize = 512;
let emoBufferLength3 = emoAnalyzerThree.frequencyBinCount;
let emoDataArray3 = new Uint8Array(emoBufferLength3);
emoAnalyzerThree.getByteFrequencyData(emoDataArray3);

emoOne.connect(emoAnalyzerOne);
emoOne.connect(emoGainNode).connect(emoContext.destination);

emoTwo.connect(emoAnalyzerTwo);
emoTwo.connect(emoGainNodeTwo).connect(emoContextTwo.destination);

emoThree.connect(emoAnalyzerThree);
emoThree.connect(emoGainNodeThree).connect(emoContextThree.destination);

const emoButton = document.getElementById('emo-btn-1');
const emoButton2 = document.getElementById('emo-btn-2');
const emoButton3 = document.getElementById('emo-btn-3');
const emoControl = document.getElementById('emo-vol-1');
const emoControlTwo = document.getElementById('emo-vol-2');
const emoControlThree = document.getElementById('emo-vol-3');

emoButton.addEventListener('click', function () {
    analyzer = emoAnalyzerOne;
    dataArr = emoDataArray;
    if (emoContext.state === 'suspended') {
        emoContext.resume();
    }

    if (this.dataset.playing === 'false') {
        emoElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        emoElement.pause();
        this.dataset.playing = 'false';
    }
}, false);

emoButton2.addEventListener('click', function () {

    analyzer = emoAnalyzerTwo;
    dataArr = emoDataArray2;
    if (emoContextTwo.state === 'suspended') {
        emoContextTwo.resume();
    }

    if (this.dataset.playing === 'false') {
        emoElementTwo.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        emoElementTwo.pause();
        this.dataset.playing = 'false';
    }
}, false);

emoButton3.addEventListener('click', function () {
    analyzer = emoAnalyzerThree;
    dataArr = emoDataArray3;
    if (emoContextThree.state === 'suspended') {
        emoContextThree.resume();
    }

    if (this.dataset.playing === 'false') {
        emoElementThree.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        emoElementThree.pause();
        this.dataset.playing = 'false';
    }
}, false);

emoElement.addEventListener('ended', () => {
    emoButton.dataset.playing = 'false';
}, false);

emoElement.addEventListener('ended', () => {
    emoButton2.dataset.playing = 'false';
}, false);

emoElement.addEventListener('ended', () => {
    emoButton3.dataset.playing = 'false';
}, false);
emoControl.addEventListener('input', function () {
    emoGainNode.gain.value = this.value;
});

emoControlTwo.addEventListener('input', function () {
    emoGainNodeTwo.gain.value = this.value;
});

emoControlThree.addEventListener('input', function () {
    emoGainNodeThree.gain.value = this.value;
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////


// const audioContext = new AudioContext();
// const audioElement = document.getElementById('ny-state');
// const trackOne = audioContext.createMediaElementSource(audioElement);
// const gainNode = audioContext.createGain();
// const analyzerOne = audioContext.createAnalyser();
// analyzerOne.connect(audioContext.destination);
// analyzerOne.fftSize = 512;
// let bufferLength = analyzerOne.frequencyBinCount;
// let dataArray = new Uint8Array(bufferLength);
// analyzerOne.getByteFrequencyData(dataArray);
// trackOne.connect(analyzerOne);
// trackOne.connect(gainNode).connect(audioContext.destination);

const nycContext = new AudioContext();
const nycContextTwo = new AudioContext();
const nycContextThree = new AudioContext();

const nycElement = document.getElementById('dipset');
const nycElementTwo = document.getElementById('message');
const nycElementThree = document.getElementById('books');

const nycOne = nycContext.createMediaElementSource(nycElement);
const nycTwo = nycContextTwo.createMediaElementSource(nycElementTwo);
const nycThree = nycContextThree.createMediaElementSource(nycElementThree);

const nycGainNode = nycContext.createGain();
const nycGainNodeTwo = nycContextTwo.createGain();
const nycGainNodeThree = nycContextThree.createGain();

const nycAnalyzerOne = nycContext.createAnalyser();
nycAnalyzerOne.connect(nycContext.destination);
nycAnalyzerOne.fftSize = 512;
let nycBufferLength = nycAnalyzerOne.frequencyBinCount;
let nycDataArray = new Uint8Array(nycBufferLength);
nycAnalyzerOne.getByteFrequencyData(nycDataArray);

const nycAnalyzerTwo = nycContextTwo.createAnalyser();
nycAnalyzerTwo.connect(nycContextTwo.destination);
nycAnalyzerTwo.fftSize = 512;
let nycBufferLength2 = nycAnalyzerTwo.frequencyBinCount;
let nycDataArray2 = new Uint8Array(nycBufferLength2);
nycAnalyzerTwo.getByteFrequencyData(nycDataArray2);

const nycAnalyzerThree = nycContextThree.createAnalyser();
nycAnalyzerThree.connect(nycContextThree.destination);
nycAnalyzerThree.fftSize = 512;
let nycBufferLength3 = nycAnalyzerThree.frequencyBinCount;
let nycDataArray3 = new Uint8Array(nycBufferLength3);
nycAnalyzerThree.getByteFrequencyData(nycDataArray3);

nycOne.connect(nycAnalyzerOne);
nycOne.connect(nycGainNode).connect(nycContext.destination);

nycTwo.connect(nycAnalyzerTwo);
nycTwo.connect(nycGainNodeTwo).connect(nycContextTwo.destination);

nycThree.connect(nycAnalyzerThree);
nycThree.connect(nycGainNodeThree).connect(nycContextThree.destination);

const nycButton = document.getElementById('nyc-btn-1');
const nycButton2 = document.getElementById('nyc-btn-2');
const nycButton3 = document.getElementById('nyc-btn-3');
const nycControl = document.getElementById('nyc-vol-1');
const nycControlTwo = document.getElementById('nyc-vol-2');
const nycControlThree = document.getElementById('nyc-vol-3');

nycButton.addEventListener('click', function () {
    analyzer = nycAnalyzerOne;
    dataArr = nycDataArray;
    if (nycContext.state === 'suspended') {
        nycContext.resume();
    }

    if (this.dataset.playing === 'false') {
        nycElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        nycElement.pause();
        this.dataset.playing = 'false';
    }
}, false);

nycButton2.addEventListener('click', function () {

    analyzer = nycAnalyzerTwo;
    dataArr = nycDataArray2;
    if (nycContextTwo.state === 'suspended') {
        nycContextTwo.resume();
    }

    if (this.dataset.playing === 'false') {
        nycElementTwo.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        nycElementTwo.pause();
        this.dataset.playing = 'false';
    }
}, false);

nycButton3.addEventListener('click', function () {
    analyzer = nycAnalyzerThree;
    dataArr = nycDataArray3;
    if (nycContextThree.state === 'suspended') {
        nycContextThree.resume();
    }

    if (this.dataset.playing === 'false') {
        nycElementThree.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        nycElementThree.pause();
        this.dataset.playing = 'false';
    }
}, false);

nycElement.addEventListener('ended', () => {
    nycButton.dataset.playing = 'false';
}, false);

nycElement.addEventListener('ended', () => {
    nycButton2.dataset.playing = 'false';
}, false);

nycElement.addEventListener('ended', () => {
    nycButton3.dataset.playing = 'false';
}, false);
nycControl.addEventListener('input', function () {
    nycGainNode.gain.value = this.value;
});

nycControlTwo.addEventListener('input', function () {
    nycGainNodeTwo.gain.value = this.value;
});

nycControlThree.addEventListener('input', function () {
    nycGainNodeThree.gain.value = this.value;
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////


// const audioContext = new AudioContext();
// const audioElement = document.getElementById('ny-state');
// const trackOne = audioContext.createMediaElementSource(audioElement);
// const gainNode = audioContext.createGain();
// const analyzerOne = audioContext.createAnalyser();
// analyzerOne.connect(audioContext.destination);
// analyzerOne.fftSize = 512;
// let bufferLength = analyzerOne.frequencyBinCount;
// let dataArray = new Uint8Array(bufferLength);
// analyzerOne.getByteFrequencyData(dataArray);
// trackOne.connect(analyzerOne);
// trackOne.connect(gainNode).connect(audioContext.destination);

const altContext = new AudioContext();
const altContextTwo = new AudioContext();
const altContextThree = new AudioContext();

const altElement = document.getElementById('tame');
const altElementTwo = document.getElementById('phantogram');
const altElementThree = document.getElementById('monkeys');

const altOne = altContext.createMediaElementSource(altElement);
const altTwo = altContextTwo.createMediaElementSource(altElementTwo);
const altThree = altContextThree.createMediaElementSource(altElementThree);

const altGainNode = altContext.createGain();
const altGainNodeTwo = altContextTwo.createGain();
const altGainNodeThree = altContextThree.createGain();

const altAnalyzerOne = altContext.createAnalyser();
altAnalyzerOne.connect(altContext.destination);
altAnalyzerOne.fftSize = 512;
let altBufferLength = altAnalyzerOne.frequencyBinCount;
let altDataArray = new Uint8Array(altBufferLength);
altAnalyzerOne.getByteFrequencyData(altDataArray);

const altAnalyzerTwo = altContextTwo.createAnalyser();
altAnalyzerTwo.connect(altContextTwo.destination);
altAnalyzerTwo.fftSize = 512;
let altBufferLength2 = altAnalyzerTwo.frequencyBinCount;
let altDataArray2 = new Uint8Array(altBufferLength2);
altAnalyzerTwo.getByteFrequencyData(altDataArray2);

const altAnalyzerThree = altContextThree.createAnalyser();
altAnalyzerThree.connect(altContextThree.destination);
altAnalyzerThree.fftSize = 512;
let altBufferLength3 = altAnalyzerThree.frequencyBinCount;
let altDataArray3 = new Uint8Array(altBufferLength3);
altAnalyzerThree.getByteFrequencyData(altDataArray3);

altOne.connect(altAnalyzerOne);
altOne.connect(altGainNode).connect(altContext.destination);

altTwo.connect(altAnalyzerTwo);
altTwo.connect(altGainNodeTwo).connect(altContextTwo.destination);

altThree.connect(altAnalyzerThree);
altThree.connect(altGainNodeThree).connect(altContextThree.destination);

const altButton = document.getElementById('alt-btn-1');
const altButton2 = document.getElementById('alt-btn-2');
const altButton3 = document.getElementById('alt-btn-3');
const altControl = document.getElementById('alt-vol-1');
const altControlTwo = document.getElementById('alt-vol-2');
const altControlThree = document.getElementById('alt-vol-3');

altButton.addEventListener('click', function () {
    analyzer = altAnalyzerOne;
    dataArr = altDataArray;
    if (altContext.state === 'suspended') {
        altContext.resume();
    }

    if (this.dataset.playing === 'false') {
        altElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        altElement.pause();
        this.dataset.playing = 'false';
    }
}, false);

altButton2.addEventListener('click', function () {

    analyzer = altAnalyzerTwo;
    dataArr = altDataArray2;
    if (altContextTwo.state === 'suspended') {
        altContextTwo.resume();
    }

    if (this.dataset.playing === 'false') {
        altElementTwo.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        altElementTwo.pause();
        this.dataset.playing = 'false';
    }
}, false);

altButton3.addEventListener('click', function () {
    analyzer = altAnalyzerThree;
    dataArr = altDataArray3;
    if (altContextThree.state === 'suspended') {
        altContextThree.resume();
    }

    if (this.dataset.playing === 'false') {
        altElementThree.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        altElementThree.pause();
        this.dataset.playing = 'false';
    }
}, false);

altElement.addEventListener('ended', () => {
    altButton.dataset.playing = 'false';
}, false);

altElement.addEventListener('ended', () => {
    altButton2.dataset.playing = 'false';
}, false);

altElement.addEventListener('ended', () => {
    altButton3.dataset.playing = 'false';
}, false);
altControl.addEventListener('input', function () {
    altGainNode.gain.value = this.value;
});

altControlTwo.addEventListener('input', function () {
    altGainNodeTwo.gain.value = this.value;
});

altControlThree.addEventListener('input', function () {
    altGainNodeThree.gain.value = this.value;
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////


// const audioContext = new AudioContext();
// const audioElement = document.getElementById('ny-state');
// const trackOne = audioContext.createMediaElementSource(audioElement);
// const gainNode = audioContext.createGain();
// const analyzerOne = audioContext.createAnalyser();
// analyzerOne.connect(audioContext.destination);
// analyzerOne.fftSize = 512;
// let bufferLength = analyzerOne.frequencyBinCount;
// let dataArray = new Uint8Array(bufferLength);
// analyzerOne.getByteFrequencyData(dataArray);
// trackOne.connect(analyzerOne);
// trackOne.connect(gainNode).connect(audioContext.destination);

const frenchContext = new AudioContext();
const frenchContextTwo = new AudioContext();
const frenchContextThree = new AudioContext();

const frenchElement = document.getElementById('martin');
const frenchElementTwo = document.getElementById('polo');
const frenchElementThree = document.getElementById('christine');

const frenchOne = frenchContext.createMediaElementSource(frenchElement);
const frenchTwo = frenchContextTwo.createMediaElementSource(frenchElementTwo);
const frenchThree = frenchContextThree.createMediaElementSource(frenchElementThree);

const frenchGainNode = frenchContext.createGain();
const frenchGainNodeTwo = frenchContextTwo.createGain();
const frenchGainNodeThree = frenchContextThree.createGain();

const frenchAnalyzerOne = frenchContext.createAnalyser();
frenchAnalyzerOne.connect(frenchContext.destination);
frenchAnalyzerOne.fftSize = 512;
let frenchBufferLength = frenchAnalyzerOne.frequencyBinCount;
let frenchDataArray = new Uint8Array(frenchBufferLength);
frenchAnalyzerOne.getByteFrequencyData(frenchDataArray);

const frenchAnalyzerTwo = frenchContextTwo.createAnalyser();
frenchAnalyzerTwo.connect(frenchContextTwo.destination);
frenchAnalyzerTwo.fftSize = 512;
let frenchBufferLength2 = frenchAnalyzerTwo.frequencyBinCount;
let frenchDataArray2 = new Uint8Array(frenchBufferLength2);
frenchAnalyzerTwo.getByteFrequencyData(frenchDataArray2);

const frenchAnalyzerThree = frenchContextThree.createAnalyser();
frenchAnalyzerThree.connect(frenchContextThree.destination);
frenchAnalyzerThree.fftSize = 512;
let frenchBufferLength3 = frenchAnalyzerThree.frequencyBinCount;
let frenchDataArray3 = new Uint8Array(frenchBufferLength3);
frenchAnalyzerThree.getByteFrequencyData(frenchDataArray3);

frenchOne.connect(frenchAnalyzerOne);
frenchOne.connect(frenchGainNode).connect(frenchContext.destination);

frenchTwo.connect(frenchAnalyzerTwo);
frenchTwo.connect(frenchGainNodeTwo).connect(frenchContextTwo.destination);

frenchThree.connect(frenchAnalyzerThree);
frenchThree.connect(frenchGainNodeThree).connect(frenchContextThree.destination);

const frenchButton = document.getElementById('french-btn-1');
const frenchButton2 = document.getElementById('french-btn-2');
const frenchButton3 = document.getElementById('french-btn-3');
const frenchControl = document.getElementById('french-vol-1');
const frenchControlTwo = document.getElementById('french-vol-2');
const frenchControlThree = document.getElementById('french-vol-3');

frenchButton.addEventListener('click', function () {
    analyzer = frenchAnalyzerOne;
    dataArr = frenchDataArray;
    if (frenchContext.state === 'suspended') {
        frenchContext.resume();
    }

    if (this.dataset.playing === 'false') {
        frenchElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        frenchElement.pause();
        this.dataset.playing = 'false';
    }
}, false);

frenchButton2.addEventListener('click', function () {

    analyzer = frenchAnalyzerTwo;
    dataArr = frenchDataArray2;
    if (frenchContextTwo.state === 'suspended') {
        frenchContextTwo.resume();
    }

    if (this.dataset.playing === 'false') {
        frenchElementTwo.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        frenchElementTwo.pause();
        this.dataset.playing = 'false';
    }
}, false);

frenchButton3.addEventListener('click', function () {
    analyzer = frenchAnalyzerThree;
    dataArr = frenchDataArray3;
    if (frenchContextThree.state === 'suspended') {
        frenchContextThree.resume();
    }

    if (this.dataset.playing === 'false') {
        frenchElementThree.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        frenchElementThree.pause();
        this.dataset.playing = 'false';
    }
}, false);

frenchElement.addEventListener('ended', () => {
    frenchButton.dataset.playing = 'false';
}, false);

frenchElement.addEventListener('ended', () => {
    frenchButton2.dataset.playing = 'false';
}, false);

frenchElement.addEventListener('ended', () => {
    frenchButton3.dataset.playing = 'false';
}, false);
frenchControl.addEventListener('input', function () {
    frenchGainNode.gain.value = this.value;
});

frenchControlTwo.addEventListener('input', function () {
    frenchGainNodeTwo.gain.value = this.value;
});

frenchControlThree.addEventListener('input', function () {
    frenchGainNodeThree.gain.value = this.value;
});