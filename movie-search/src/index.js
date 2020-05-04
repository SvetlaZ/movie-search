import './style.scss';
import Swiper from 'swiper';

const mySwiper = new Swiper('.swiper-container', {

  direction: 'horizontal',
  loop: true,

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

mySwiper.appendSlide([
  '<div class="swiper-slide">Slide 1</div>',
  '<div class="swiper-slide">Slide 2</div>',
]);

async function getMovieTitle(nameMovie) {
  const url = `https://www.omdbapi.com/?s=${nameMovie}&apikey=264bae6c`;

  const res = await fetch(url);
  const data = await res.json();

  // console.log(data.Search[0].Title);
  console.log(data.Search[0].Poster);
  console.log(data.Search);

  return data;
}


getMovieTitle('cat');
