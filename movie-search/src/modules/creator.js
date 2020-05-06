function createBlock(type, classname, innerText) {
  const newBlock = document.createElement(type);
  newBlock.classList.add(classname);
  newBlock.innerText = innerText;

  return newBlock;
}

// const swipperWrapper = document.querySelectorAll('.swiper-slide');
function createCard(title, poster, year, rating, id, slide) {
  const swipperWrapper = document.querySelector(`.swiper-slide.slide-${slide}`);
  const card = createBlock('div', 'card', '');
  swipperWrapper.append(card);

  const cardName = createBlock('a', 'card-name', title);
  cardName.href = `https://www.imdb.com/title/${id}/videogallery/`;
  card.append(cardName);

  const cardPoster = createBlock('div', 'card-poster', '');
  cardPoster.style = `background-image: url(${poster})`;
  card.append(cardPoster);

  const cardYear = createBlock('p', 'card-year', year);
  card.append(cardYear);

  const cardRaiting = createBlock('p', 'card-raiting', rating);
  card.append(cardRaiting);

  return card;
}

export default createCard;
