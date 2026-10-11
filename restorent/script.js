
"use strict";

const menuItems = [
    {
        id: 1,
        name: "Crispy Garden Bowl",
        category: "Starters",
        price: 249,
        rating: 4.9,
        time: "10 min",
        tag: "Bestseller",
        description: "Fresh greens, crunchy veggies and a zesty house dressing.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&h=500&fit=crop"
    },
    {
        id: 2,
        name: "Classic Margherita",
        category: "Pizza",
        price: 349,
        rating: 4.8,
        time: "18 min",
        tag: "Popular",
        description: "Golden crust, creamy mozzarella, basil and rich tomato sauce.",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700&h=500&fit=crop"
    },
    {
        id: 3,
        name: "Creamy Alfredo Pasta",
        category: "Mains",
        price: 329,
        rating: 4.9,
        time: "15 min",
        tag: "Chef's Pick",
        description: "Silky cream sauce, herbs and perfectly cooked pasta.",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700&h=500&fit=crop"
    },
    {
        id: 4,
        name: "Smoky Veggie Burger",
        category: "Mains",
        price: 279,
        rating: 4.7,
        time: "12 min",
        tag: "Must Try",
        description: "A juicy veggie patty, fresh lettuce and smoky signature sauce.",
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=700&h=500&fit=crop"
    },
    {
        id: 5,
        name: "Choco Lava Dream",
        category: "Desserts",
        price: 179,
        rating: 5.0,
        time: "8 min",
        tag: "Sweet Treat",
        description: "Warm chocolate cake with a rich molten center.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700&h=500&fit=crop"
    },
    {
        id: 6,
        name: "Mango Sunshine",
        category: "Drinks",
        price: 149,
        rating: 4.8,
        time: "5 min",
        tag: "Refreshing",
        description: "A tropical mango cooler made for sunny afternoons.",
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=700&h=500&fit=crop"
    },
    {
        id: 7,
        name: "Loaded Nachos",
        category: "Starters",
        price: 219,
        rating: 4.7,
        time: "10 min",
        tag: "Shareable",
        description: "Crunchy tortilla chips with cheese, salsa and herbs.",
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=700&h=500&fit=crop"
    },
    {
        id: 8,
        name: "Farmhouse Pizza",
        category: "Pizza",
        price: 399,
        rating: 4.9,
        time: "20 min",
        tag: "Fan Favorite",
        description: "A loaded pizza with garden vegetables and melted cheese.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&h=500&fit=crop"
    },
    {
        id: 9,
        name: "Berry Cheesecake",
        category: "Desserts",
        price: 199,
        rating: 4.8,
        time: "5 min",
        tag: "Sweet Treat",
        description: "Creamy cheesecake with a bright mixed-berry topping.",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=700&h=500&fit=crop"
    },
    {
        id: 10,
        name: "Chilled Lemonade",
        category: "Drinks",
        price: 99,
        rating: 4.6,
        time: "4 min",
        tag: "Refreshing",
        description: "Fresh lemon, mint and a perfectly balanced citrus kick.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=700&h=500&fit=crop"
    },
    {
        id: 11,
        name: "Paneer Tikka",
        category: "Starters",
        price: 269,
        rating: 4.9,
        time: "14 min",
        tag: "Indian Favorite",
        description: "Smoky paneer cubes with spices and mint chutney.",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=700&h=500&fit=crop"
    },
    {
        id: 12,
        name: "Signature Rice Bowl",
        category: "Mains",
        price: 299,
        rating: 4.7,
        time: "12 min",
        tag: "Comfort Food",
        description: "A colorful bowl of seasoned rice, vegetables and herbs.",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700&h=500&fit=crop"
    }
];

const CART_KEY = "spiceSymphonyCart";
const FAVORITES_KEY = "spiceSymphonyFavorites";
const BOOKINGS_KEY = "spiceSymphonyBookings";
const NEWSLETTER_KEY = "spiceSymphonyNewsletter";

let activeCategory = "All";
let searchQuery = "";
let cart = loadStorage(CART_KEY, []);
let favorites = new Set(loadStorage(FAVORITES_KEY, []));

const $ = (selector, root = document) =>
    root.querySelector(selector);

const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

function loadStorage(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
    } catch (error) {
        console.warn(`Unable to read storage: ${key}`, error);
        return fallback;
    }
}

function saveStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn(`Unable to save storage: ${key}`, error);
        showToast("Browser storage is unavailable.", "error");
        return false;
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(price);
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

let toastId = 0;

function showToast(message, type = "success") {
    const container = $("#toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.setAttribute("role", "status");
    toast.textContent = message;

    container.appendChild(toast);

    const id = ++toastId;

    setTimeout(() => {
        toast.classList.add("out");

        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2800);

    return id;
}

function renderMenu() {
    const grid = $("#menuGrid");
    if (!grid) return;

    const filteredItems = menuItems.filter(item => {
        const matchesCategory =
            activeCategory === "All" ||
            item.category === activeCategory;

        const query = searchQuery.toLowerCase();

        const matchesSearch = [
            item.name,
            item.category,
            item.description,
            item.tag
        ].some(value => value.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
    });

    if (!filteredItems.length) {
        grid.innerHTML = `
      <div class="no-results">
        <h3>No dishes found 😕</h3>
        <p>Try a different search or select another category.</p>
      </div>
    `;
        return;
    }

    grid.innerHTML = filteredItems.map((item, index) => `
    <article class="food-card" style="animation-delay:${index * 55}ms">
      <div class="food-image-wrap">
        <img
          class="food-image"
          src="${item.image}"
          alt="${escapeHTML(item.name)}"
          loading="lazy"
        />
        <span class="food-tag">${escapeHTML(item.tag)}</span>
        <button
          class="favorite-btn ${favorites.has(item.id) ? "active" : ""}"
          data-favorite="${item.id}"
          aria-label="${favorites.has(item.id) ? "Remove" : "Add"} ${escapeHTML(item.name)} ${favorites.has(item.id) ? "from" : "to"} favorites"
          aria-pressed="${favorites.has(item.id)}"
        >${favorites.has(item.id) ? "♥" : "♡"}</button>
      </div>

      <div class="food-info">
        <span class="food-category">${escapeHTML(item.category)}</span>
        <h3>${escapeHTML(item.name)}</h3>
        <p class="food-description">${escapeHTML(item.description)}</p>

        <div class="food-meta">
          <span class="food-rating">★ ${item.rating.toFixed(1)}</span>
          <span>◷ ${escapeHTML(item.time)}</span>
        </div>

        <div class="food-bottom">
          <div class="food-price">
            ${formatPrice(item.price)}
            <small>Inclusive demo price</small>
          </div>

          <button class="add-cart-btn" data-add="${item.id}">
            <span>＋</span> Add to Cart
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

$("#menuFilters").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    activeCategory = button.dataset.category;

    $$("#menuFilters .filter-btn").forEach(btn => {
        const isActive = btn === button;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
    });

    renderMenu();
});

$("#menuSearch").addEventListener("input", event => {
    searchQuery = event.target.value.trim();
    renderMenu();
});

$("#resetMenu").addEventListener("click", () => {
    activeCategory = "All";
    searchQuery = "";
    $("#menuSearch").value = "";

    $$("#menuFilters .filter-btn").forEach(button => {
        const isActive = button.dataset.category === "All";
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    renderMenu();
});

function toggleFavorite(id) {
    if (favorites.has(id)) {
        favorites.delete(id);
        showToast("Removed from favorites.");
    } else {
        favorites.add(id);
        showToast("Added to your favorites ♥");
    }

    saveStorage(FAVORITES_KEY, [...favorites]);
    renderMenu();
}

function getCartQuantity() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal() {
    return cart.reduce((total, cartItem) => {
        const product = menuItems.find(item => item.id === cartItem.id);
        return total + (product ? product.price * cartItem.quantity : 0);
    }, 0);
}

function addToCart(id) {
    const product = menuItems.find(item => item.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, quantity: 1 });
    }

    saveStorage(CART_KEY, cart);
    renderCart();
    showToast(`${product.name} added to your basket!`);
}

function changeQuantity(id, change) {
    const item = cart.find(cartItem => cartItem.id === id);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(cartItem => cartItem.id !== id);
    }

    saveStorage(CART_KEY, cart);
    renderCart();
}

function removeFromCart(id) {
    const product = menuItems.find(item => item.id === id);

    cart = cart.filter(item => item.id !== id);

    saveStorage(CART_KEY, cart);
    renderCart();

    if (product) {
        showToast(`${product.name} removed from basket.`);
    }
}

function renderCart() {
    const itemsContainer = $("#cartItems");
    const isEmpty = cart.length === 0;

    cart = cart.filter(item =>
        menuItems.some(product => product.id === item.id) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    );

    const empty = cart.length === 0;

    $("#cartCount").textContent = getCartQuantity();
    $("#drawerCount").textContent = `(${getCartQuantity()})`;
    $("#cartSubtotal").textContent = formatPrice(getCartTotal());

    $("#cartEmpty").classList.toggle("visible", empty);
    $("#cartFooter").classList.toggle("hidden", empty);

    if (empty) {
        itemsContainer.innerHTML = "";
        return;
    }

    itemsContainer.innerHTML = cart.map(cartItem => {
        const product = menuItems.find(item => item.id === cartItem.id);

        return `
      <article class="cart-item">
        <img src="${product.image}" alt="${escapeHTML(product.name)}" />

        <div>
          <h3>${escapeHTML(product.name)}</h3>
          <p>${formatPrice(product.price * cartItem.quantity)}</p>

          <div class="quantity-controls">
            <button data-quantity="${product.id}" data-change="-1"
              aria-label="Decrease ${escapeHTML(product.name)} quantity">−</button>
            <span>${cartItem.quantity}</span>
            <button data-quantity="${product.id}" data-change="1"
              aria-label="Increase ${escapeHTML(product.name)} quantity">+</button>
          </div>
        </div>

        <button class="remove-item" data-remove="${product.id}"
          aria-label="Remove ${escapeHTML(product.name)}">×</button>
      </article>
    `;
    }).join("");

    saveStorage(CART_KEY, cart);
}

$("#menuGrid").addEventListener("click", event => {
    const addButton = event.target.closest("[data-add]");
    const favoriteButton = event.target.closest("[data-favorite]");

    if (addButton) {
        addToCart(Number(addButton.dataset.add));
    }

    if (favoriteButton) {
        toggleFavorite(Number(favoriteButton.dataset.favorite));
    }
});

$("#cartItems").addEventListener("click", event => {
    const quantityButton = event.target.closest("[data-quantity]");
    const removeButton = event.target.closest("[data-remove]");

    if (quantityButton) {
        changeQuantity(
            Number(quantityButton.dataset.quantity),
            Number(quantityButton.dataset.change)
        );
    }

    if (removeButton) {
        removeFromCart(Number(removeButton.dataset.remove));
    }
});

const cartDrawer = $("#cartDrawer");
const cartOverlay = $("#cartOverlay");

function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
    $("#closeCart").focus();
}

function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");
    $("#openCart").focus();
}

$("#openCart").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

$("#emptyCartBrowse").addEventListener("click", () => {
    closeCart();
    $("#menu").scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && cartDrawer.classList.contains("open")) {
        closeCart();
    }
});

$("#checkoutBtn").addEventListener("click", () => {
    if (!cart.length) {
        showToast("Your basket is empty.", "error");
        return;
    }

    const order = {
        id: `SS-${Date.now()}`,
        items: cart.map(item => ({ ...item })),
        total: getCartTotal(),
        createdAt: new Date().toISOString(),
        status: "Demo order"
    };

    const previousOrders = loadStorage("spiceSymphonyOrders", []);
    const saved = saveStorage("spiceSymphonyOrders", [
        ...previousOrders,
        order
    ]);

    if (!saved) {
        showToast("Unable to save your demo order.", "error");
        return;
    }

    cart = [];
    saveStorage(CART_KEY, cart);
    renderCart();
    closeCart();

    showToast(`Demo order ${order.id} saved! No payment was taken.`);
});

const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

function closeMobileMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
});

navLinks.addEventListener("click", event => {
    if (event.target.closest("a")) {
        closeMobileMenu();
    }
});

document.addEventListener("click", event => {
    if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        closeMobileMenu();
    }
});

const reservationForm = $("#reservationForm");
const reservationDate = $("#reservationDate");

function getLocalDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

reservationDate.min = getLocalDateString();

reservationForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!reservationForm.reportValidity()) return;

    const formData = new FormData(reservationForm);

    const booking = {
        id: `BOOK-${Date.now()}`,
        name: String(formData.get("name")).trim(),
        phone: String(formData.get("phone")).trim(),
        date: String(formData.get("date")),
        time: String(formData.get("time")),
        guests: String(formData.get("guests")),
        requests: String(formData.get("requests") || "").trim(),
        createdAt: new Date().toISOString(),
        status: "Demo request"
    };

    if (booking.name.length < 2) {
        showToast("Please enter your full name.", "error");
        return;
    }

    if (!/^[+\d][\d\s()-]{8,19}$/.test(booking.phone)) {
        showToast("Please enter a valid phone number.", "error");
        return;
    }

    if (booking.date < getLocalDateString()) {
        showToast("Please choose today or a future date.", "error");
        return;
    }

    const previousBookings = loadStorage(BOOKINGS_KEY, []);
    const saved = saveStorage(BOOKINGS_KEY, [
        ...previousBookings,
        booking
    ]);

    if (!saved) {
        showToast("Could not save the demo reservation.", "error");
        return;
    }

    reservationForm.reset();
    reservationDate.min = getLocalDateString();

    showToast(`Thanks ${booking.name}! Demo reservation saved.`);
});

$("#newsletterForm").addEventListener("submit", event => {
    event.preventDefault();

    const emailInput = $("#newsletterEmail");

    if (!emailInput.reportValidity()) return;

    const email = emailInput.value.trim().toLowerCase();
    const subscribers = loadStorage(NEWSLETTER_KEY, []);

    if (subscribers.includes(email)) {
        showToast("This email is already on our demo list.");
        return;
    }

    const saved = saveStorage(NEWSLETTER_KEY, [
        ...subscribers,
        email
    ]);

    if (!saved) return;

    emailInput.value = "";
    showToast("You're on our demo newsletter list!");
});

const backToTop = $("#backToTop");

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

$("#year").textContent = new Date().getFullYear();

renderMenu();
renderCart();

$$("#menuFilters .filter-btn").forEach(button => {
    button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === activeCategory)
    );
});

