import { createCard } from './creator';
import mySwiper from './mySwiper';

const imdbApiKey = '36d4f25d';
const searchUrl = (name, page) => `https://www.omdbapi.com/?s=${name}&page=${page}&apikey=${imdbApiKey}`;
const getMovieUrl = (name) => `https://www.omdbapi.com/?i=${name}&apikey=${imdbApiKey}`;
const numbCardsOnSlide = 1;
const resultLine = document.querySelector('.response');
const preloader = document.querySelector('.preloader');

const getMovies = async (name, page) => {
  try {
    const response = await fetch(searchUrl(name, page));
    const {
      Search,
      totalResults,
      Error,
      Response,
    } = await response.json();

    if (name !== localStorage.getItem('response') && Response) {
      mySwiper.virtual.removeAllSlides();
    }
    localStorage.setItem('response', name);

    if (Error) {
      resultLine.innerText = Error;
    } else if (totalResults) {
      resultLine.innerText = `${totalResults} response for this request.`;

      const movies = await Promise.all(
        Search.map((movie) => fetch(getMovieUrl(movie.imdbID))
          .then((movieResponse) => movieResponse.json())),
      );

      movies.forEach((movie) => {
        const lastSlide = document.querySelector('.swiper-slide:last-child');

        if (!lastSlide || lastSlide.childElementCount === numbCardsOnSlide) {
          mySwiper.appendSlide([
            '<div class="swiper-slide"></div>',
          ]);
        }
        return createCard(movie);
      });
    }
    preloader.classList.remove('active');
  } catch (e) {
    resultLine.innerText = 'Sorry, something went wrong';
    if (e.message === 'Failed to fetch') {
      resultLine.innerText = 'Please, check your internet connection';
    }
    preloader.classList.remove('active');
  }
};

export default getMovies;
