/* todos los carruseles //////////////////////////////////////////////////////////*/
$(document).ready(function () {
  // Configuraciones de los carruseles
  const carousels = [
    {
      id: 'mini-carrusel',
      settings: {
        autoplay: true,
        autoplayTimeout: 2500,
        autoplayHoverPause: true,
        loop: true,
        items: 1,
        smartSpeed: 700,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn'
      }
    },
    {
      id: 'carrusel-empresas',
      settings: {
        loop: true,
        autoplay: true,
        autoplayTimeout: 1500,
  
        smartSpeed: 400,
        margin: 20,
        responsive: {
          0: {
            items: 2
          },
          600: {
            items: 4
          },
          1000: {
            items: 6
          }
        }
      }
    },
    {
      id: 'carrusel-divs',
      settings: {
      
        autoplay: true,
        autoplayTimeout: 2500,
            loop: true,
            margin: 20,
            autoplay: true,
            autoplayTimeout: 2500,
            smartSpeed: 600,
            responsive: {
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 3 }
            }

        
      }
    }
    
    // Agrega más carruseles aquí con sus IDs y configuraciones
  ];

  // Inicializar cada carrusel
  carousels.forEach(carousel => {
    const $carousel = $(`#${carousel.id}`);
    const storageKey = `carouselIndex_${carousel.id}`;
    let startIndex = parseInt(localStorage.getItem(storageKey)) || 0;

    // Inicializar el carrusel con su configuración
    $carousel.owlCarousel({
      ...carousel.settings,
      startPosition: startIndex,
      onInitialized: function () {
        $carousel.trigger('to.owl.carousel', [startIndex, 0]);
      }
    });

    // Guardar el índice de la diapositiva actual cuando cambie
    $carousel.on('changed.owl.carousel', function (event) {
      const currentIndex = event.item.index;
      if (currentIndex !== null) {
        localStorage.setItem(storageKey, currentIndex);
      }
    });
  });

  // Manejar visibilidad para reactivar todos los carruseles
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      carousels.forEach(carousel => {
        const $carousel = $(`#${carousel.id}`);
        $carousel.trigger('play.owl.autoplay', [carousel.settings.autoplayTimeout]);
      });
    } else {
      carousels.forEach(carousel => {
        const $carousel = $(`#${carousel.id}`);
        $carousel.trigger('stop.owl.autoplay');
      });
    }
  });
});



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

 document.getElementById('video-fondo-particulas').playbackRate = 0.5; // Ralentiza a la mitad de la velocidad