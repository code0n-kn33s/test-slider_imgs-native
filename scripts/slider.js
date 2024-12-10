document.addEventListener('DOMContentLoaded', () => {
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

              <img class="lazy" data-src="${slideData.image}" alt="Slide ${index + 1}">
              <div class="slider-item-footer">
                <div class="slider-item-text">
                  <div class="slider-item-title">${slideData.title}</div>
                  <div class="slider-item-description">${slideData.content}</div>
                </div>
                <div class="slider-item-button">  
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.6943 3.33095L1.53124 3.33095L1.53124 0.498047L18.5307 0.498048L18.5307 17.4975L15.6978 17.4975L15.6978 5.33442L2.50292 18.5293L0.499451 16.5258L13.6943 3.33095Z" />
                  </svg>
                </div>
              </div>

          `;
          sliderList.appendChild(slide);
      });

      lazyLoadImages();
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

  document.addEventListener('slidesLoaded', createSlider);
});
