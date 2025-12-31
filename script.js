// Product data
const products = [
    {
        id: 1,
        name: "Ethiopian Yirgacheffe",
        price: 14.99,
        category: "beans",
        description: "Light roast with floral notes and citrus undertones",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7e7001f2-c40c-4ac1-82d4-7178c708be42.png"
    },
    {
        id: 2,
        name: "Colombian Supremo",
        price: 12.99,
        category: "ground",
        description: "Medium roast with balanced flavor and nutty finish",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3a3c5d4f-f246-4f46-b638-6c7dd62b368e.png"
    },
    {
        id: 3,
        name: "Italian Espresso Blend",
        price: 16.99,
        category: "beans",
        description: "Dark roast with rich, bold flavor and caramel notes",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f0d22f45-e826-4170-9ac1-913f477d6ce1.png"
    },
    {
        id: 4,
        name: "Costa Rican Tarrazu",
        price: 15.99,
        category: "capsules",
        description: "Medium-dark roast with chocolate and citrus notes",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/36b741e6-7081-4d27-a2ba-04c9bf2377d6.png"
    },
    {
        id: 5,
        name: "Sumatra Mandheling",
        price: 13.99,
        category: "beans",
        description: "Full-bodied with earthy tones and low acidity",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2c238576-c30f-4114-b87f-6bd287288b95.png"
    },
    {
        id: 6,
        name: "Guatemalan Antigua",
        price: 14.49,
        category: "ground",
        description: "Medium roast with spicy and chocolatey notes",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a5fbadb0-734a-4a44-9154-750ff22198c1.png"
    },
    {
        id: 7,
        name: "Hawaiian Kona",
        price: 24.99,
        category: "beans",
        description: "Smooth, rich flavor with hints of nut and spice",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e984e5c9-367f-4b32-9258-23008fdc87e7.png"
    },
    {
        id: 8,
        name: "Brazilian Santos",
        price: 11.99,
        category: "capsules",
        description: "Low acidity with nutty, sweet caramel notes",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c25a82cb-e14d-476c-b218-e1f68f5acffa.png"
    }
];

// Cart functionality
let cart = [];
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartSummary = document.getElementById('cartSummary');
const subtotalEl = document.getElementById('subtotal');
const shippingEl = document.getElementById('shipping');
const totalEl = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Display products
function displayProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name} bag of premium coffee beans">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-desc">${product.description}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to the add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${product.name} added to cart`);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => document.body.removeChild(notification), 500);
    }, 2000);
}

// Display cart items
function displayCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartSummary.style.display = 'block';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-info">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name} coffee product">
                </div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Add event listeners for quantity changes
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            changeQuantity(id, 1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            changeQuantity(id, -1);
        });
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const newQuantity = parseInt(e.target.value);
            
            if (newQuantity < 1) {
                e.target.value = 1;
                changeQuantity(id, 0, 1);
            } else {
                changeQuantity(id, 0, newQuantity);
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
    
    updateCartSummary();
}

// Change quantity
function changeQuantity(id, change, setQuantity = null) {
    const item = cart.find(item => item.id === id);
    
    if (setQuantity !== null) {
        item.quantity = setQuantity;
    } else {
        item.quantity += change;
    }
    
    if (item.quantity < 1) {
        removeFromCart(id);
    } else {
        updateCartCount();
        displayCartItems();
    }
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    displayCartItems();
    showNotification('Item removed from cart');
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 4.99 : 0;
    const total = subtotal + shipping;
    
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    shippingEl.textContent = `$${shipping.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
}

// Checkout
function checkout() {
    if (cart.length === 0) return;
    
    alert('Thank you for your order! Your coffee will be on its way soon.');
    cart = [];
    updateCartCount();
    displayCartItems();
    cartModal.style.display = 'none';
}

// Event listeners
cartIcon.addEventListener('click', () => {
    displayCartItems();
    cartModal.style.display = 'flex';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

checkoutBtn.addEventListener('click', checkout);

// Close cart when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Filter products
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        displayProducts(btn.getAttribute('data-filter'));
    });
});

// Initialize
displayProducts();
updateCartCount();