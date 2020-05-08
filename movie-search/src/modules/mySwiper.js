// import Swiper from 'swiper';

// function MySwiper() {
//   let slides = 0;
//   let swiper;

//   this.init = () => {
//     swiper = new Swiper('.swiper-container', {
//       direction: 'horizontal',
//       initialSlide: 1,

//       pagination: {
//         el: '.swiper-pagination',
//         dynamicBullets: true,
//         clickable: true,
//       },

//       navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       },
//     });

//     swiper.slideTo(-1);
//   };
//   this.createSlide = () => {
//     slides += 1;
//     swiper.appendSlide([`<div class="swiper-slide slide-${slides}"></div>`]);
//     swiper.update();
//     swiper.navigation.update();
//   };
//   this.removeSlides = () => {
//     slides = 0;
//     swiper.removeAllSlides();
//   };
//   this.getSlidecount = () => slides;
// }
// export default MySwiper;

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

export default mySwiper;
