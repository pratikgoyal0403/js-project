const shoppingCart = document.querySelector(".cart");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const itemBubble = shoppingCart.querySelector("span");
const productWrapper = document.querySelector(".wrapper");
const cartWrapper = document.querySelector(".cart-items");
const searchIcon = document.querySelector('.fa-search');
const input = document.querySelector('.search');
let deleteCartItem;

class Product {
  constructor(imgSrc, productName, price) {
    this.src = imgSrc;
    this.productName = productName;
    this.price = price;
  }
}
const products = [
  new Product("../3.image-slider/assests/image-1.jpeg", "BMW S", "90,000"),
  new Product(
    "../3.image-slider/assests/image-2.jpeg",
    "Porche GTS",
    "170,000"
  ),
  new Product(
    "../3.image-slider/assests/image-3.jpeg",
    "Ford Monster",
    "200,000"
  ),
  new Product("../3.image-slider/assests/image-4.jpeg", "Cadillac", "70,000"),
  new Product("../3.image-slider/assests/image-1.jpeg", "Audi A8", "80,000"),
  new Product("../3.image-slider/assests/image-1.jpeg", "Mustang GT", "270,000")
];

const renderProducts = () => {
  products.map((obj, index) => {
    const html = `<div class="product" data-id="${index}">
        <img src="${obj.src}" alt="product-image" class="product-img">
        <div class="product-text">
            <h2 class="product-heading">${obj.productName}</h2>
            <h4 class="price">$${obj.price}</h4>
        </div>
        <button class="add-btn">add to cart</button>
    </div>`;
    productWrapper.insertAdjacentHTML("beforeend", html);
  });
};

const shoppingCartState = {
  numberOfItemsInCart: 0,
  displayBubble: false,
  totalPrice: 0
};
const controllingCartState = () => {
  if (shoppingCartState.numberOfItemsInCart !== 0) {
    shoppingCartState.displayBubble = true;
  } else {
    shoppingCartState.displayBubble = false;
  }
  if (shoppingCartState.displayBubble) {
    itemBubble.style.display = "block";
    itemBubble.innerHTML = shoppingCartState.numberOfItemsInCart;
  } else {
    itemBubble.style.display = "none";
  }
};

const renderCart = element => {
  const html = `<div class="cart-element">
    <img src="${element.src}" alt="product-image" class="cart-product-img">
    <div class="cart-text">
    <h2 class="cart-product-heading">${element.productName}</h2>
    <h4 class="price">${element.price}</h4>
    </div>
    <i class="fa fa-trash cart-item-delete"></i>`;
  cartWrapper.insertAdjacentHTML("beforeend", html);

  const totalPrice = backdrop.querySelector(".total-price");
  totalPrice.innerHTML = `total Price: $${shoppingCartState.totalPrice}`;
};

const addItemToCart = clickedBtn => {
  const elementId = clickedBtn.parentElement.dataset.id;
  const clickedElement = products[elementId];
  shoppingCartState.numberOfItemsInCart++;
  shoppingCartState.totalPrice += parseInt(
    clickedElement.price.split(",").join("")
  );
  renderCart(clickedElement);
  controllingCartState();
};

const deleteCartProducts = targetEl => {
  const targetDiv = targetEl.parentElement;
  const priceOfDeletedEl =
    targetEl.previousElementSibling.lastChild.previousElementSibling.innerText;
  targetDiv.remove();
  shoppingCartState.numberOfItemsInCart--;
  shoppingCartState.totalPrice -= parseInt(
    priceOfDeletedEl.split(",").join("")
  );
  const totalPrice = backdrop.querySelector(".total-price");
  totalPrice.innerHTML = `total Price: $${shoppingCartState.totalPrice}`;
  controllingCartState();
};

const showModal = () => {
  backdrop.style.display = "block";
  deleteCartItem = Array.from(document.querySelectorAll(".cart-item-delete"));
  //continue here
  deleteCartItem.map(el => {
    el.addEventListener("click", e => {
      deleteCartProducts(e.target);
    });
  });
};

const hideModal = () => {
  backdrop.style.display = "none";
};

//not working corrently
// const filterProducts = ()=>{
//     if(input.value){
//         const enteredValue = input.value;
//         const filteredProducts = products.filter((obj, index)=>{
//             return obj.productName == enteredValue ? obj.index = index : false; 
//         });
//         renderfilteredProduct(filteredProducts);
//     }
// }

// const renderfilteredProduct = (product)=>{
//     products.splice(product[0].index, 1);
//     products.unshift(...product);
//     productWrapper.innerHTML = '';
//     renderProducts();
// }


renderProducts();

//this is here because these items are rendered dynamically
const addToCartBtn = Array.from(document.querySelectorAll(".add-btn"));

shoppingCart.addEventListener("click", showModal);
backdrop.addEventListener("click", hideModal);
searchIcon.addEventListener('click', filterProducts);
//an iife which attaches eventlistner to add to cart btn
(() => {
  addToCartBtn.map(btn => {
    btn.addEventListener("click", e => {
      addItemToCart(e.target);
    });
  });
})();
