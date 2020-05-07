import './style.scss';
import { createBlock, createCard } from './modules/creator';
// import MySwiper from './modules/mySwiper';

const imdbApiKey = '264bae6c'; // убрать в отдельный файл

const searchUrl = (name) => `https://www.omdbapi.com/?apikey=${imdbApiKey}&s=${name}`; // берем id и totalresults
const getMovieUrl = (name) => `https://www.omdbapi.com/?apikey=${imdbApiKey}&i=${name}`; // берем title, poster, year, raiting

const getMovies = async (name) => {
  const response = await fetch(searchUrl(name));
  const { Search, totalResults } = await response.json();

  const respTotalResults = createBlock('p', 'responce', `${totalResults} responce for this request.`);
  document.querySelector('form').after(respTotalResults);
  // console.log('Search: ', Search.map((movie) => movie.imdbID));

  const movies = await Promise.all(
    Search.map((movie) => fetch(getMovieUrl(movie.imdbID), { json: true })
      .then((movieResponse) => movieResponse.json())),
  );

  console.log('movies: ', movies);
  movies.forEach((movie) => createCard(movie));
};

getMovies('dog');
// export default getMovieCard;
