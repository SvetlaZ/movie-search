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

const getMovies = async (name) => {
  const page = document.querySelectorAll('.card').length / 10 + 1;
  const response = await fetch(searchUrl(name, page));
  const { Search, totalResults } = await response.json();

  if (totalResults) {
    mySwiper.virtual.removeAllSlides();
    resultLine.innerText = `${totalResults} response for this request.`;
    // console.log('Search: ', Search.map((movie) => movie.imdbID));

    const movies = await Promise.all(
      Search.map((movie) => fetch(getMovieUrl(movie.imdbID), { json: true })
        .then((movieResponse) => movieResponse.json())),
    );

    console.log('movies: ', movies);
    movies.forEach((movie) => {
      const lastSlide = document.querySelector('.swiper-slide:last-child');

      if (lastSlide === null || lastSlide.childElementCount === numbCardsOnSlide) {
        mySwiper.appendSlide([
          '<div class="swiper-slide"></div>',
        ]);
        mySwiper.update();
      }
      return createCard(movie);
    });
  } else {
    resultLine.innerText = 'No one result founded for this request.';
  }
};


document.querySelector('.form').onsubmit = (event) => {
  event.preventDefault();
  const request = input.value;

  getMovies(request);
};

// export default getMovieCard;
