function createBlock(type, classname, innerText) {
  const newBlock = document.createElement(type);
  newBlock.classList.add(classname);
  newBlock.innerText = innerText;

  return newBlock;
}

function createImage(src, classname) {
  const newImage = document.createElement('img');
  newImage.src = src;
  newImage.classList.add(classname);

  newImage.onerror = () => {
    newImage.src = './src/picture/poster.jpg';
    return newImage.src;
  };

  return newImage;
}

function createCard(movie) {
  const {
    Title,
    Poster,
    Year,
    imdbRating,
    imdbID,
  } = movie;
  const lastSlide = document.querySelector('.swiper-slide:last-child');
  const card = createBlock('div', 'card', '');
  lastSlide.append(card);

  const cardName = createBlock('a', 'card-name', Title);
  cardName.href = `https://www.imdb.com/title/${imdbID}/videogallery/`;
  cardName.target = '_blank';
  card.append(cardName);


  // const cardPoster = createBlock('div', 'card-poster', '');
  // if (Poster !== 'N/A') {
  //   cardPoster.style = `background-image: url(${Poster});`;
  // }
  const cardPoster = createImage(`${Poster}`, 'card-poster');
  if (Poster === 'N/A') {
    cardPoster.src = './src/picture/poster.jpg';
    console.log(cardPoster.src);
  }
  card.append(cardPoster);

  const cardYear = createBlock('p', 'card-year', Year);
  card.append(cardYear);

  const cardRaiting = createBlock('p', 'card-raiting', `IMDB Rating: ${imdbRating}`);
  card.append(cardRaiting);
}

export { createBlock, createCard };
