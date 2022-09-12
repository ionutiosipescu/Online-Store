const products = JSON.parse(localStorage.getItem("checkoutData"));
console.log(products, "Trigger");

function checkoutList() {
  let counter = 0;
  return (root.innerHTML = products
    .map((product) => {
      counter++;
      let { id, price, title, quantity } = product;
      title = title.substring(0, 15);
      
      return ` 
            <div class="row text-center first-product-row my-2">
                <div class="col">
                    <p>${counter}</p>
                </div>
                <div class="col">
                    <p>${title}</p>
                </div>
                <div class="col">
                    <p>$${price}</p>
                </div>
                <div class="col">
                    <p class="total-count">${quantity}</p>
                </div>
                <div class="col">
                    <p>${price}</p>
                </div>

                <div class="col">
                    <button class="plus-btn" onclick="increment(${id})"><i class="fa-solid fa-plus"></i></button>
                    <button class="minus-btn" onclick="decrement()"><i class="fa-solid fa-minus"></i></button>
                    <button class="btn btn-sm btn-danger " onclick="deleteProduct(${id})" type="button">REMOVE</button>
                </div>
            </div> `;
    })
    .join(""));
}

let removeCartItemButtons = document.getElementsByClassName("btn-danger");
console.log(removeCartItemButtons);
for (let i = 0; i < removeCartItemButtons.length; i++) {
  let button = removeCartItemButtons[i];
  button.addEventListener("click", function (event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
  });
}

checkoutList();

const deleteProduct = (id) => {
  let newProductList = products.filter((data) => data.id != id);
  localStorage.setItem("checkoutData", JSON.stringify(newProductList));
  window.location.reload();
};

const increment = (id) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      products[i].quantity += 1;
      console.log(products[i]);
    }
  }
  localStorage.setItem("checkoutData", JSON.stringify(products));
  window.location.reload();
};
