const header = document.querySelector(".header");
const menu = document.querySelector(".header__nav");
const menuBtn = document.querySelector(".header__menu-btn");
const navLinks = menu.querySelectorAll("a");
const sliderContainer = document.querySelector(".slider-container");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const footer = document.querySelector(".page-footer");
const footerAnchor = document.querySelector(".footer-anchor");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
  menuBtn.classList.toggle("open");
});

// Настройки слайдера
const sliderSpeed = 700; // скорость пролистывания в ms
const sliderDelay = 150; // скорость отклика на скролл в ms
slider.style.transition = `transform ${sliderSpeed}ms ease-out ${sliderDelay}ms`;
header.style.transition = `background-color 200ms ease-out ${
  sliderSpeed - 100
}ms`;

let currentSlide = 0;
let isScrolling = false;

// Настройки свайпа на тач устройствах
let startY = 0;
let endY = 0;
const swipeThreshold = 50; // необходимая длина свайпа для скролла на тач устройствах

function isSmallScreen() {
  return (
    window.matchMedia("(max-height: 660px)").matches &&
    window.matchMedia("(max-width: 800px)").matches
  );
}

function handleOrientationChange() {
  if (isSmallScreen()) {
    sliderContainer.classList.add("slider-off");
    document.body.classList.add("slider-off");
    slides.forEach((slide) => slide.classList.add("slider-off"));
    window.removeEventListener("wheel", handleScroll);
    slider.removeEventListener("touchend", handleTouch);
    slider.style.transform = `translateY(0)`;
  } else {
    sliderContainer.classList.remove("slider-off");
    document.body.classList.remove("slider-off");
    slides.forEach((slide) => slide.classList.remove("slider-off"));
    window.addEventListener("wheel", handleScroll);
    slider.addEventListener("touchend", handleTouch);
  }
}

window.addEventListener("resize", handleOrientationChange);
handleOrientationChange();

function handleScroll(e) {
  if (isScrolling) return; // debounce

  isScrolling = true;

  e.deltaY > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1);

  setTimeout(() => {
    isScrolling = false;
  }, 500);
}

slider.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

slider.addEventListener("touchmove", (e) => {
  endY = e.touches[0].clientY;
});

function handleTouch() {
  if (endY === 0) return;
  const deltaY = startY - endY;

  if (deltaY > swipeThreshold) {
    goToSlide(currentSlide + 1);
  } else if (deltaY < -swipeThreshold) {
    goToSlide(currentSlide - 1);
  }

  endY = 0;
}

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  if (index == 2 || index == 6) {
    header.classList.add("accent-bg");
  } else {
    header.classList.remove("accent-bg");
  }
  currentSlide = index;
  const offset = -currentSlide * 100;
  slider.style.transform = `translateY(${offset}vh)`;
}
