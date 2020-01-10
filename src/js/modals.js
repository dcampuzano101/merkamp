const directionsModal = document.getElementById("directions-modal");
const directionsButton = document.getElementById('modal-btn');
const genresButton = document.getElementById('genres-btn');
const genresButtonHome = document.getElementById('genres-btn-home');
const hateNasButton = document.getElementById('hate-nas');
const closeDirectionsBtn = document.getElementById('close-button');
const genresModal = document.getElementById('genres-modal');
const hateNasModal = document.getElementById('hate-nas-modal');
const closeGenresBtn = document.getElementById('close-genres');
const closeGenresButton = document.getElementById('close-genre-button');
const closeHateBtn = document.getElementById('close-hate-nas');
// const uploadBtn = document.getElementById('thefile');
const nasTracks = document.getElementById('nas-tracks');
const modalOverlay = document.getElementById('modal-overlay');

const countryTracks = document.getElementById('country-tracks');
const countryBtn = document.getElementById('genre-country');

const emoTracks = document.getElementById('emo-tracks');
const emoBtn = document.getElementById('genre-emo');

const nycTracks = document.getElementById('nyc-tracks');
const nycBtn = document.getElementById('genre-nyc');

const altTracks = document.getElementById('alt-tracks');
const altBtn = document.getElementById('genre-alt');

const frenchTracks = document.getElementById('french-tracks');
const frenchBtn = document.getElementById('genre-french');


modalOverlay.addEventListener('click', overlayClick);

function overlayClick(e) {
  if (e.target === modalOverlay){
    modalOverlay.style.display = 'none';
    genresButtonHome.style.display = 'flex';
  }
}

directionsButton.addEventListener('click', openDirectionsModal);

closeDirectionsBtn.addEventListener('click', closeDirectionsModal);

function openDirectionsModal() {
  modalOverlay.style.display = 'flex';
  directionsModal.style.display = "flex";
  

}

function closeDirectionsModal() {
  directionsModal.style.display = "none";
  modalOverlay.style.display = 'none';
  genresButtonHome.style.display = 'flex';
}

genresButton.addEventListener('click', () => {
  openGenresModal();
});
genresButtonHome.addEventListener('click', () => {
  openDirectionsModal();
  openGenresModal();
});

closeGenresBtn.addEventListener('click', closeGenresModal);

function openGenresModal() {
  genresModal.style.display = 'flex';
  directionsModal.style.display = "none";
}

function closeGenresModal(e) {
  // console.log(e);
  // console.log(e.target);
  // if (e.target === closeGenresBtn || e.target === closeGenresButton) {
    // debugger;
    genresModal.style.display = 'none';
    directionsModal.style.display = 'none';
    modalOverlay.style.display = 'none';
    genresButtonHome.style.display = 'flex';
  // }
}

// hateNasButton.addEventListener('click', openHateModal);

closeHateBtn.addEventListener('click', closeHateModal);

function openHateModal() {
  hateNasModal.style.display = 'block';
  directionsModal.style.display = "none";
}

function closeHateModal() {
  hateNasModal.style.display = 'none';
  modalOverlay.style.display = 'none';
}

// uploadBtn.addEventListener('click', hideNasTracks);

// function hideNasTracks() {
//   nasTracks.style.display = 'none';
// }

countryBtn.addEventListener('click', openCountryTracks);

function openCountryTracks() {
  countryTracks.style.display = 'flex';
  genresModal.style.display = 'none';
  directionsModal.style.display = 'none';
  modalOverlay.style.display = 'none';
  emoTracks.style.display = 'none';
  nycTracks.style.display = 'none';
  frenchTracks.style.display = 'none';
  altTracks.style.display = 'none';
  genresButtonHome.style.display = 'flex';
}

emoBtn.addEventListener('click', openEmoTracks);

function openEmoTracks() {
  emoTracks.style.display = 'flex';
  genresModal.style.display = 'none';
  directionsModal.style.display = 'none';
  modalOverlay.style.display = 'none';
  countryTracks.style.display = 'none';
  nycTracks.style.display = 'none';
  frenchTracks.style.display = 'none';
  altTracks.style.display = 'none';
  genresButtonHome.style.display = 'flex';
}

nycBtn.addEventListener('click', openNycTracks);

function openNycTracks() {
  nycTracks.style.display = 'flex';
  genresModal.style.display = 'none';
  directionsModal.style.display = 'none';
  modalOverlay.style.display = 'none';
  countryTracks.style.display = 'none';
  frenchTracks.style.display = 'none';
  emoTracks.style.display = 'none';
  altTracks.style.display = 'none';
  genresButtonHome.style.display = 'flex';
}

altBtn.addEventListener('click', openAltTracks);

function openAltTracks() {
  altTracks.style.display = 'flex';
  genresModal.style.display = 'none';
  directionsModal.style.display = 'none';
  modalOverlay.style.display = 'none';
  countryTracks.style.display = 'none';
  nycTracks.style.display = 'none';
  emoTracks.style.display = 'none';
  frenchTracks.style.display = 'none';
  genresButtonHome.style.display = 'flex';
}

frenchBtn.addEventListener('click', openFrenchTracks);

function openFrenchTracks() {
  frenchTracks.style.display = 'flex';
  genresModal.style.display = 'none';
  directionsModal.style.display = 'none';
  modalOverlay.style.display = 'none';
  countryTracks.style.display = 'none';
  nycTracks.style.display = 'none';
  emoTracks.style.display = 'none';
  altTracks.style.display = 'none';
  genresButtonHome.style.display = 'flex';
}

// function closeAllExceptOne(){
//   if (countryTracks.style.display === 'flex') {
//     emoTracks.style.display = 'none';
//     altTracks.style.display = 'none';
//     nycTracks.style.display = 'none';
//     frenchTracks.style.display = 'none';
//   }

//   if (emoTracks.style.display === 'flex') {
//     countryTracks.style.display = 'none';
//     altTracks.style.display = 'none';
//     nycTracks.style.display = 'none';
//     frenchTracks.style.display = 'none';
//   }

//   if (nycTracks.style.display === 'flex') {
//     countryTracks.style.display = 'none';
//     altTracks.style.display = 'none';
//     emoTracks.style.display = 'none';
//     frenchTracks.style.display = 'none';
//   }

//   if (altTracks.style.display === 'flex') {
//     countryTracks.style.display = 'none';
//     nycTracks.style.display = 'none';
//     emoTracks.style.display = 'none';
//     frenchTracks.style.display = 'none';
//   }

//   if (frenchTracks.style.display === 'flex') {
//     countryTracks.style.display = 'none';
//     nycTracks.style.display = 'none';
//     emoTracks.style.display = 'none';
//     altTracks.style.display = 'none';
//   }
// }