// const section1 = document.querySelector('.section1');
// const section2 = document.querySelector('.section2');
// const section3 = document.querySelector('.section3');
// const section4 = document.querySelector('.section4');

// const container = document.querySelector('.corusel');
// const images = Array.from(document.querySelectorAll('.corusel-img'));
// const next = document.querySelector('.next');
// const prev = document.querySelector('.prev');
// let counter = 0;
// let size = images[0].clientWidth;

// container.style.transform = 'translateX('+ (-size * counter) +'px)';

// const nextSlideHandler = ()=>{
//     console.log('next clicked');
//     if(counter < images.length){
//         container.style.transform = 'translateX('+ (-size * counter) +'px)';
//         counter++
//     }else{
//         counter = 0
//     }
// }

// next.addEventListener('click', nextSlideHandler);

const container = document.querySelector(".track");
const pages = Array.from(document.querySelectorAll("section"));
const next = document.querySelector(".next");
let counter = 0;
let size = pages[0].clientWidth;

container.style.transform = "translateX(" + -size * counter + "px)";

setInterval(() => {
  if (counter < pages.length - 1) {
    counter++;
    container.style.transform = "translateX(" + -size * counter + "px)";
  } else {
    counter = -1;
  }
}, 2000);
