const select = document.querySelector("#background-color");
const body = document.querySelector("body");
const btn = document.querySelector(".apply");
const backgroundColorDiv = document.querySelector(".background-colors");

const changeBackgroundColor = () => {
  const selectedColor = select.options[select.selectedIndex].value;
  body.style.backgroundColor = selectedColor;
};

const changeBgColor = e => {
  const color = e.target.className.split(" ")[0];
  body.style.backgroundColor = color;
};

btn.addEventListener("click", changeBackgroundColor);
backgroundColorDiv.addEventListener("click", changeBgColor);
