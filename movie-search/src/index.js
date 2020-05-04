import './style.scss';

async function getMovieTitle(nameMovie) {
  const url = `https://www.omdbapi.com/?s=${nameMovie}&apikey=264bae6c`;

  const res = await fetch(url);
  const data = await res.json();

  // console.log(data.Search[0].Title);
  console.log(data.Search);

  return data;
}

async function getPoster(nameMovie) {
  const url = `https://img.omdbapi.com/?s=${nameMovie}&apikey=264bae6c`;

  const res = await fetch(url);
  const data = await res.json();

  // console.log(data.Search[0].Title);

  
  console.log(data.Search);

  return data;
}

getMovieTitle('cat');
