/*
 * js/componentes.js
 * Reemplazo vanilla JS de la mecánica de Bootstrap que se repite en
 * TODAS las páginas: menú móvil (navbar-toggler) y dropdowns del nav.
 * Lee los mismos atributos data-bs-* que ya trae el HTML.
 * Se enlaza desde todas las páginas.
 */
document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Menú móvil (navbar-toggler) ---------- */
    var toggler = document.querySelector('.navbar-toggler[data-bs-target]');
    if (toggler) {
        var targetSelector = toggler.getAttribute('data-bs-target');
        var navCollapse = document.querySelector(targetSelector);
        toggler.addEventListener('click', function () {
            var isOpen = navCollapse.classList.toggle('show');
            toggler.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    /* ---------- Dropdowns del nav ---------- */
    var dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    dropdownToggles.forEach(function (toggleEl) {
        var menu = toggleEl.parentElement.querySelector('.dropdown-menu');
        if (!menu) { return; } // ej. "INICIO": sin submenú, se deja navegar normal

        toggleEl.addEventListener('click', function (e) {
            e.preventDefault();
            var alreadyOpen = menu.classList.contains('show');
            closeAllDropdowns();
            if (!alreadyOpen) {
                menu.classList.add('show');
                toggleEl.setAttribute('aria-expanded', 'true');
            }
        });
    });

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu.show').forEach(function (m) {
            m.classList.remove('show');
        });
        document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(function (t) {
            t.setAttribute('aria-expanded', 'false');
        });
    }

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
});
