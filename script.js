document.addEventListener("DOMContentLoaded", () => {
    
    /* ------------------------------------------------
       1. Menu Hamburger Responsive
    ------------------------------------------------ */
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    // Ouvrir/Fermer le menu au clic sur l'icône
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        // Animation simple de l'icône (optionnel)
        hamburger.classList.toggle("open");
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    /* ------------------------------------------------
       2. Slider d'Images (Hero)
    ------------------------------------------------ */
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev-slide");
    const nextBtn = document.querySelector(".next-slide");
    let currentSlide = 0;
    const slideIntervalTime = 5000; // 5 secondes
    let slideInterval;

    // Fonction pour afficher une slide spécifique
    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    };

    // Slide suivante
    const nextSlide = () => {
        currentSlide++;
        if (currentSlide > slides.length - 1) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    };

    // Slide précédente
    const prevSlide = () => {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        showSlide(currentSlide);
    };

    // Écouteurs d'événements pour les flèches
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetInterval();
    });

    // Autoplay
    const startInterval = () => {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    };

    const resetInterval = () => {
        clearInterval(slideInterval);
        startInterval();
    };

    // Démarrer le slider
    startInterval();

    /* ------------------------------------------------
       3. Animation Fade-in au Scroll
    ------------------------------------------------ */
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.2, // Déclenche quand 20% de l'élément est visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target); // Arrête d'observer une fois apparu
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* ------------------------------------------------
       4. Validation Formulaire Réservation (Simple)
    ------------------------------------------------ */
    const bookingForm = document.getElementById("bookingForm");
    
    if(bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Empêche l'envoi réel pour la démo

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const arrival = new Date(document.getElementById("arrival").value);
            const departure = new Date(document.getElementById("departure").value);
            
            // Vérification basique
            if (name === "" || email === "") {
                alert("Merci de remplir tous les champs obligatoires.");
                return;
            }

            if (arrival >= departure) {
                alert("La date de départ doit être postérieure à la date d'arrivée.");
                return;
            }

            // Simulation d'envoi réussi
            alert(`Merci ${name} ! Votre demande de réservation du ${arrival.toLocaleDateString()} au ${departure.toLocaleDateString()} a bien été envoyée.`);
            bookingForm.reset();
        });
    }

    /* ------------------------------------------------
       5. Validation Formulaire Contact
    ------------------------------------------------ */
    const contactForm = document.getElementById("contactForm");

    if(contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("contactEmail").value;
            
            // Regex simple pour email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if(!emailRegex.test(email)) {
                alert("Veuillez entrer une adresse email valide.");
                return;
            }

            alert("Message envoyé avec succès ! Nous vous répondrons sous 24h.");
            contactForm.reset();
        });
    }
});
