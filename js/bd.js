const productsDatabase = [
    {
        id: 1,
        name: "Pantalla LCD iPhone 11",
        category: "pantallas",
        price: 400.00,
        originalPrice: 450.00,
        image: "img/Productos/pantalla11.jpg",
        description: "Pantalla original de repuesto con garantía",
        stock: 15,
        rating: 4.5,
        isOffer: true
    },
    {
        id: 2,
        name: "Batería Samsung Galaxy S20",
        category: "baterias",
        price: 569.00,
        image: "img/Productos/BateriaS20.webp",
        description: "Batería original 4000mAh con certificación",
        stock: 8,
        rating: 4.2
    },
    {
        id: 3,
        name: "Cargador Rápido 20W USB-C",
        category: "accesorios",
        price: 70.00,
        image: "img/Productos/cargador20w.webp",
        description: "Carga rápida compatible con iPhone y Android",
        stock: 12,
        rating: 4.7
    },
    {
        id: 4,
        name: "Funda Protectora iPhone 13",
        category: "accesorios",
        price: 315.00,
        image: "img/Productos/funda.jpeg",
        description: "Funda resistente a golpes y caídas",
        stock: 20,
        rating: 4.3
    },
    {
        id: 5,
        name: "Kit de Reparación Profesional",
        category: "herramientas",
        price: 280.00,
        image: "img/Productos/kit.jpg",
        description: "24 piezas para reparación de dispositivos",
        stock: 5,
        rating: 4.9
    },
    {
        id: 6,
        name: "Vidrio Templado Samsung S21",
        category: "accesorios",
        price: 60.00,
        image: "img/Productos/vidrio.jpg",
        description: "Protección 9H contra rayaduras",
        stock: 18,
        rating: 4.0
    },
    {
        id: 7,
        name: "Pantalla OLED iPhone 12",
        category: "pantallas",
        price: 280.00,
        originalPrice: 329.41,
        image: "img/Productos/oled.webp",
        description: "Pantalla OLED original con instalación incluida",
        stock: 7,
        rating: 4.8,
        isOffer: true
    },
    {
        id: 8,
        name: "Conector de Carga USB-C",
        category: "repuestos",
        price: 98.00,
        image: "img/Productos/tipoc.jpg",
        description: "Repuesto original para puerto de carga",
        stock: 10,
        rating: 3.9
    }
];

// Variables globales
let currentProducts = [];
let activeCategory = 'all';
let searchTerm = '';

// Elementos del DOM
const productGrid = document.getElementById('product-grid');
const categoryLinks = document.querySelectorAll('.category-link');
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const showOffersBtn = document.getElementById('show-offers');

// Inicializar la tienda
document.addEventListener('DOMContentLoaded', () => {
    currentProducts = [...productsDatabase];
    renderProducts(currentProducts);

    // Mostrar productos en oferta al hacer clic en el botón
    showOffersBtn.addEventListener('click', () => {
        filterProductsByCategory('pantallas');
        const pantallasLink = document.querySelector('[data-category="pantallas"]');
        categoryLinks.forEach(link => link.classList.remove('active'));
        pantallasLink.classList.add('active');
        activeCategory = 'pantallas';
    });
});

// Filtrado por categoría
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.dataset.category;

        // Actualizar categoría activa
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        activeCategory = category;

        // Filtrar productos
        filterProducts(category, searchTerm);
    });
});

// Búsqueda de productos
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchTerm = searchInput.value.trim().toLowerCase();
    filterProducts(activeCategory, searchTerm);
});

// Búsqueda en tiempo real
searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value.trim().toLowerCase();
    filterProducts(activeCategory, searchTerm);
});

// Función para filtrar productos
function filterProducts(category, search = '') {
    let filtered = productsDatabase;

    // Filtrar por categoría
    if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }

    // Filtrar por término de búsqueda
    if (search) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search)
        );
    }

    currentProducts = filtered;
    renderProducts(currentProducts);
}

// Función para renderizar productos
function renderProducts(products) {
    if (products.length === 0) {
        productGrid.innerHTML = `
                    <div class="no-results">
                        <i class="las la-search"></i>
                        <p>No se encontraron productos</p>
                        <button class="hm-btn btn-primary" onclick="resetFilters()">Mostrar todos</button>
                    </div>
                `;
        return;
    }

    productGrid.innerHTML = products.map(product => `
                <div class="product-item" data-category="${product.category}" data-id="${product.id}">
                    <div class="p-portada">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.isOffer ? '<span class="stin stin-sale">OFERTA</span>' : ''}
                        ${product.stock < 5 ? '<span class="stin stin-stock">ÚLTIMAS UNIDADES</span>' : ''}
                    </div>
                    <div class="p-info">
                        <h3>${product.name}</h3>
                        <p class="product-desc">${product.description}</p>
                        <div class="precio">
                            ${product.isOffer ? `<span class="old-price">$/ ${product.originalPrice.toFixed(2)}</span>` : ''}
                            <span>$/ ${product.price.toFixed(2)}</span>
                        </div>
                        <div class="product-meta">
                            <span class="stock ${product.stock > 5 ? 'in-stock' : 'low-stock'}">
                                ${product.stock > 5 ? 'En stock' : 'Últimas unidades'}
                            </span>
                            <div class="rating">
                                ${renderRating(product.rating)}
                                <span>(${product.rating.toFixed(1)})</span>
                            </div>
                        </div>
                        <div class="product-actions">
                            <button class="hm-btn btn-primary uppercase add-to-cart">AGREGAR AL CARRITO</button>
                            <button class="wishlist-btn"><i class="lar la-heart"></i></button>
                        </div>
                    </div>
                </div>
            `).join('');

    // Agregar eventos a los botones
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// Función para renderizar estrellas de valoración
function renderRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="las la-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="las la-star-half-alt"></i>';
        } else {
            stars += '<i class="lar la-star"></i>';
        }
    }

    return stars;
}

// Función para agregar al carrito
document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los botones "AGREGAR AL CARRITO"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');

    // Inicializa el contador
    let count = 0;

    // Añade evento click a cada botón
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Incrementa el contador
            count++;
            // Actualiza el número en el carrito
            cartCount.textContent = count;

            // Opcional: puedes añadir una animación o feedback visual
            this.textContent = '✓ Añadido';
            setTimeout(() => {
                this.textContent = 'AGREGAR AL CARRITO';
            }, 1000);
        });
    });
});

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
                <i class="las la-check-circle"></i>
                <span>${message}</span>
            `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Función para resetear filtros
window.resetFilters = function () {
    searchInput.value = '';
    searchTerm = '';
    activeCategory = 'all';

    categoryLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.category === 'all') {
            link.classList.add('active');
        }
    });

    currentProducts = [...productsDatabase];
    renderProducts(currentProducts);
}