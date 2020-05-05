import './style.scss';
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

// в отдельный модуль
function createBlock(type, classname, innerText) {
  const newBlock = document.createElement(type);
  newBlock.classList.add(classname);
  newBlock.innerText = innerText;

  return newBlock;
}

const swipperWrapper = document.querySelector('.slide-1');
// swipperWrapper = document.querySelector('.slide-2');


// в отдельный модуль
function createCard(title, poster, year, rating) {
  const card = createBlock('div', 'card', '');
  swipperWrapper.append(card);

  const cardName = createBlock('p', 'card-name', title);
  card.append(cardName);

  const cardPoster = createBlock('div', 'card-poster', '');
  cardPoster.style = `background-image: url(${poster})`;
  card.append(cardPoster);

  const cardYear = createBlock('p', 'card-year', year);
  card.append(cardYear);

  const cardRaiting = createBlock('p', 'card-raiting', rating);
  card.append(cardRaiting);

  mySwiper.update();
  mySwiper.navigation.update();
}

async function getMovieTitle(nameMovie) {
  const url = `https://www.omdbapi.com/?s=${nameMovie}&apikey=264bae6c`;

  fetch(url)
    .then((response) => response.json())
    .then(({ Search }) => {
      console.log(Search);
      fetch(`https://www.omdbapi.com/?i=${Search[0].imdbID}&apikey=264bae6c`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.Title);
          console.log(data.Year);
          console.log(data.Poster);
          console.log(data.imdbRating);
          createCard(data.Title, data.Poster, data.Year, data.imdbRating);
        });
    });

// mySwiper.appendSlide([
//   `<div class="swiper-slide">${data.Search[0].Title}</div>`,
// ]);
}

// const request = document.querySelector('#search').value;
getMovieTitle('love');
