import './style.scss';
import { createBlock, createCard } from './modules/creator';
import mySwiper from './modules/mySwiper';

const imdbApiKey = '264bae6c'; // убрать в отдельный файл

const searchUrl = (name, page) => `https://www.omdbapi.com/?s=${name}&page=${page}&apikey=${imdbApiKey}`; // берем id и totalresults
const getMovieUrl = (name) => `https://www.omdbapi.com/?i=${name}&apikey=${imdbApiKey}`; // берем title, poster, year, raiting
const input = document.querySelector('#search');
input.focus();
const numbCardsOnSlide = 4;
const resultLine = document.querySelector('.response');
const buttonNext = document.querySelector('.swiper-button-next');
let page;

const getMovies = async (name) => {
  const response = await fetch(searchUrl(name, page));
  const { Search, totalResults } = await response.json();

  if (name !== localStorage.getItem('response')) {
    mySwiper.virtual.removeAllSlides();
  }
  localStorage.setItem('response', name);
  if (totalResults) {
    resultLine.innerText = `${totalResults} response for this request.`;
    // console.log('Search: ', Search.map((movie) => movie.imdbID));
    const movies = await Promise.all(
      Search.map((movie) => fetch(getMovieUrl(movie.imdbID))
        .then((movieResponse) => movieResponse.json())),
    );

    console.log('movies: ', movies);
    movies.forEach((movie) => {
      const lastSlide = document.querySelector('.swiper-slide:last-child');

      if (!lastSlide || lastSlide.childElementCount === numbCardsOnSlide) {
        mySwiper.appendSlide([
          '<div class="swiper-slide"></div>',
        ]);
      }
      return createCard(movie);
    });
  } else {
    resultLine.innerText = 'No one result founded for this request.';
  }

  // удалить прелоадер
};

document.querySelector('.form').onsubmit = (event) => {
  event.preventDefault();
  const preloader = document.querySelector('.preloader');
  preloader.classList.remove('hidden');
  const request = input.value;
  page = 1;
  getMovies(request);
};

buttonNext.onclick = () => {
  // добавить прелоадер
  console.log('active slide', mySwiper.activeIndex);
  const slideCount = document.querySelector('.swiper-wrapper').childElementCount;

  if (slideCount - mySwiper.activeIndex === 2) {
    const request = input.value;
    page += 1;
    getMovies(request);
  }
};

const sl = document.querySelector('.swiper-wrapper');
sl.addEventListener('touchmove', () => {
  // добавить прелоадер
  console.log('active slide', mySwiper.activeIndex);
  const slideCount = document.querySelector('.swiper-wrapper').childElementCount;

  if (slideCount - mySwiper.activeIndex === 2) {
    const request = input.value;
    page += 1;
    getMovies(request);
  }
});
