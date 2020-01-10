const directionsModal = document.getElementById("directions-modal")
const modalButton = document.getElementById('modal-btn');
const loveNasButton = document.getElementById('love-nas');
const hateNasButton = document.getElementById('hate-nas');
const closeDirectionsBtn = document.getElementById('directions-close');
const loveNasModal = document.getElementById('love-nas-modal');
const hateNasModal = document.getElementById('hate-nas-modal');
const closeLoveBtn = document.getElementById('close-love-nas');
const closeHateBtn = document.getElementById('close-hate-nas');
// const uploadBtn = document.getElementById('thefile');
const nasTracks = document.getElementById('nas-tracks');

modalButton.addEventListener('click', openDirectionsModal);

closeDirectionsBtn.addEventListener('click', closeDirectionsModal);

function openDirectionsModal() {
  directionsModal.style.display = "block";
}

function closeDirectionsModal() {
  directionsModal.style.display = "none";
}

loveNasButton.addEventListener('click', openLoveModal);

closeLoveBtn.addEventListener('click', closeLoveModal);

function openLoveModal() {
  loveNasModal.style.display = 'block';
  directionsModal.style.display = "none";
}

function closeLoveModal() {
  loveNasModal.style.display = 'none';
}

hateNasButton.addEventListener('click', openHateModal);

closeHateBtn.addEventListener('click', closeHateModal);

function openHateModal() {
  hateNasModal.style.display = 'block';
  directionsModal.style.display = "none";
}

function closeHateModal() {
  hateNasModal.style.display = 'none';
}

// uploadBtn.addEventListener('click', hideNasTracks);

// function hideNasTracks() {
//   nasTracks.style.display = 'none';
// }

