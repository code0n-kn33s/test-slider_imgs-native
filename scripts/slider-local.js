const app = document.getElementById('slider-wrapper');
const sliderList = app.querySelector('.slider-list');
const progressBar = app.querySelector('.progress-bar');
const arrowLeft = app.querySelector('.arrow-left');
const arrowRight = app.querySelector('.arrow-right');

let currentIndex = 0;

function createSlider() {
  slides.forEach((slideData, index) => {
    const slide = document.createElement('div');
    slide.className = 'slider-item';
    if (index === 0) slide.classList.add('active');
    if (index === 1) slide.classList.add('next');
    if (index === slides.length - 1) slide.classList.add('prev');

    slide.innerHTML = `
      <img src="${slideData.image}" alt="Slide ${index + 1}">
      <div class="item-description">${slideData.content}</div>
    `;
    sliderList.appendChild(slide);
  });

  updateProgressBar();
}

function updateSlides() {
  const items = document.querySelectorAll('.slider-item');
  items.forEach((item, index) => {
    item.className = 'slider-item'; 
    if (index === currentIndex) {
      item.classList.add('active');
    } else if (index === (currentIndex + 1) % slides.length) {
      item.classList.add('next');
    } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
      item.classList.add('prev');
    }
  });

  updateProgressBar();
}

function updateProgressBar() {
  const progress = ((currentIndex + 1) / slides.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlides();
}

arrowRight.addEventListener('click', nextSlide);
arrowLeft.addEventListener('click', prevSlide);

createSlider();
