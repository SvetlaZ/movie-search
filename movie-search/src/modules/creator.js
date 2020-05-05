import mySwiper from './mySwiper';

function createBlock(type, classname, innerText) {
  const newBlock = document.createElement(type);
  newBlock.classList.add(classname);
  newBlock.innerText = innerText;

  return newBlock;
}

const swipperWrapper = document.querySelector('.slide-1');
function createCard(title, poster, year, rating) {
  const card = createBlock('div', 'card', '');
  swipperWrapper.append(card);

  const cardName = createBlock('p', 'card-name', title);
  card.append(cardName);

  const cardPoster = createBlock('div', 'card-poster', '');
  cardPoster.style = `background-image: url(${poster})`;
  card.append(cardPoster);

  const cardYear = createBlock('p', 'card-year', year);
  card.append(cardYear);

  const cardRaiting = createBlock('p', 'card-raiting', rating);
  card.append(cardRaiting);
}

export default createCard;
