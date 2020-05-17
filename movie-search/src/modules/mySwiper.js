import Swiper from 'swiper';

const mySwiper = new Swiper('.swiper-container', {

  direction: 'horizontal',
  simulateTouch: true,
  allowSlideNext: true,
  centerInsufficientSlides: true,
  grabCursor: true,
  initialSlide: 1,

  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    960: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
  },
});

export default mySwiper;
