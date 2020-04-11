const key = `ff857fa088b6621a317ef9250f4f0771`;
const movieContainer = document.querySelector(".movie-container");
const movieInput = document.querySelector(".movie-input");
let detailBtn;

const gatherInfo = (event) => {
  console.log(event);
  if (event.keyCode === 13) {
    movieContainer.innerHTML = "";
    const query = movieInput.value;
    console.log(query);
    getData(query);
  }
};

const getData = async (name) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${name}`
  );
  const data = await response.json();
  data.results.map(async (movie) => {
    const posterInfo = await movie.poster_path;
    console.log(posterInfo);
    const posterUrl = await fetch(
      "https://image.tmdb.org/t/p/w300" + posterInfo
    );
    console.log(posterUrl, movie);
    await renderToDom(movie, posterUrl.url);
  });
};

const renderToDom = async (movie, posterUrl) => {
  const movieEl = document.createElement("div");
  movieEl.classList.add("movie");
  movieEl.innerHTML = `<img src="${posterUrl}" alt="movie" class="movie-banner">
    <div class="content">
        <p class="movie-title">${movie.title}</p>
        <a href="#" class="details-btn" onclick="setItem('${movie.id}')">movie details</a>`;
  movieContainer.appendChild(movieEl);
  //adding event listners to detailbtn', showDetails)
};
const setItem = (id) => {
  sessionStorage.setItem("id's", id);
  window.location = "movie.html";
};

const getItem = async () => {
  const id = sessionStorage.getItem("id's");
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`
  );
  const data = await response.json();
  const posterInfo = await data.poster_path;
  const poster = await fetch("https://image.tmdb.org/t/p/w300" + posterInfo);
  console.log(data, poster.url);
  renderMoveDetail(data, poster.url);
};
const renderMoveDetail = (data, url) => {
  movieContainer.innerHTML = "";
  //retreiving genres
  const genres = data.genres.map((genre) => {
    return genre.name;
  });
  //inserting element
  const el = document.createElement("div");
  el.classList.add("movie-details");
  el.innerHTML = `<div class="movie-information">
    <img src="${url}" alt="poster" class="detail-img">
    <div class="info">
      <h2 class="movie-title">${data.title}</h2>
      <div class="stats">
        <p class="movie-info">genre: &emsp;<span>${genres.join(", ")}</span></p>
        <p class="movie-info">release date: &emsp;<span>${
          data.release_date
        }</span></p>
        <p class="movie-info">budget: &emsp;$&nbsp;<span>${
          data.budget
        }</span></p>
        <p class="movie-info">revenue: &emsp;$&nbsp;<span>${
          data.revenue
        }</span></p>
        <p class="movie-info">PMDB rating: &emsp;<span>${
          data.vote_average
        }</span></p>
      </div>
    </div>
  </div>
  <div class="plot">
    <h2 class="plot-heading">plot</h2>
    <p class="plot-detail">${data.overview}</p>
    <a href="/21.movieDB/" class="back-btn">go back to search</a>
  </div>`;
  movieContainer.appendChild(el);
};

if (movieInput) {
  movieInput.addEventListener("keydown", gatherInfo);
}
