document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. Menu Hamburger Responsive
       ========================================= */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    // Ouverture / Fermeture du menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* =========================================
       2. Slider Héro (Auto + Manuel)
       ========================================= */
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    let currentSlide = 0;
    const slideIntervalTime = 5000; // 5 secondes
    let slideInterval;

    const showSlide = (index) => {
        // Enlève la classe active de toutes les slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Gestion de l'index cyclique
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Ajoute la classe active à la slide courante
        slides[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
        showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
        showSlide(currentSlide - 1);
    };

    // Boutons manuels
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Défilement automatique
    const startSlideShow = () => {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    };

    const resetInterval = () => {
        clearInterval(slideInterval);
        startSlideShow();
    };

    // Lancer le slider
    startSlideShow();

    /* =========================================
       3. Animation Fade-in au Scroll
       ========================================= */
    const observerOptions = {
        threshold: 0.15 // Déclenche quand 15% de l'élément est visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Arrête d'observer une fois animé
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    /* =========================================
       4. Validation des Formulaires
       ========================================= */
    
    // --- Formulaire de Réservation ---
    const bookingForm = document.getElementById('booking-form');
    
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Récupération des valeurs
            const name = document.getElementById('name').value;
            const arrival = document.getElementById('arrival').value;
            const departure = document.getElementById('departure').value;
            const type = document.getElementById('accommodation-type').value;

            // Validation basique des dates
            if (new Date(arrival) >= new Date(departure)) {
                alert("Erreur : La date de départ doit être ultérieure à la date d'arrivée.");
                return;
            }

            // Simulation d'envoi réussi
            alert(`Merci ${name} ! Votre demande de réservation pour un(e) ${type} du ${arrival} au ${departure} a bien été envoyée. Nous vous contacterons rapidement.`);
            bookingForm.reset();
        });
    }

    // --- Formulaire de Contact ---
    const contactForm = document.getElementById('contact-form');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const contactName = document.getElementById('contact-name').value;
            
            alert(`Merci ${contactName}, votre message a bien été envoyé !`);
            contactForm.reset();
        });
    }
});

/* =========================================
   5. Fonction utilitaire globale
   ========================================= */
// Permet de pré-remplir le sélecteur depuis les boutons "Réserver" des cartes
function scrollToBooking(type) {
    const select = document.getElementById('accommodation-type');
    const formSection = document.getElementById('tarifs');
    
    // Scroller vers la section
    formSection.scrollIntoView({ behavior: 'smooth' });
    
    // Sélectionner l'option
    // Petit délai pour laisser le temps au scroll de commencer
    setTimeout(() => {
        // Chercher l'option qui contient le texte ou la valeur
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value === type) {
                select.selectedIndex = i;
                break;
            }
        }
        // Focus visuel
        select.focus();
    }, 500);
}
