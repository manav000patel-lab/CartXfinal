 const products = [
  { id: 1, name: "Laptop", price: 80000, category: "electronics", img: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/13-laptop-platinum-right-render-fy25:VP4-1260x795?fmt=png-alpha" },
  { id: 2, name: "Phone", price: 40000, category: "electronics", img: "https://darlingretail.com/cdn/shop/files/iPhone_15_Pink_Pure_Back_iPhone_15_Pink_Pure_Front_2up_Screen__WWEN_cfd96ace-df87-4ab3-a96a-e8e9b13bb7b9_600x.jpg?v=1695104022" },
  { id: 3, name: "T-Shirt", price: 800, category: "clothing", img: "https://www.teehubshop.com/wp-content/uploads/2025/03/rcb-travel-tshirt-600x800.jpg" },
  { id: 4, name: "Jeans", price: 1500, category: "clothing", img: "https://assets.ajio.com/medias/sys_master/root/20240913/mlC1/66e414e11d763220fae4a074/-473Wx593H-700419717-white-MODEL.jpg" },
  { id: 5, name: "Shoes", price: 1600, category: "clothing", img: "https://5.imimg.com/data5/SELLER/Default/2022/1/SB/VI/YC/145828260/blue-running-shoes-500x500.jpg" },
  { id: 6, name: "Bag", price: 1200, category: "clothing", img: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Computers%20Peripherals/Computer%20Accessories%20and%20Tablets%20Accessories/Images/235081_0_xzqhph.png" },
  { id: 7, name: "Cap", price: 900, category: "clothing", img: "https://images-static.nykaa.com/media/catalog/product/e/0/e0eecd84062449567922.jpg" }

]


let cart = JSON.parse(localStorage.getItem("cart")) || []

const productContainer = document.getElementById("products")
const cartContainer = document.getElementById("cart-items")

function renderProducts(data) {
  productContainer.innerHTML = data.map(p => `
  <div class="card">
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button onclick="addToCart(${p.id})">Add to Cart</button>
  </div>
`).join('');
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item)
  update()
}

function removeFromCart(index) {
  cart.splice(index, 1);
  update()
}
function update(){
cartContainer.innerHTML = cart.map((item, i) => `
  <div class="cart-card">
    
    <img src="${item.img}" class="cart-img">

    <div class="cart-info">
      <h4>${item.name}</h4>
      <p>₹${item.price}</p>

      <div class="qty">
        <button onclick="changeQty(${i}, -1)">−</button>
        <span>${item.qty || 1}</span>
        <button onclick="changeQty(${i}, 1)">+</button>
      </div>
    </div>

    <button class="remove-btn" onclick="removeFromCart(${i})">✖</button>

  </div>
`).join('');
}
function changeQty(index, delta) {
  if (!cart[index].qty) cart[index].qty = 1;

  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  update();
}

function filterCategory(category) {
  if (category === "all") return renderProducts(products)
  renderProducts(products.filter(p => p.category === category))
}

document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(value)
  )
  renderProducts(filtered)
})

document.querySelector(".submit").addEventListener("click", placeOrder);

function placeOrder() {
  if (cart.length === 0) {
    console.log("Cart is empty!")
    return;
  }

  const order = {
    orderId: Date.now(),
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price, 0),
    date: new Date().toLocaleString()
  };

  console.log("Order placed successfully ✅")
  console.log(order);

  
  cart = []
  update()
}
renderProducts(products)
update()







