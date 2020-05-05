import Swiper from 'swiper';

const mySwiper = new Swiper('.swiper-container', {

  direction: 'horizontal',
  // loop: true,
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
});

mySwiper.slideTo(-1);

mySwiper.appendSlide([
  '<div class="swiper-slide slide-1"></div>',
  '<div class="swiper-slide slide-2"></div>',
  '<div class="swiper-slide slide-3"></div>',
  '<div class="swiper-slide slide-4"></div>',
  '<div class="swiper-slide slide-5"></div>',
]);

export default mySwiper;
