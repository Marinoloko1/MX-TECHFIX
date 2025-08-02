//Cerrar segundo apartado de las imagenes

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.redesS').forEach(section => {
        const closeButton = section.querySelector('.close-btn');
        const content = section.querySelector('.redesS__content');

        if (closeButton && content) {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            section.addEventListener('click', (event) => {
                if (event.target !== closeButton) {
                    content.style.transform = 'rotateX(0deg)';
                }
            });

            closeButton.addEventListener('click', (event) => {
                event.stopPropagation();
                content.style.transform = 'rotateX(-90deg)';
            });

            if (!isMobile) {
                window.addEventListener('load', () => {
                    content.style.transform = 'rotateX(-90deg)';
                });
            }
        }
    });
});
