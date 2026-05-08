// app.js - E-Commerce Product Page JavaScript

// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuContent = document.getElementById('mobile-menu-content');
const closeMobileMenu = document.getElementById('close-mobile-menu');
const cartBtn = document.getElementById('cart-btn');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCount = document.getElementById('cart-count');
const cartEmpty = document.getElementById('cart-empty');
const cartFilled = document.getElementById('cart-filled');
const cartItemImg = document.getElementById('cart-item-img');
const cartItemTitle = document.getElementById('cart-item-title');
const cartItemPrice = document.getElementById('cart-item-price');
const deleteCartItem = document.getElementById('delete-cart-item');
const mainImage = document.getElementById('main-image');
const thumbnails = document.querySelectorAll('.thumbnail');
const decreaseQty = document.getElementById('decrease-qty');
const increaseQty = document.getElementById('increase-qty');
const quantity = document.getElementById('quantity');
const addToCart = document.getElementById('add-to-cart');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightbox = document.getElementById('close-lightbox');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxThumbs = document.querySelectorAll('.lightbox-thumb');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// State
let currentQuantity = 0;
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let currentImageIndex = 0;
const images = [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateQuantityDisplay();
    updateCartDisplay();
    updateCartCount();
});

// Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    setTimeout(() => {
        mobileMenuContent.classList.remove('-translate-x-full');
    }, 10);
});

closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        closeMobileMenuFunc();
    }
});

function closeMobileMenuFunc() {
    mobileMenuContent.classList.add('-translate-x-full');
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300);
}

// Cart Dropdown
cartBtn.addEventListener('click', () => {
    cartDropdown.classList.toggle('hidden');
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
        cartDropdown.classList.add('hidden');
    }
});

// Quantity Controls
decreaseQty.addEventListener('click', () => {
    if (currentQuantity > 0) {
        currentQuantity--;
        updateQuantityDisplay();
    }
});

increaseQty.addEventListener('click', () => {
    currentQuantity++;
    updateQuantityDisplay();
});

function updateQuantityDisplay() {
    quantity.textContent = currentQuantity;
}

// Add to Cart
addToCart.addEventListener('click', () => {
    if (currentQuantity > 0) {
        const item = {
            id: 1,
            title: 'Fall Limited Edition Sneakers',
            price: 125,
            quantity: currentQuantity,
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        };
        addItemToCart(item);
        currentQuantity = 0;
        updateQuantityDisplay();
        updateCartDisplay();
        updateCartCount();
        cartDropdown.classList.remove('hidden');
    }
});

function addItemToCart(item) {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cartItems.push(item);
    }
    saveCartToLocalStorage();
}

function removeItemFromCart(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    saveCartToLocalStorage();
    updateCartDisplay();
    updateCartCount();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function updateCartDisplay() {
    if (cartItems.length > 0) {
        const item = cartItems[0]; // Assuming single item for simplicity
        cartItemImg.src = item.image;
        cartItemTitle.textContent = item.title;
        cartItemPrice.textContent = `$${item.price}.00 x ${item.quantity} $${item.price * item.quantity}.00`;
        cartEmpty.classList.add('hidden');
        cartFilled.classList.remove('hidden');
    } else {
        cartEmpty.classList.remove('hidden');
        cartFilled.classList.add('hidden');
    }
}

function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }
}

// Delete Cart Item
deleteCartItem.addEventListener('click', () => {
    removeItemFromCart(1); // Assuming single item
});

// Image Gallery
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        changeImage(images[index]);
        currentImageIndex = index;
        updateActiveThumbnail();
    });
});

function changeImage(src) {
    mainImage.src = src;
    lightboxImage.src = src;
}

function updateActiveThumbnail() {
    thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
            thumb.classList.add('border-orange-accent');
        } else {
            thumb.classList.remove('active');
            thumb.classList.remove('border-orange-accent');
        }
    });
}

// Mobile Image Slider
prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    changeImage(images[currentImageIndex]);
    updateActiveThumbnail();
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    changeImage(images[currentImageIndex]);
    updateActiveThumbnail();
});

// Lightbox
function openLightbox() {
    if (window.innerWidth >= 768) { // Only on desktop
        lightbox.classList.remove('hidden');
        lightboxImage.src = mainImage.src;
        updateLightboxThumbnails();
    }
}

closeLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
    }
});

lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    changeLightboxImage(images[currentImageIndex]);
});

lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    changeLightboxImage(images[currentImageIndex]);
});

function changeLightboxImage(src) {
    lightboxImage.src = src;
    mainImage.src = src;
    updateLightboxThumbnails();
}

function updateLightboxThumbnails() {
    lightboxThumbs.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
            thumb.classList.add('border-orange-accent');
        } else {
            thumb.classList.remove('active');
            thumb.classList.remove('border-orange-accent');
        }
    });
}

lightboxThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        currentImageIndex = index;
        changeLightboxImage(images[index]);
    });
});

// Initialize active thumbnail
updateActiveThumbnail();