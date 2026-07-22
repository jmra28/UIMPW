document.addEventListener('DOMContentLoaded', function() {
    // Carousel Hero (páginas que aún cargan Bootstrap; index.html ya lo maneja en js/index.js)
    var myCarousel = document.querySelector('#heroCarousel');
    if(myCarousel && typeof bootstrap !== 'undefined') {
        var carousel = new bootstrap.Carousel(myCarousel, {
            interval: 5000,
            ride: 'carousel'
        });
    }

    // Programa Slider
    const track = document.getElementById('programaSliderTrack');
    if(track) {
        const slides = document.querySelectorAll('.programa-slide');
        const prevBtn = document.querySelector('.programa-prev');
        const nextBtn = document.querySelector('.programa-next');

        let currentIndex = 0;
        let autoSlideInterval;

        function getVisibleSlidesCount() {
            const containerWidth = document.querySelector('.programa-slider-container').offsetWidth;
            const slideWidth = slides[0].offsetWidth + 20;
            return Math.floor(containerWidth / slideWidth);
        }

        function updateSlider() {
            const slideWidth = slides[0].offsetWidth + 20;
            const offset = -slideWidth * currentIndex;
            track.style.transform = `translateX(${offset}px)`;
        }

        function goToNextSlide() {
            const visibleCount = getVisibleSlidesCount();
            const maxIndex = slides.length - visibleCount;
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }

        function goToPrevSlide() {
            const visibleCount = getVisibleSlidesCount();
            const maxIndex = slides.length - visibleCount;
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex;
            }
            updateSlider();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(goToNextSlide, 3000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        if(nextBtn) nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            goToNextSlide();
            startAutoSlide();
        });

        if(prevBtn) prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            goToPrevSlide();
            startAutoSlide();
        });

        window.addEventListener('resize', updateSlider);
        startAutoSlide();
    }

    // Estadisticas Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    if(statNumbers.length > 0) {
        function animateNumbers() {
            statNumbers.forEach(number => {
                const target = parseInt(number.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                        number.classList.add('animated');
                    }
                    number.textContent = Math.floor(current);
                }, 16);
            });
        }
        
        // Usar Intersection Observer para animar solo cuando son visibles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Observar el contenedor padre de las estadísticas
        const statsContainer = document.querySelector('.stats-container');
        if(statsContainer) {
            observer.observe(statsContainer);
        } else {
            // Si no hay contenedor, animar directamente
            animateNumbers();
        }
    }
  
    // Contact Form
    const $form = document.querySelector('#contact-form')
    $form.addEventListener('submit', handleSubmit)

    async function handleSubmit(event){
        event.preventDefault()
        const form=new FormData(this)
        const response = await fetch(this.action,{
            method:this.method,
            body:form,
            headers:{
                'Accept': 'application/json'
            }
        })

        if (response.ok){
            this.reset()
            alert('gracias por enviar tus datos pronto un asesor se comunicará contigo')
        }

    }








    // Function to update program list
    window.updateProgramList = function() {
        var level = document.getElementById("form_level");
        var programSelect = document.getElementById("form_program");
        
        if(level && programSelect) {
            programSelect.innerHTML = '<option value="">Selecciona tu programa de interés... *</option>';
            
            if (level.value === "Secundaria" || level.value === "Preparatoria") {
                programSelect.value = "";
                programSelect.disabled = true;
            } else {
                programSelect.disabled = false;
                let jsonUrl = '';
                
                if (level.value === "Licenciatura") {
                    jsonUrl = '/programas/lic.json';
                } else if (level.value === "Maestría") {
                    jsonUrl = '/programas/maes.json';
                } else if (level.value === "Doctorado") {
                    jsonUrl = '/programas/doct.json';
                }

                if (jsonUrl) {
                    fetch(jsonUrl)
                        .then(response => {
                            if (!response.ok) throw new Error('Network response was not ok');
                            return response.json();
                        })
                        .then(programs => {
                            programs.forEach(function(program) {
                                var option = document.createElement("option");
                                option.value = program;
                                option.text = program;
                                programSelect.appendChild(option);
                            });
                        })
                        .catch(error => {
                            console.error('Error fetching programs:', error);
                            programSelect.value = "";
                        });
                }
            }
        }
    };

    // Initialize program list
    updateProgramList();
});

// Talleres (si es necesario)
// barras animadas

 // TESTIMONIAL
    if(typeof jQuery !== 'undefined' && jQuery.fn.owlCarousel) {
        jQuery('#customers-testimonials').owlCarousel({
            loop: true,
            center: true,
            items: 3,
            margin: 0,
            autoplay: true,
            dots: true,
            autoplayTimeout: 8500,
            smartSpeed: 450,
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                1170: { items: 3 }
            }
        });
    }



    // Estadisticas Counter Animation
const counters = document.querySelectorAll('.estadistica-number');
const speed = 200; // Adjust speed of counting (lower is faster)

const animateCounters = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / speed;
    let count = 0;

    const updateCount = () => {
        count += increment;
        if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };

    updateCount();
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const countersInView = entry.target.querySelectorAll('.estadistica-number');
            countersInView.forEach(counter => {
                if (!counter.hasAttribute('data-animated')) {
                    counter.setAttribute('data-animated', 'true');
                    animateCounters(counter);
                }
            });
        }
    });
}, { threshold: 0.5 });

const estadisticasSection = document.querySelector('.estadisticas');
if (estadisticasSection) {
    observer.observe(estadisticasSection);
}

document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".uim-step");
  steps.forEach((step, index) => {
    setTimeout(() => {
      step.classList.add("visible");
    }, index * 800); // Delay para animación escalonada
  });
});



//modal 

const modalInscUimAbrirBtns = document.querySelectorAll('.modal-insc-uim-abrir');
const modalInscUimCerrarBtn = document.getElementById('modal-insc-uim-cerrar');
const modalInscUimOverlay = document.getElementById('modal-insc-uim-overlay');

// Agregar evento a todos los botones para abrir el modal
modalInscUimAbrirBtns.forEach(boton => {
    boton.addEventListener('click', () => {
        modalInscUimOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Cerrar modal
modalInscUimCerrarBtn.addEventListener('click', () => {
    modalInscUimOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Cerrar modal al hacer clic fuera del contenido
modalInscUimOverlay.addEventListener('click', (e) => {
    if (e.target === modalInscUimOverlay) {
        modalInscUimOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalInscUimOverlay.classList.contains('active')) {
        modalInscUimOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
