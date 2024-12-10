let slides = []; 

function lazyLoadImages() {
    const lazyImages = document.querySelectorAll("img.lazy:not(.loaded)"); 
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const dataSrc = img.getAttribute("data-src");

                if (dataSrc) {
                    img.src = dataSrc;
                    img.onload = () => img.classList.add("loaded");
                    img.removeAttribute("data-src");
                } else {
                    console.warn("data-src отсутствует для изображения:", img);
                }

                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((img) => observer.observe(img));
}

function fetchSlides() {
    return fetch("https://raw.githubusercontent.com/code0n-kn33s/json-storage-image-slider/main/slider-images.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки JSON");
            }
            return response.json();
        })
        .then((data) => {
            slides = data.filter((slide) => slide.image); 
            document.dispatchEvent(new Event("slidesLoaded")); 
        })
        .catch((error) => {
            console.error("Ошибка загрузки JSON:", error);
        });
}

fetchSlides();
