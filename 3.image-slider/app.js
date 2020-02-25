const image = document.querySelector(".image");
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");

// const images = [
//   "assests/image-1.jpeg",
//   "assests/image-2.jpeg",
//   "assests/image-3.jpeg",
//   "assests/image-4.jpeg"
// ];

let counter = 1;

const nextImageHandler = () => {
  if (counter < 4) {
    counter++;
    image.setAttribute("src", `assests/image-${counter}.jpeg`);
  } else {
    counter = 1;
    image.setAttribute("src", `assests/image-${counter}.jpeg`);
  }
};

const previousImageHandler = () => {
  if (counter > 1) {
    counter--;
    image.setAttribute("src", `assests/image-${counter}.jpeg`);
  } else if (counter === 1) {
    counter = 4;
    image.setAttribute("src", `assests/image-${counter}.jpeg`);
  }
};
nextBtn.addEventListener("click", nextImageHandler);
previousBtn.addEventListener("click", previousImageHandler);
//COMPLETED
