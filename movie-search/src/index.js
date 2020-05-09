import './style.scss';
import { createBlock, createCard } from './modules/creator';
import mySwiper from './modules/mySwiper';

const imdbApiKey = 'секретный ключ'; // убрать в отдельный файл
const yandexTranslateKey = 'секретный ключ';

const searchUrl = (name, page) => `https://www.omdbapi.com/?s=${name}&page=${page}&apikey=${imdbApiKey}`; // берем id и totalresults
const getMovieUrl = (name) => `https://www.omdbapi.com/?i=${name}&apikey=${imdbApiKey}`; // берем title, poster, year, raiting
const input = document.querySelector('#search');
input.focus();
const numbCardsOnSlide = 4;
const resultLine = document.querySelector('.response');
const buttonNext = document.querySelector('.swiper-button-next');
const preloader = document.querySelector('.preloader');
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
  } else if (!isCyrillic(name)) {
    console.log(name);
    resultLine.innerText = 'No one result founded for this request.';
    preloader.classList.add('hidden');
  }
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
  preloader.classList.remove('hidden');
  const request = input.value;
  let word = request;

  if (isCyrillic(request)) {
    const translateWord = await getTranslate(request);
    // console.dir(translateWord);
    word = translateWord.text[0];
    resultLine.innerText = `No one result founded for ${request}, search for ${word}`;
    // preloader.classList.add('hidden');
    resultLine.onclick = () => {
      input.value = word;
      getMovies(word);
    };
    return;
  }

  page = 1;
  getMovies(word);
}

document.querySelector('.form').onsubmit = (event) => {
  event.preventDefault();
  submitForm();
};

buttonNext.onclick = () => {
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
  console.log('active slide', mySwiper.activeIndex);
  const slideCount = document.querySelector('.swiper-wrapper').childElementCount;

  if (slideCount - mySwiper.activeIndex === 2) {
    const request = input.value;
    page += 1;
    getMovies(request);
  }
});
