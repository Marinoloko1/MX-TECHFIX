function sendTechRequest() {
    // Obtener valores del formulario
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const device = document.querySelector('input[name="device"]:checked').value;
    const brand = document.getElementById('brand').value.trim();
    const problem = document.getElementById('problem').value.trim();
    const service = document.getElementById('service').value;

    // Validación básica
    if (!name || !phone || !device || !brand || !problem || !service) {
        alert('Por favor complete todos los campos obligatorios (*)');
        return;
    }

    // Validar teléfono (10 dígitos)
    if (!/^[0-9]{10}$/.test(phone)) {
        alert('Por favor ingrese un número de teléfono válido (10 dígitos)');
        return;
    }

    // Construir mensaje para WhatsApp
    let message = `*SOLICITUD DE SERVICIO TÉCNICO*%0A%0A`;
    message += `*Nombre:* ${name}%0A`;
    message += `*Teléfono:* ${phone}%0A`;
    if (email) message += `*Email:* ${email}%0A`;
    message += `*Dispositivo:* ${device}%0A`;
    message += `*Marca/Modelo:* ${brand}%0A`;
    message += `*Tipo de servicio:* ${service}%0A%0A`;
    message += `*Descripción del problema:*%0A${problem}%0A%0A`;
    message += `Por favor contácteme para coordinar la revisión del equipo.`;

    // Codificar URI y abrir WhatsApp
    const whatsappNumber = '524691760358';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.location.href = whatsappUrl;
}