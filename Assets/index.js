let API_RESPONSE;

const callApi = () => {
  return fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      API_RESPONSE = data;
      return listProducts(data);
    })
    .catch((error) => console.log(error));
};

callApi();

function listProducts(res) {
  return (root.innerHTML = res
    .map((product) => {
      let { id, price, title, image, description } = product;
      console.log(product);
      title = title.substring(0, 15);
      description = description.substring(0, 30) + "...";
      root.classList.remove("hidden");
      loader.classList.add("hidden"); 


      const prod = {
        id: id,
        title: title,
        price: price,
      };


      return ` <div class="col" >
              <div class="content">
    <div class="image">
      <img src=${image} alt="image" class="img-responsive" />
    </div>
    <div class="title">
      <h3>${title}</h3>
    </div>
    <div class="description">
      <p class="text-muted">${description}</p>
    </div>
    <div class="footer">
      <span class="price">$${price}</span>
      <button class="addtocart" onclick="addToCart(${id})"> <i class="fa-solid fa-bag-shopping"></i> </button>
      
    </div>
  </div>
</div> `;
    })
    .join(""));
}


let productList = [];

const addToCart = (id) => {
  let p = API_RESPONSE.filter((x) => x.id === id);
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].id === id) {
      return false;
    }
  }
  p[0].quantity = 1;
  productList.push(p[0]);
  localStorage.setItem("checkoutData", JSON.stringify(productList));
  console.log(productList);
};

const increment = document.getElementById("increment");
let count = 0;

function incrementNumber() {
  count++;
  increment.innerText = count;
}
