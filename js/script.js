document.addEventListener('DOMContentLoaded', function() {
    var myCarousel = document.querySelector('#heroCarousel');
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 5000, // 5 seconds per slide
        ride: 'carousel'       
    });
});

  const track = document.getElementById('programaSliderTrack');
  const slides = document.querySelectorAll('.programa-slide');
  const prevBtn = document.querySelector('.programa-prev');
  const nextBtn = document.querySelector('.programa-next');

  let currentIndex = 0;
  let autoSlideInterval;

  function getVisibleSlidesCount() {
    const containerWidth = document.querySelector('.programa-slider-container').offsetWidth;
    const slideWidth = slides[0].offsetWidth + 20; // incluir márgenes
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

  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    goToNextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    goToPrevSlide();
    startAutoSlide();
  });

  window.addEventListener('resize', updateSlider);

  startAutoSlide();


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


// TESTIMONIAL

jQuery(document).ready(function($) {
        		"use strict";
        		//  TESTIMONIALS CAROUSEL HOOK
		        $('#customers-testimonials').owlCarousel({
		            loop: true,
		            center: true,
		            items: 3,
		            margin: 0,
		            autoplay: true,
		            dots:true,
		            autoplayTimeout: 8500,
		            smartSpeed: 450,
		            responsive: {
		              0: {
		                items: 1
		              },
		              768: {
		                items: 2
		              },
		              1170: {
		                items: 3
		              }
		            }
		        });
        	});

// FIN TESTIMONIAL


$(function() {
    // Use Bootstrap 5 native validation
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');

            if (form.checkValidity()) {
                e.preventDefault(); // Prevent default for demo
                var url = "contact.php";

                var messageAlert = "alert-success";
                var messageText = "Tu mensaje ha sido enviado correctamente, nos comunicaremos contigo pronto.";

                var alertBox = `<div class="alert ${messageAlert} alert-dismissible fade show" role="alert">
                    ${messageText}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

                if (messageAlert && messageText) {
                    $("#contact-form").find(".messages").html(alertBox);
                    form.reset();
                }
            }
        });
    }

    // Function to update program list based on educational level
    window.updateProgramList = function() {
        var level = document.getElementById("form_level").value;
        var programSelect = document.getElementById("form_program");
        programSelect.innerHTML = '<option value="">Selecciona tu programa de interes... *</option>'; // Reset to default

        if (level === "Secundaria" || level === "Preparatoria") {
             programSelect.value = ""; // Clear selection
            programSelect.disabled = true; // Disable the select
        } else {
            programSelect.disabled = false; // Enable the select
            let jsonUrl = '';
            if (level === "Licenciatura") {
                jsonUrl = 'programas/lic.json';
            } else if (level === "Maestría") {
                jsonUrl = 'programas/maes.json';
            } else if (level === "Doctorado") {
                jsonUrl = 'programas/doct.json';
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
                        // Fallback to empty list on error
                        programSelect.value = ""; // Clear on error
                    });
            }
        }
    };

    // Trigger update on page load if a level is pre-selected
    updateProgramList();
});

//talleres

 // barras animadas

