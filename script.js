
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}


const orderButtons = document.querySelectorAll('.order-btn');
const cartCount = document.querySelector('.cart-count');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const totalPriceSpan = document.getElementById('total-price');

let cart = [];

if (cartBtn && cartModal) {
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.classList.add('active');
    });
}

if (closeCart && cartModal) {
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
}

 
orderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.menu-card');
    
        const itemName = card.querySelector('h3').textContent;
        const itemPrice = parseInt(button.getAttribute('data-price')) || 180; 
        
        cart.push({ name: itemName, price: itemPrice });
        
        
        updateCartUI();
    });
});


function updateCartUI() {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
    
    if (!cartItemsContainer || !totalPriceSpan) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">السلة فارغة حالياً..</p>';
        totalPriceSpan.textContent = '0 ج.م';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item) => {
        total += item.price;
        const itemElement = document.createElement('div');
        itemElement.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 10px; color: #fff; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;';
        itemElement.innerHTML = `<span>${item.name}</span> <span style="color: #ff9800; font-weight: bold;">${item.price} ج.م</span>;`
        cartItemsContainer.appendChild(itemElement);
    });

    totalPriceSpan.textContent = total + ' ج.م';
}