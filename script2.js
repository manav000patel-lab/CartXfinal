const products = [
  { id: 1, name: "Laptop", price: 50000, category: "electronics" },
  { id: 2, name: "Phone", price: 20000, category: "electronics" },
  { id: 3, name: "T-Shirt", price: 500, category: "clothing" },
  { id: 4, name: "Jeans", price: 1500, category: "clothing" }
]

let cart = JSON.parse(localStorage.getItem("cart")) || []

const productContainer = document.getElementById("products")
const cartContainer = document.getElementById("cart-items")

function renderProducts(data) {
  productContainer.innerHTML = data.map(p => `
    <div class="card">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join('')
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

function update() {
  localStorage.setItem("cart", JSON.stringify(cart))

  cartContainer.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <span>${item.name}</span>
      <span>₹${item.price}</span>
      <button onclick="removeFromCart(${i})">X</button>
    </div>
  `).join('')

  document.getElementById("count").innerText = cart.length

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  document.getElementById("total").innerText = total
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
update()
renderProducts(products)
  





