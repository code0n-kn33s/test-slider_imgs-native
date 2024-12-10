document.addEventListener("DOMContentLoaded", () => {
    const popupOverlay = document.getElementById("popup-overlay");
    const popupContent = document.querySelector(".popup-images");
    const closeButton = document.querySelector(".popup-close-button");
    const allSolutionsButton = document.querySelector(".progress-bar-button");

    function createPopup() {
        popupContent.innerHTML = ""; 

        if (!slides.length) {
            console.error("Данные еще не загружены, невозможно открыть попап");
            return;
        }

        slides.forEach((slide, index) => {
            console.log("Создание элемента для попапа:", slide);

            if (slide.image) {
                const itemElement = document.createElement("div");
                itemElement.classList.add("popup-item");

                itemElement.innerHTML = `
                    <img class="lazy" data-src="${slide.image}" alt="Slide ${index + 1}">
                    <div class="slider-item-footer">
                        <div class="slider-item-text">
                            <div class="slider-item-title">${slide.title}</div>
                            <div class="slider-item-description">${slide.content}</div>
                        </div>
                        <div class="slider-item-button">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.6943 3.33095L1.53124 3.33095L1.53124 0.498047L18.5307 0.498048L18.5307 17.4975L15.6978 17.4975L15.6978 5.33442L2.50292 18.5293L0.499451 16.5258L13.6943 3.33095Z" />
                            </svg>
                        </div>
                    </div>
                `;
                popupContent.appendChild(itemElement);
            } else {
                console.warn("Пропущен слайд с некорректным изображением:", slide);
            }
        });

        lazyLoadImages();

        popupOverlay.classList.add("active");
        console.log("Попап открыт с элементами:", popupContent.querySelectorAll(".popup-item"));
    }

    function closePopup() {
        popupOverlay.classList.remove("active");
    }

    allSolutionsButton.addEventListener("click", createPopup);
    
    closeButton.addEventListener("click", closePopup);
    
    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    document.addEventListener("slidesLoaded", () => {
        console.log("Попап готов к созданию");
    });
});
