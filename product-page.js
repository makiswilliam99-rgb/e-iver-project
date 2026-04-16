document.addEventListener("DOMContentLoaded", () => {

// Load navbar
fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;
    navbar.innerHTML = data;
    initNavbar(); // 👈 IMPORTANT
  });

// Load footer
fetch("footer.html")
  .then(res => res.text())
  .then(data => {
    const footer = document.getElementById("footer");
    if (!footer) return;
    footer.innerHTML = data;
  });


  // =======================
  // 1. Product Data
  // =======================
  const products = [
    {id:"fenbendazole", title:"Fenbendazole", price:250, desc:"Complementary support being researched worldwide...", img:"f12.jpg"},
    {id:"ivermectin", title:"Ivermectin Support (3mg & 12mg)", price:250, desc:"Off-label use under investigation...", img:"f13.jpg"},
    {id:"artemisinin", title:"Artemisinin Extract", price:260, desc:"Sweet wormwood extract with active research compounds...", img:"f14.jpg"},
    {id:"zeolite", title:"Zeolite Binder", price:80, desc:"Natural mineral binder for detox protocols...", img:"f16.jpg"},
    {id:"ivermectin3", title:"Ivermectin 3mg", price:100, desc:"3mg dose under investigation for supportive properties", img:"f17.jpeg"},
    {id:"ivermectin6", title:"Ivermectin 6mg", price:150, desc:"6mg option for antiparasitic and supportive uses...", img:"f18.jpeg"},
    {id:"vitamine", title:"Vitamin E 600-800mg", price:40, desc:"High-dose Vitamin E for oxidative balance...", img:"f19.webp"},
    {id:"methylene", title:"Methylene Blue", price:150, desc:"Investigated for cellular and mitochondrial function support...", img:"f15.jpg"},
    {id:"mebendazole", title:"Mebendazole", price:170, desc:"Broad-spectrum antiparasitic under investigation...", img:"f20.jpeg"},
    {id:"hydroxy400", title:"Hydroxychloroquine 400mg", price:200, desc:"400mg option investigated for immune-related pathways...", img:"f21.jpg"},
    {id:"hydroxy200", title:"Hydroxychloroquine 200mg", price:150, desc:"200mg option for research and clinical settings...", img:"f22.jpg"},
    {id:"fenbendazole222", title:"Fenbendazole 222mg", price:150, desc:"222mg formulation used in research protocols...", img:"f25.jpg"},
    {id:"cbd", title:"CBD Oil", price:150, desc:"Cannabidiol oil for wellness support...", img:"f27.jpg"},
    {id:"nicotine7", title:"Nicotine Patches 7mg", price:60, desc:"7mg transdermal nicotine patches...", img:"f23.jpg"},
    {id:"nicotine21", title:"Nicotine Patches 21mg", price:80, desc:"21mg transdermal nicotine patches...", img:"f24.jpg"},
    {id:"soolantra", title:"Soolantra (Ivermectin Cream)", price:100, desc:"Ivermectin topical cream for dermatological support...", img:"f26.jpg"},
    {id:"curcumin", title:"Curcumin 600-1500mg", price:60, desc:"Curcumin high-dose supplement for inflammation balance...", img:"f11.jpg"},
    {id:"soursop", title:"Soursop (Graviola)", price:40, desc:"Soursop fruit extract for natural wellness...", img:"f10.jpg"},
    {id:"soursopTea", title:"Soursop Tea", price:20, desc:"Tea made from soursop leaves...", img:"f28.jpg"},
    {id:"ivermectinHorse", title:"Ivermectin Horse Paste and Strip", price:100, desc:"Ivermectin horse paste with dosing strip...", img:"f29.jpg"},
    {id:"methylene12", title:"Methylene Blue 12mg Pills", price:150, desc:"Methylene Blue supplement for cellular support...", img:"f9.jpg"},
    {id:"lotilaner", title:"Lotilaner 0.25 Eye Drops (XDEMVY )", price:700, desc:"XDEMVY (lotilaner ophthalmic solution) 0.25% is an FDA-approved ...", img:"f29.png"}
  ];

  // =======================
  // 2. Pagination Setup
  // =======================
  const productsPerPage = 9;
  const totalPages = Math.ceil(products.length / productsPerPage);
  let currentPage = Number(new URLSearchParams(window.location.search).get("page")) || 1;

  const productGrid = document.querySelector(".product-grid");
  const pageNumbersDiv = document.getElementById("pageNumbers");
  const pageInfo = document.getElementById("pageInfo");
  const productCountSpan = document.getElementById("productCount");

  function displayProducts() {
    productGrid.innerHTML = "";
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const pageProducts = products.slice(start, end);

    productCountSpan.textContent = pageProducts.length;

    pageProducts.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="card-image">
          <img src="${product.img}" alt="${product.title}">
        </div>

        <div class="card-body">
          <h4 class="product-title">${product.title}</h4>
          <p class="product-price">$${product.price.toFixed(2)}</p>
        </div>

        <div class="card-actions">
          <button class="icon-btn view" onclick="openProductModal('${product.id}')">
            <i class="fa-solid fa-eye"></i>
          </button>

          <div class="qty-control">
            <button onclick="changeQty('${product.id}', -1)">−</button>
            <span id="qty-${product.id}">0</span>
            <button onclick="changeQty('${product.id}', 1)">+</button>
          </div>
        </div>
      `;

      productGrid.appendChild(card);
    });

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    renderPagination();

    products.forEach(p => updateQtyDisplay(p.id));
  }

  function renderPagination() {
    pageNumbersDiv.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.className = "page-number" + (i === currentPage ? " active" : "");
      btn.textContent = i;
      btn.addEventListener("click", () => {
        currentPage = i;
        displayProducts();
      });
      pageNumbersDiv.appendChild(btn);
    }
  }

  // =======================
  // 3. Product Modal
  // =======================
  

  window.openProductModal = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    currentModalItem = product;

    document.getElementById("modalTitle").innerText = product.title;
    document.getElementById("modalPrice").innerText = "$" + product.price.toFixed(2);
    document.getElementById("modalDescription").innerText = product.desc;
    document.getElementById("modalImage").src = product.img;
    document.getElementById("productModal").style.display = "flex";
  }

  window.closeProductModal = () => {
    document.getElementById("productModal").style.display = "none";
    currentModalItem = null;
  }

  // =======================
  // 4. Cart Logic
  // =======================
  function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById("cartCount").textContent = totalQty;
  }

  window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const cart = getCart();

    // If product already in cart, increment qty
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.title,
        price: product.price,
        qty: 1
      });
    }

    saveCart(cart);
    showToast(`${product.title} added to cart`);
  }

  function updateQtyDisplay(id) {
  const cart = getCart();
  const item = cart.find(p => p.id === id);
  const el = document.getElementById(`qty-${id}`);
  if (el) {
    el.textContent = item ? item.qty : 0;
  }
}

window.changeQty = function(id, change) {
  const cart = getCart();
  const product = products.find(p => p.id === id);
  if (!product) return;

  let item = cart.find(p => p.id === id);

  if (!item && change > 0) {
    // Add new item
    cart.push({
      id: product.id,
      name: product.title,
      price: product.price,
      qty: 1
    });
  } else if (item) {
    item.qty += change;

    if (item.qty <= 0) {
      // Remove if 0
      const index = cart.indexOf(item);
      cart.splice(index, 1);
    }
  }

  saveCart(cart);
  updateQtyDisplay(id);
};

  // Initialize cart count
  const initialCart = getCart();
  const totalQty = initialCart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").textContent = totalQty;

  // =======================
  // 5. Prev / Next Buttons
  // =======================
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) { currentPage--; displayProducts(); }
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentPage < totalPages) { currentPage++; displayProducts(); }
  });

  // Initial display
  displayProducts();

});

// =======================
// 6. Go to Checkout
// =======================
function goToCheckout() {
  window.location.href = "checkout.html"; // Your checkout page
}

window.addModalItemToCart = function() {
  if (!currentModalItem) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existing = cart.find(item => item.id === currentModalItem.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: currentModalItem.id,
      name: currentModalItem.title,
      price: currentModalItem.price,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // update cart count properly
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").textContent = totalQty;

 showToast(`${currentModalItem.title} added to cart`);
}

function initNavbar() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (!menuToggle || !navLinks) return;

  // Hamburger toggle
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
  });

  // Mobile dropdown toggle
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        dropdown.classList.toggle("open");
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });

  navLinks.addEventListener("click", e => e.stopPropagation());

  function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
}

let currentModalItem = null;

