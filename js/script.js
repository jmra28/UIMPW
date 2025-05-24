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