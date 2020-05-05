import './style.scss';
import mySwiper from './modules/mySwiper';
import createCard from './modules/creator';

async function getMovieCard(nameMovie) {
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
          mySwiper.update();
          mySwiper.navigation.update();
        });
    });

// mySwiper.appendSlide([
//   `<div class="swiper-slide">${data.Search[0].Title}</div>`,
// ]);
}

// const request = document.querySelector('#search').value;
getMovieCard('love');
