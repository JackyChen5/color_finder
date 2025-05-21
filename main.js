let button = document.getElementById('color-button');
let saveButton = document.getElementById('save-button');
let colorCodeText = document.getElementById('color-code');
let paletteContainer = document.getElementById('palette-container');

let currentColor = 'rgb(253, 77, 63)'; // default color

function colorValue() {
  return Math.floor(Math.random() * 256);
}

function generateRandomColor() {
  return 'rgb(' + colorValue() + ',' + colorValue() + ',' + colorValue() + ')';
}

function colorChange() {
  currentColor = generateRandomColor();
  document.getElementById('container').style.backgroundColor = currentColor;
  colorCodeText.textContent = `Color: ${currentColor}`;
}

function createSwatch(color) {
  let swatch = document.createElement('div');
  swatch.className = 'palette-swatch';
  swatch.style.backgroundColor = color;
  swatch.title = color;

  // Click to restore color
  swatch.addEventListener('click', function () {
    currentColor = color;
    document.getElementById('container').style.backgroundColor = currentColor;
    colorCodeText.textContent = `Color: ${currentColor}`;
  });

  paletteContainer.appendChild(swatch);
}

function saveColor() {
  let savedColors = JSON.parse(localStorage.getItem('savedColors')) || [];

  if (!savedColors.includes(currentColor)) {
    savedColors.push(currentColor);
    localStorage.setItem('savedColors', JSON.stringify(savedColors));
    createSwatch(currentColor);
  }
}

// Load saved colors on startup
function loadSavedColors() {
  let savedColors = JSON.parse(localStorage.getItem('savedColors')) || [];
  savedColors.forEach(color => createSwatch(color));
}

// Event Listeners
button.addEventListener('click', colorChange);
saveButton.addEventListener('click', saveColor);
window.addEventListener('load', loadSavedColors);
