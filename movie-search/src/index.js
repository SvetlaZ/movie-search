import './style.scss';
import mySwiper from './modules/mySwiper';
import getMovies from './modules/movies';
import { isCyrillic, getTranslate } from './modules/translator';

const input = document.querySelector('#search');
input.focus();
const resultLine = document.querySelector('.response');
const buttonNext = document.querySelector('.swiper-button-next');
const preloader = document.querySelector('.preloader');
const penultimateSlide = 6;
let page = 0;

async function submitForm() {
  const request = input.value;

  if (isCyrillic(request)) {
    const translateWord = await getTranslate(request);
    const { text } = translateWord;
    resultLine.innerText = `No one result founded for ${request}, search for ${text[0]}`;
    preloader.classList.remove('active');
    resultLine.onclick = () => {
      [input.value] = text;
      page = 1;
      getMovies(text[0], page);
    };
    return;
  }

  page = 1;
  getMovies(request, page);
}

function getNextSlide() {
  const slideCount = document.querySelector('.swiper-wrapper').childElementCount;
  if (slideCount - mySwiper.activeIndex <= penultimateSlide) {
    const request = input.value;
    page += 1;
    getMovies(request, page);
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
sl.addEventListener('mouseup', () => getNextSlide());
