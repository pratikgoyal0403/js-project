const testimonialDiv = document.querySelector(".testimonial");
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");
let counter = 0;

function Testimonial(profileImgUrl, name, stars, about) {
  this.profileImgUrl = profileImgUrl;
  this.name = name;
  this.stars = stars;
  this.about = about;
}

const clientsArray = [
  new Testimonial(
    "../image-slider/assests/image-1.jpeg",
    "pratik",
    "4/5",
    "i am a good hardworking and social person"
  ),
  new Testimonial(
    "../image-slider/assests/image-3.jpeg",
    "prateek",
    "4/5",
    "i am a good hardworking and social person"
  ),
  new Testimonial(
    "../image-slider/assests/image-2.jpeg",
    "priyam",
    "5/5",
    "i am a good hardworking and social person"
  )
];

const nextBtnHandler = () => {
  if (counter < 2) {
    counter++;
    render();
  } else {
    counter = 0;
    render();
  }
};
const previousBtnHandler = () => {
  if (counter >= 1) {
    counter--;
    render();
  } else {
    counter = 2;
    render();
  }
};

const render = () => {
  const renderObject = clientsArray[counter];
  const html = `
        <div class="img">
        <img
          src="${renderObject.profileImgUrl}"
          class="profile-image"
        />
      </div>
      <h2 class="name-heading">${renderObject.name}</h2>
      <h5 class="stars">${renderObject.stars}</h5>
      <p class="about">${renderObject.about}</p>
      `;
  testimonialDiv.innerHTML = html;
};
render();

nextBtn.addEventListener("click", nextBtnHandler);
previousBtn.addEventListener("click", previousBtnHandler);
//COMPLETED
