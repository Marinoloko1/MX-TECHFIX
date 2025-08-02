
function enviarWhatsApp() {
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const marca = document.getElementById('marca').value.trim();
    const servicio = document.getElementById('servicio').value;
    const problema = document.getElementById('problema').value.trim();

    // Validar campos requeridos
    if (!nombre || !telefono || !marca || servicio === "" || !problema) {
        alert('Por favor complete todos los campos requeridos');
        return;
    }

    // Validar formato de teléfono (opcional)
    if (!/^[0-9]{10}$/.test(telefono)) {
        alert('Por favor ingrese un número de teléfono válido (10 dígitos)');
        return;
    }

    // Construir el mensaje
    let mensaje = `¡Hola! Necesito servicio para mi celular:%0A%0A`;
    mensaje += `*Nombre:* ${nombre}%0A`;
    mensaje += `*Teléfono:* ${telefono}%0A`;
    if (email) mensaje += `*Email:* ${email}%0A`;
    mensaje += `*Marca del celular:* ${marca}%0A`;
    mensaje += `*Servicio requerido:* ${servicio}%0A`;
    mensaje += `*Descripción del problema:*%0A${problema}%0A%0A`;
    mensaje += `Por favor contáctenme para coordinar el servicio. ¡Gracias!`;

    // Número de WhatsApp (con código de país para México)
    const numeroWhatsApp = '524691760358';

    // Crear el enlace de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

    // Abrir WhatsApp
    window.location.href = urlWhatsApp;
}
