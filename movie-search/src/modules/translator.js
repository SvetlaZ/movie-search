const yandexTranslateKey = 'trnsl.1.1.20200509T065852Z.8635de9c4dce3366.47623063bd42b2a26fdd2ccec306d80f47d3ad12';

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

export { isCyrillic, getTranslate };
