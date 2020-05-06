import './style.scss';
import createCard from './modules/creator';
import MySwiper from './modules/mySwiper';

const keyImdb = 'apikey=264bae6c';
const swiper = new MySwiper();
swiper.init();
async function getMovieCard(nameMovie) {
  const url = `https://www.omdbapi.com/?s=${nameMovie}&${keyImdb}`;

  fetch(url)
    .then((response) => response.json())
    .then(({ Search }) => {
      for (let i = 0; i < Search.length; i += 1) {
        if (i % 4 === 0) {
          swiper.createSlide();
        }
        const slide = swiper.getSlidecount();
        fetch(`https://www.omdbapi.com/?i=${Search[i].imdbID}&${keyImdb}`)
          .then((response) => response.json())
          .then((data) => {
            createCard(data.Title, data.Poster, data.Year, data.imdbRating, data.imdbID, slide);
          });
      }
    });
}

document.querySelector('.form').onsubmit = (event) => {
  event.preventDefault();
  swiper.removeSlides();
  const request = document.querySelector('#search').value;
  getMovieCard(request);
};

export default getMovieCard;
