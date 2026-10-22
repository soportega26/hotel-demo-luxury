// =========================================================
// 1. CARRUSEL DE IMÁGENES DE PORTADA (INICIO HERO)
// =========================================================
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;

    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    function nextSlide() {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }

    if (slides.length > 1) {
        setInterval(nextSlide, 4000);
    }
    
    // Iniciar carruseles de habitaciones y rotaciones automáticas
    startAutoRoomSliders();
});


// =========================================================
// 2. FUNCIÓN PRINCIPAL DE CAMBIO DE VISTA SPA
// =========================================================
function showView(viewName) {
    const views = document.querySelectorAll('.page-view');
    views.forEach(v => {
        v.style.display = 'none';
        v.classList.remove('active-view');
    });

    // Actualiza los enlaces del menú institucional
    document.querySelectorAll('.nav-links-row a').forEach(a => a.classList.remove('active'));

    // Muestra la vista seleccionada de forma limpia
    const targetView = document.getElementById('view-' + viewName);
    const targetNav = document.getElementById('nav-' + viewName);

    if (targetView) {
        targetView.style.display = 'block';
        targetView.classList.add('active-view');
    }
    if (targetNav) {
        targetNav.classList.add('active');
    }

    // Comportamientos específicos por vista
    if (viewName === 'habitaciones') {
        if (typeof switchRoomTab === 'function') {
            switchRoomTab('casa-marina');
        }
    }

    // Asegura visibilidad constante del footer
    const mainFooter = document.querySelector('.main-footer');
    if (mainFooter) {
        mainFooter.style.display = 'block';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleScrollReveal(); 
}


// =========================================================
// 3. SELECTOR DE IDIOMA FUNCIONAL (ES / EN)
// =========================================================
const translations = {
    es: {
        inicio: "INICIO",
        habitaciones: "HABITACIONES",
        restaurantes: "RESTAURANTES",
        galeria: "GALERÍA",
        noticias: "NOTICIAS",
        reservaBtn: "VER DISPONIBILIDAD",
        heroTitle: "Descubre una mezcla de nuestros Hoteles",
        lblResort: "Resort / Hotel",
        lblFechas: "LLegada - Salida",
        lblHuespedes: "Huéspedes"
    },
    en: {
        inicio: "HOME",
        habitaciones: "ROOMS",
        restaurantes: "DINING",
        galeria: "GALLERY",
        noticias: "NEWS",
        reservaBtn: "CHECK AVAILABILITY",
        heroTitle: "Discover a blend of our Hotels",
        lblResort: "Resort / Hotel",
        lblFechas: "Check in - Check out",
        lblHuespedes: "Guests"
    }
};

function changeLanguage(lang) {
    if (!translations[lang]) return;

    const navInicio = document.getElementById('nav-inicio');
    const navHabitaciones = document.getElementById('nav-habitaciones');
    const navRestaurantes = document.getElementById('nav-restaurantes');
    const navGaleria = document.getElementById('nav-galeria');
    const navNoticias = document.getElementById('nav-noticias');
    const heroTitle = document.getElementById('hero-title');
    const heroBtn = document.getElementById('hero-btn');
    const btnSearchText = document.getElementById('btn-search-text');

    if (navInicio) navInicio.textContent = translations[lang].inicio;
    if (navHabitaciones) navHabitaciones.textContent = translations[lang].habitaciones;
    if (navRestaurantes) navRestaurantes.textContent = translations[lang].restaurantes;
    if (navGaleria) navGaleria.textContent = translations[lang].galeria;
    if (navNoticias) navNoticias.textContent = translations[lang].noticias;
    if (heroTitle) heroTitle.textContent = translations[lang].heroTitle;
    if (heroBtn) heroBtn.textContent = translations[lang].reservaBtn;
    if (btnSearchText) btnSearchText.textContent = translations[lang].reservaBtn;
}


// =========================================================
// 4. ANIMACIÓN SCROLL REVEAL
// =========================================================
function handleScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    const windowHeight = window.innerHeight;

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 80) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScrollReveal);
window.addEventListener('load', handleScrollReveal);


// =========================================================
// 5. GESTIÓN DE PESTAÑAS Y CARRUSELES DE HABITACIONES
// =========================================================
function switchRoomTab(tabName) {
    const tabCasaMarina = document.getElementById('tab-casa-marina');
    const tabSelectAdults = document.getElementById('tab-select-adults');
    const buttons = document.querySelectorAll('.rooms-tabs .tab-btn');

    if (tabCasaMarina) tabCasaMarina.style.display = 'none';
    if (tabSelectAdults) tabSelectAdults.style.display = 'none';
    buttons.forEach(btn => btn.classList.remove('active'));

    if (tabName === 'casa-marina') {
        if (tabCasaMarina) tabCasaMarina.style.display = 'block';
        if (buttons[0]) buttons[0].classList.add('active');
    } else if (tabName === 'select-adults') {
        if (tabSelectAdults) tabSelectAdults.style.display = 'block';
        if (buttons[1]) buttons[1].classList.add('active');
    }

    setTimeout(startAutoRoomSliders, 200);
}

function moveRoomSlide(buttonElement, direction) {
    const sliderContainer = buttonElement.parentElement.querySelector('.mini-slider-container');
    if (!sliderContainer) return;
    
    const images = sliderContainer.querySelectorAll('.slider-img');
    if (images.length === 0) return;

    let currentIndex = -1;
    images.forEach((img, index) => {
        if (img.classList.contains('active')) {
            currentIndex = index;
            img.classList.remove('active');
        }
    });

    let newIndex = (currentIndex + direction + images.length) % images.length;
    images[newIndex].classList.add('active');
}

function startAutoRoomSliders() {
    const sliders = document.querySelectorAll('.select-room-slider');
    
    sliders.forEach(slider => {
        if (slider.dataset.hasInterval) return;
        slider.dataset.hasInterval = "true";

        setInterval(() => {
            if (slider.offsetWidth > 0 && slider.offsetHeight > 0) {
                const images = slider.querySelectorAll('.slider-img');
                if (images.length <= 1) return;

                let currentIndex = -1;
                images.forEach((img, index) => {
                    if (img.classList.contains('active')) {
                        currentIndex = index;
                        img.classList.remove('active');
                    }
                });

                let nextIndex = (currentIndex + 1) % images.length;
                images[nextIndex].classList.add('active');
            }
        }, 3800);
    });
}


// =========================================================
// 6. VENTANA LIGHTBOX Y UTILIDADES
// =========================================================
function openLightbox(imgSrc, captionText) {
    const modal = document.getElementById('imageLightbox');
    const modalImg = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    if (modal && modalImg && caption) {
        modal.style.display = 'flex';
        modalImg.src = imgSrc;
        caption.textContent = captionText;
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const modal = document.getElementById('imageLightbox');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function toggleNewsReadMore(btn) {
    const extraText = document.getElementById('extraNewsText');
    if (extraText) {
        if (extraText.style.display === 'none' || extraText.style.display === '') {
            extraText.style.display = 'block';
            btn.innerHTML = 'Leer menos <i class="fa-solid fa-arrow-up"></i>';
        } else {
            extraText.style.display = 'none';
            btn.innerHTML = 'Leer más <i class="fa-solid fa-arrow-right"></i>';
        }
    }
}

function navigateToHabitaciones(event) {
    if (event) event.preventDefault();
    showView('habitaciones');
}


// =========================================================
// 7. SHOWCASES DE INICIO (HABITACIONES Y RESTAURANTES)
// =========================================================
let currentShowcaseIndex = 0;
function moveShowcaseSlide(direction) {
    const slides = document.querySelectorAll('.showcase-slide');
    if (slides.length === 0) return;

    slides[currentShowcaseIndex].classList.remove('active');
    currentShowcaseIndex = (currentShowcaseIndex + direction + slides.length) % slides.length;
    slides[currentShowcaseIndex].classList.add('active');
}

let currentDiningIndex = 0;
function moveDiningSlide(direction) {
    const slides = document.querySelectorAll('.dining-slide');
    if (slides.length === 0) return;

    slides[currentDiningIndex].classList.remove('active');
    currentDiningIndex = (currentDiningIndex + direction + slides.length) % slides.length;
    slides[currentDiningIndex].classList.add('active');
}

// Temporizadores automáticos para los banners de inicio
setInterval(() => {
    const showcaseSection = document.querySelector('.rooms-showcase-section');
    if (showcaseSection && showcaseSection.offsetWidth > 0) {
        moveShowcaseSlide(1);
    }
}, 5000);

setInterval(() => {
    const diningSection = document.querySelector('.dining-showcase-section');
    if (diningSection && diningSection.offsetWidth > 0) {
        moveDiningSlide(1);
    }
}, 6000);

// =========================================================
// CAMBIO DE PESTAÑAS Y CARRUSEL DE GALERÍA DIVIDIDA
// =========================================================

function switchGalleryTab(tabName) {
    const tabCasa = document.getElementById('gallery-tab-casa-marina');
    const tabSelect = document.getElementById('gallery-tab-select-adults');
    const buttons = document.querySelectorAll('.gallery-tabs-container .gallery-tab-btn');

    buttons.forEach(btn => btn.classList.remove('active'));

    if (tabName === 'casa-marina') {
        if (tabCasa) tabCasa.style.display = 'block';
        if (tabSelect) tabSelect.style.display = 'none';
        if (buttons[0]) buttons[0].classList.add('active');
    } else if (tabName === 'select-adults') {
        if (tabCasa) tabCasa.style.display = 'none';
        if (tabSelect) tabSelect.style.display = 'block';
        if (buttons[1]) buttons[1].classList.add('active');
    }
}

// Control del carrusel por cada pestaña activa
function moveGalleryHeroSlide(direction, galleryType) {
    const selector = (galleryType === 'casa') 
        ? '#gallery-tab-casa-marina .hero-carousel-img' 
        : '#gallery-tab-select-adults .hero-carousel-img';
        
    const images = document.querySelectorAll(selector);
    if (images.length === 0) return;

    let currentIndex = -1;
    images.forEach((img, idx) => {
        if (img.classList.contains('active')) {
            currentIndex = idx;
            img.classList.remove('active');
        }
    });

    let nextIndex = (currentIndex + direction + images.length) % images.length;
    images[nextIndex].classList.add('active');
}
function toggleNewsContent(contentId, btnElement) {
    const content = document.getElementById(contentId);
    if (!content) return;

    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        btnElement.querySelector('span').innerText = 'MOSTRAR MENOS';
        btnElement.querySelector('i').className = 'fa-solid fa-chevron-up';
    } else {
        content.style.display = 'none';
        btnElement.querySelector('span').innerText = 'LEER COMUNICADO COMPLETO';
        btnElement.querySelector('i').className = 'fa-solid fa-chevron-down';
    }
}