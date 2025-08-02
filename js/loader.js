document.getElementById("cargarTienda").addEventListener("click", function () {
    const loader = document.getElementById("loader-wrapper");
    const resultado = document.getElementById("resultado");

    loader.style.display = "flex"; // Mostrar loader

    fetch("tienda.html")
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar la tienda");
            return response.text();
        })
        .then(data => {
            resultado.innerHTML = data; // Mostrar el contenido cargado
        })
        .catch(err => {
            resultado.innerHTML = "<p>Error al cargar el contenido.</p>";
            console.error(err);
        })
        .finally(() => {
            loader.style.display = "none"; // Ocultar loader al finalizar
        });
});
