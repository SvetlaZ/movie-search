import './style.scss';
import { createBlock, createCard } from './modules/creator';
import mySwiper from './modules/mySwiper';

const imdbApiKey = 'секретный ключ'; // убрать в отдельный файл
const yandexTranslateKey = 'секретный ключ';

const searchUrl = (name, page) => `https://www.omdbapi.com/?s=${name}&page=${page}&apikey=${imdbApiKey}`; // берем id и totalresults
const getMovieUrl = (name) => `https://www.omdbapi.com/?i=${name}&apikey=${imdbApiKey}`; // берем title, poster, year, raiting
const input = document.querySelector('#search');
input.focus();
const numbCardsOnSlide = 1;
const resultLine = document.querySelector('.response');
const buttonNext = document.querySelector('.swiper-button-next');
const preloader = document.querySelector('.preloader');
const penultimateSlide = 5;
let page = 0;

const getMovies = async (name) => {
  const response = await fetch(searchUrl(name, page));
  const { Search, totalResults } = await response.json();

  if (name !== localStorage.getItem('response')) {
    mySwiper.virtual.removeAllSlides();
  }
  localStorage.setItem('response', name);

  if (totalResults) {
    resultLine.innerText = `${totalResults} response for this request.`;

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
    console.log('else: ', name);
    console.log('totaleResElse: ', totalResults);
    resultLine.innerText = 'No one result founded for this request.';
  }

  preloader.classList.remove('active');
};

function isCyrillic(text) {
  return /[а-я]/i.test(text);
}

async function getTranslate(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexTranslateKey}&text=${word}&lang=ru-en`;

  const res = await fetch(url);
  const data = await res.json();

  // console.log(data.text[0]);
  return data;
}

async function submitForm() {
  const request = input.value;
  let word = request;

  if (isCyrillic(request)) {
    const translateWord = await getTranslate(request);
    // console.dir(translateWord);
    word = translateWord.text[0];
    resultLine.innerText = `No one result founded for ${request}, search for ${word}`;
    resultLine.onclick = () => {
      input.value = word;
      page = 1;
      getMovies(word);
    };
    return;
  }

  page = 1;
  getMovies(word);
}

function getNextSlide() {
  console.log('active slide', mySwiper.activeIndex);
  const slideCount = document.querySelector('.swiper-wrapper').childElementCount;
console.log('slideCount', slideCount);
  if (slideCount - mySwiper.activeIndex <= penultimateSlide) {
    const request = input.value;
    page += 1;
    getMovies(request);
  }
}

document.querySelector('.form').onsubmit = (event) => {
  event.preventDefault();

  preloader.classList.add('active');
  submitForm();
};

buttonNext.onclick = () => getNextSlide();

const sl = document.querySelector('.swiper-wrapper');
sl.addEventListener('touchmove', () => getNextSlide());
