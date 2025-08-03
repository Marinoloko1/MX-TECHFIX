// Versión mejorada con búsqueda en tiempo real
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    const searchResults = document.getElementById('search-results');
    const productGrid = document.getElementById('product-grid');

    // Base de datos de productos (deberías reemplazarla con tus productos reales)
    const products = [
        { id: 1, name: "Pantalla LCD iPhone 11", category: "Pantallas", price: 250, image: "images/pantalla-iphone11.jpg", desc: "Pantalla original de repuesto" },
        // Agrega más productos aquí...
    ];

    // Mostrar todos los productos al inicio
    displayProducts(products);

    // Búsqueda en tiempo real
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.trim().toLowerCase();

        if (searchTerm.length === 0) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            displayProducts(products);
            return;
        }

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.desc.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );

        displayProducts(filteredProducts);
        showQuickResults(searchTerm);
    });

    // Mostrar resultados en el grid
    function displayProducts(productsToShow) {
        productGrid.innerHTML = '';

        if (productsToShow.length === 0) {
            productGrid.innerHTML = '<p class="no-results">No se encontraron productos. Intenta con otros términos.</p>';
            return;
        }

        productsToShow.forEach(product => {
            productGrid.innerHTML += createProductCard(product);
        });
    }

    // Mostrar resultados rápidos en el dropdown
    function showQuickResults(searchTerm) {
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const quickResults = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        ).slice(0, 5); // Mostrar máximo 5 sugerencias

        searchResults.innerHTML = '';

        if (quickResults.length > 0) {
            quickResults.forEach(product => {
                const resultItem = document.createElement('a');
                resultItem.href = '#';
                resultItem.innerHTML = `
                    <div class="quick-result-item">
                        <img src="${product.image}" alt="${product.name}" width="40">
                        <span>${product.name}</span>
                        <span class="quick-result-price">S/ ${product.price.toFixed(2)}</span>
                    </div>
                `;
                resultItem.addEventListener('click', function (e) {
                    e.preventDefault();
                    searchInput.value = product.name;
                    displayProducts([product]);
                    searchResults.style.display = 'none';
                });
                searchResults.appendChild(resultItem);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    }

    // Crear tarjeta de producto
    function createProductCard(product) {
        return `
            <div class="product-item">
                <div class="p-portada">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.category === 'Pantallas' ? '<span class="stin stin-sale">-15%</span>' : ''}
                </div>
                <div class="p-info">
                    <h3>${product.name}</h3>
                    <p class="product-desc">${product.desc}</p>
                    <div class="precio">
                        ${product.category === 'Pantallas' ?
                `<span class="old-price">S/ ${(product.price / 0.85).toFixed(2)}</span>` : ''}
                        <span>S/ ${product.price.toFixed(2)}</span>
                    </div>
                    <div class="product-actions">
                        <a href="#" class="hm-btn btn-primary uppercase">AGREGAR AL CARRITO</a>
                        <button class="wishlist-btn"><i class="lar la-heart"></i></button>
                    </div>
                </div>
            </div>
        `;
    }

    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', function (e) {
        if (!searchForm.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
});