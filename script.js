document.addEventListener("DOMContentLoaded", () => {

    // --- 2. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.section-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Si la sección tiene barras de progreso, animarlas
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    bar.classList.add('animate');
                });

                observer.unobserve(entry.target); // Dejar de observar una vez que se muestra
            }
        });
    }, {
        root: null,
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 3. Efectos 3D de Inclinación (Mouse movement in cards) - Opcional para extra "Wow factor" ---
    const cards = document.querySelectorAll('.interactive');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculando el centro y aplicando una leve rotación
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3; // Max rotación de 3deg
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `perspective(1000px) translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg)';
        });
    });

});
