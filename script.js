// Cart Storage
let cartArr = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const cartLink = document.querySelector("a[href='cart.html']");
  if (cartLink) {
    cartLink.textContent = `Cart (${cartArr.length})`;
  }
}
updateCartCount();

// Add to cart
// the following 3 lines was adapted from : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
let cartButtons = document.getElementsByClassName("add-to-cart-btn");
for (let i = 0; i < cartButtons.length; i++) {
  cartButtons[i].addEventListener("click", addToCart);
}

function addToCart() {
  let cartItem = {
    id: this.dataset.id,
    name: this.dataset.name,
    price: this.dataset.price,
    img: this.dataset.img,
  };

  cartArr.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(cartArr));
  updateCartCount();
}

// Remove from Cart
// the following 8 lines of code was adapted from https://chatgpt.com/share/69a2d97c-de04-8013-a5f5-1f3f6e3432e0
function removeFromCart() {
  const id = this.dataset.id;
  cartArr = cartArr.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cartArr));
  updateCartCount();
  const productCard = this.closest(".product-card");
  if (productCard) {
    productCard.remove();
  }
}

// Display Cart
// the following 13 lines of code was adapted from https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement and https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener and https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
if (cartGrid) {
  for (let i = 0; i < cartArr.length; i++) {
    let cartElement = document.createElement("article");
    cartElement.className = "product-card";
    cartElement.innerHTML = `
            <img class="product-img" src="${cartArr[i].img}" alt="${cartArr[i].name}">
            <div class="product-info">
                <h2>${cartArr[i].name}</h2>
                <p class="product-price">${cartArr[i].price}kr</p>
                <button class= "cart-remove-button" data-id= "${cartArr[i].id}">Remove</button>
            </div>
        `;
    cartGrid.appendChild(cartElement);
  }
  const cartRemoveButtons =
    document.getElementsByClassName("cart-remove-button");
  for (let i = 0; i < cartRemoveButtons.length; i++) {
    cartRemoveButtons[i].addEventListener("click", removeFromCart);
  }
}
updateCartCount();
