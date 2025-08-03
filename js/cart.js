// Función para añadir productos al carrito
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
    
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar contador del carrito
    updateCartCount();

    // Mostrar notificación
    showCartNotification();
}

// Actualizar contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Mostrar notificación
function showCartNotification() {
    const notification = document.getElementById('cartNotification');
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Inicializar contador del carrito al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();

    // Añadir eventos a los botones "AGREGAR AL CARRITO"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));

            addToCart(productName, productPrice);

            // Feedback visual
            const originalText = this.textContent;
            this.textContent = '✓ Añadido';
            setTimeout(() => {
                this.textContent = originalText;
            }, 1000);
        });
    });
});