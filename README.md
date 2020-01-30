## Background of MerkAMP!

MerkAMP is an audio player that  displays **visualization** of selected tracks. A user is prompted with directions on using **merkAMP**, then prompted to select a track, finally sit back and enjoy the show.
<img src="./src/assets/merkamp.gif" width="100%">



## Functionality  & MVP
Users will be able to:
 - [ ]  select an audio file
 - [ ]  play audio files
 - [ ]  display visuals for selected audio file
 - [ ]  switch between audio files
 
This project will also include:
 - [ ]  a directions modal
 - [ ]  production README

## Wireframe

This application will consist of two displays. A modal will be displayed to give instructions for the application, and also buttons to navigate between views. There will be a track index, once a track is selected. The track will play and the view will be switched to a visualization of the audio. There will also be a button to navigate back to track index.

![wireframe-1](https://i.imgur.com/YGPEDZQ.png)
![wireframe-2](https://i.imgur.com/nGyNj1K.png)
![wireframe-3](https://i.imgur.com/BGLhUv4.png)


## Architecture and Technology

This application will be implemented with the following technologies:

 - **JavaScript** for logic
 ```
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
    var upperAvgFr = upperAvg / upperHalfArray.length;

    makeRoughGround(plane, modulate(upperAvgFr, 0, 1, 0.5, 2));
    makeRoughGround(plane2, modulate(lowerMaxFr, 0, 1, 0.5, 2));


    makeRoughBall(torus, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 0.5), modulate(upperAvgFr, 0, 1, 0, 0.5));
    
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
```
 
 - WebAudioAPI for audio  playing
 ```
const audioContext = new AudioContext();
const audioElement = document.getElementById('ny-state');
const trackOne = audioContext.createMediaElementSource(audioElement);
const gainNode = audioContext.createGain();
const analyzerOne = audioContext.createAnalyser();
analyzerOne.connect(audioContext.destination);
analyzerOne.fftSize = 512;
let bufferLength = analyzerOne.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);
analyzerOne.getByteFrequencyData(dataArray);
trackOne.connect(analyzerOne);
trackOne.connect(gainNode).connect(audioContext.destination);
```
 - Three.js for 3D audio visualization
 
 ```
var geometry = new THREE.TorusGeometry(1.5, 1, 6, 100);
var material = new THREE.MeshBasicMaterial({ 
    color: forestGreen,
    wireframe: true
});
var torus = new THREE.Mesh(geometry, material);
torus.position.set(0, 0, 0);

const planeGeometry = new THREE.PlaneGeometry(400, 400, 20, 20);
const planeMaterial = new THREE.MeshLambertMaterial({
    color: forestGreen,
    side: THREE.DoubleSide,
    wireframe: true
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, 30, 0);
```
 
This project will also include scripts that will be responsible for handling different parts of the application:

welcome_modal.js -- renders instructions
track_index_modal.js -- displays the audio files
track_display.js -- renders the view for current track
audio_visual_display.js -- renders the 3D audio visualization


## Implementation Timeline

**Day 1**:
Setup of all necessary modules, running webpack, and installing WebAudioAPI and Three.js.
 - [ ] Learn WebAudioAPI
 - [ ] Clean infrastructure
 - [ ] Set up modals

**Day 2**:
Majority of the day learning both WebAudioAPI and Three.js.
 - [ ] Play audio
 - [ ] Have modals working 

**Day 3**:
Majority of the day dedicated to learning more about Three.js and rendering 3D displays for audio files.
 - [ ] Render 3D audio-visual display
 - [ ] Switch between tracks

**Day 4**:
Clean up file structure and code. Finishing touches
 - [ ] Check for all possible bugs
 - [ ] Proper documentation

## Bonus Features

 - [ ] AWS
 - [ ] User upload audio files
