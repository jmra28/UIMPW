/*
 * js/componentes.js
 * Reemplazo vanilla JS de la mecánica de Bootstrap que se repite en
 * TODAS las páginas: menú móvil (navbar-toggler) y dropdowns del nav.
 * Lee los mismos atributos data-bs-* que ya trae el HTML.
 * Se enlaza desde todas las páginas.
 *
 * Los listeners van en document (delegación) y no en los botones/
 * enlaces directamente: algunas extensiones del navegador (gestores
 * de contraseñas tipo LastPass/Dashlane, que marcan los elementos con
 * un atributo "fdprocessedid") clonan o reemplazan esos elementos
 * después de que la página carga, y un clon no conserva los
 * addEventListener puestos sobre el nodo original. Delegar en
 * document evita depender de que el nodo exacto siga siendo el mismo.
 */
document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Menú móvil (navbar-toggler) ---------- */
    document.addEventListener('click', function (e) {
        var toggler = e.target.closest('.navbar-toggler[data-bs-target]');
        if (!toggler) { return; }
        var navCollapse = document.querySelector(toggler.getAttribute('data-bs-target'));
        if (!navCollapse) { return; }
        var isOpen = navCollapse.classList.toggle('show');
        toggler.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* ---------- Dropdowns del nav ---------- */
    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu.show').forEach(function (m) {
            m.classList.remove('show');
        });
        document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(function (t) {
            t.setAttribute('aria-expanded', 'false');
        });
    }

    document.addEventListener('click', function (e) {
        var toggleEl = e.target.closest('[data-bs-toggle="dropdown"]');

        if (toggleEl) {
            var menu = toggleEl.parentElement.querySelector('.dropdown-menu');
            if (!menu) { return; } // ej. "INICIO": sin submenú, se deja navegar normal
            e.preventDefault();
            var alreadyOpen = menu.classList.contains('show');
            closeAllDropdowns();
            if (!alreadyOpen) {
                menu.classList.add('show');
                toggleEl.setAttribute('aria-expanded', 'true');
            }
            return;
        }

        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
});
