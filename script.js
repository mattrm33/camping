document.addEventListener('DOMContentLoaded', () => {
    
    // ------------------------------------
    // 1. Gestion du Menu Hamburger (Responsive)
    // ------------------------------------
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Changer l'icône du hamburger en croix (✕)
        hamburger.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });

    // Fermer le menu lors du clic sur un lien (pour le confort utilisateur sur mobile)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 767) {
                nav.classList.remove('active');
                hamburger.innerHTML = '☰';
            }
        });
    });

    // ------------------------------------
    // 2. Gestion du Slider d'Accueil
    // ------------------------------------
    const slidesData = [
        { 
            title: "Vos Vacances au Cœur du Vercors", 
            subtitle: "Nature, Soleil et Convivialité vous attendent.",
            img: "https://via.placeholder.com/1920x600/4CAF50/FFFFFF?text=PAYSAGE+VERCORS" 
        },
        { 
            title: "Détente au bord de la Piscine", 
            subtitle: "Espace aquatique chauffé pour toute la famille.",
            img: "https://via.placeholder.com/1920x600/FF7F50/FFFFFF?text=PISCINE+CHAUFFEE" 
        },
        { 
            title: "Séjours Insolites : Yourte", 
            subtitle: "Vivez une expérience unique au plus proche de la Lyonne.",
            img: "https://via.placeholder.com/1920x600/FFD700/333333?text=YOURTE+CAMPING" 
        }
    ];
    
    const sliderContainer = document.querySelector('.slider-container');
    
    // Injection des slides
    sliderContainer.innerHTML = slidesData.map((data, index) => `
        <div class="slide ${index === 0 ? 'active' : ''}" style="background-image: url('${data.img}');">
            <h2>${data.title}</h2>
            <p>${data.subtitle}</p>
            <a href="#hebergements" class="btn-primary">Découvrir nos hébergements</a>
        </div>
    `).join('');
    
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Changement automatique toutes les 5 secondes
    setInterval(nextSlide, 5000); 

    // ------------------------------------
    // 3. Gestion simplifiée du Formulaire de Contact
    // ------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simuler la validation et l'envoi
        formMessage.style.display = 'block';
        formMessage.style.color = 'var(--color-secondary)';
        formMessage.style.backgroundColor = 'var(--color-light-green)';
        formMessage.style.padding = '10px';
        formMessage.style.borderRadius = '5px';
        formMessage.innerHTML = '✅ Message envoyé ! Nous vous contacterons rapidement. (Simulation de l\'envoi)';
        
        // Effacer le message et réinitialiser le formulaire après 4 secondes
        setTimeout(() => {
            contactForm.reset();
            formMessage.style.display = 'none';
        }, 4000);
    });
});
