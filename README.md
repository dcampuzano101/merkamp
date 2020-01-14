## Background of MerkAMP!

MerkAMP is an audio player that  displays **visualization** of selected tracks. A user is prompted with directions on using **merkAMP**, then prompted to select a track, finally sit back and enjoy the show.
![merkamp-gif](https://i.imgur.com/3XI927E.gif)


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

![wireframe-1](https://i.imgur.com/QQAK8i6.png)
![wireframe-2](https://i.imgur.com/aoEjgLP.png)
![wireframe-3](https://i.imgur.com/XJ0Hg9k.png)

## Architecture and Technology

This application will be implemented with the following technologies:

 - **JavaScript** for logic
 - WebAudioAPI for audio  playing
 - Three.js for 3D audio visualization
 
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
