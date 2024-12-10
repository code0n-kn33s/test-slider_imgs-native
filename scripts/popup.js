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

        
        slides.forEach((slide) => {
            console.log("Создание изображения для попапа:", slide);

            if (slide.image) {
                const imgElement = document.createElement("img");
                imgElement.classList.add("lazy");
                imgElement.setAttribute("data-src", slide.image); 
                imgElement.alt = slide.title || "Solution Image";
                popupContent.appendChild(imgElement);
            } else {
                console.warn("Пропущен слайд с некорректным изображением:", slide);
            }
        });

        
        lazyLoadImages();

        
        popupOverlay.classList.add("active");
        console.log("Попап открыт с изображениями:", popupContent.querySelectorAll("img"));
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
