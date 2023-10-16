const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartLink = document.getElementById('cart-link');
const cartModal = document.getElementById('cart-modal');
const cartContent = document.getElementById('cart-content');
const placeOrderButton = document.getElementById('place-order-btn');
const placeOrderTopButton = document.getElementById('place-order-top-btn');

let cartItems = [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    const product = event.target.getAttribute('data-product');
    const price = parseFloat(event.target.getAttribute('data-price'));

    const existingItem = cartItems.find(item => item.product === product);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ product, price, quantity: 1 });
    }

    updateCartLink();
    populateCartContent();
    showPlaceOrderButton();
    showPlaceOrderTopButton();
}

function openCartModal() {
    populateCartContent();
    cartModal.style.display = 'block';
    updateCartLink();
}

function closeCartModal() {
    cartModal.style.display = 'none';
}

function populateCartContent() {
    cartContent.innerHTML = '';

    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <p>${item.product} - Price: ₦${item.price} - Quantity: ${item.quantity}</p>
            <div class="quantity-buttons">
                <button class="quantity-btn" data-product="${item.product}" data-action="increase">+</button>
                <button class="quantity-btn" data-product="${item.product}" data-action="decrease">-</button>
            </div>
        `;
        cartContent.appendChild(cartItemElement);
    });

    const quantityButtons = document.querySelectorAll('.quantity-btn');
    quantityButtons.forEach(button => {
        button.addEventListener('click', adjustQuantity);
    });
}

function adjustQuantity(event) {
    const product = event.target.getAttribute('data-product');
    const action = event.target.getAttribute('data-action');
    let cartItem = cartItems.find(item => item.product === product);

    if (cartItem) {
        if (action === 'increase') {
            cartItem.quantity += 1;
        } else if (action === 'decrease') {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else {
                cartItems = cartItems.filter(item => item.product !== product);
            }
        }
    }

    updateCartLink();
    populateCartContent();
}

function updateCartLink() {
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartLink.textContent = `Cart (${cartCount} item${cartCount === 1 ? '' : 's'})`;
}

function showPlaceOrderButton() {
    placeOrderButton.style.display = 'block';
    placeOrderButton.addEventListener('click', placeOrder);
}

function placeOrder() {
    let orderSummary = "Order Summary:\n";
    let total = 0;

    if (cartItems.length === 0) {
        orderSummary += "No items in the order.";
    } else {
        cartItems.forEach(item => {
            orderSummary += `${item.product} - Price: ₦${item.price} - Quantity: ${item.quantity}\n`;
            total += item.price * item.quantity;
        });

        orderSummary += `Total: ₦${total.toFixed(2)}`;
    }

    alert(orderSummary);

    // Clear the cart and update the UI
    cartItems = [];
    updateCartLink();
    populateCartContent();
    placeOrderButton.style.display = 'none';
}

function viewCart() {
    let cartSummary = "Items in cart:\n";
    let subtotal = 0;

    if (cartItems.length === 0) {
        cartSummary += "No items in cart.";
    } else {
        cartItems.forEach(item => {
            cartSummary += `${item.product} - Price: ₦${item.price} - Quantity: ${item.quantity}\n`;
            subtotal += item.price * item.quantity;
        });

        cartSummary += `Subtotal: ₦${subtotal.toFixed(2)}`;
    }

    alert(cartSummary);
}





