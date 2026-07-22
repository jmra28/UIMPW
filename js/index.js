/*
 * js/index.js
 * Reemplazo vanilla JS de los componentes de Bootstrap exclusivos de
 * index.html: carrusel hero, tabs y acordeón de FAQ. El menú/dropdowns
 * (compartidos con todas las páginas) viven en js/componentes.js.
 */
document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Carrusel hero (#heroCarousel) ---------- */
    var carousel = document.getElementById('heroCarousel');
    if (carousel) {
        var items = Array.prototype.slice.call(carousel.querySelectorAll('.carousel-item'));
        var currentIndex = items.findIndex(function (it) { return it.classList.contains('active'); });
        if (currentIndex < 0) { currentIndex = 0; }
        var intervalId = null;
        var intervalMs = 5000;

        function goTo(index) {
            var next = (index + items.length) % items.length;
            if (next === currentIndex) { return; }
            items[currentIndex].classList.remove('active');
            items[next].classList.add('active');
            currentIndex = next;
        }

        function startAuto() {
            stopAuto();
            intervalId = setInterval(function () { goTo(currentIndex + 1); }, intervalMs);
        }
        function stopAuto() {
            if (intervalId) { clearInterval(intervalId); intervalId = null; }
        }

        var prevBtn = carousel.querySelector('.carousel-control-prev');
        var nextBtn = carousel.querySelector('.carousel-control-next');
        if (prevBtn) {
            prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); startAuto(); });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); startAuto(); });
        }

        carousel.addEventListener('mouseenter', stopAuto);
        carousel.addEventListener('mouseleave', startAuto);

        startAuto();
    }

    /* ---------- Tabs de FAQ ---------- */
    var tabLinks = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetSel = link.getAttribute('href');
            var targetPane = document.querySelector(targetSel);
            if (!targetPane) { return; }

            var tabList = link.closest('.nav');
            var tabContent = targetPane.parentElement;

            tabList.querySelectorAll('.nav-link').forEach(function (l) {
                l.classList.remove('active');
                l.setAttribute('aria-selected', 'false');
            });
            tabContent.querySelectorAll('.tab-pane').forEach(function (p) {
                p.classList.remove('active', 'show');
            });

            link.classList.add('active');
            link.setAttribute('aria-selected', 'true');
            targetPane.classList.add('active', 'show');
        });
    });

    /* ---------- Acordeón de FAQ ---------- */
    function setCollapseHeight(el) {
        el.style.setProperty('--collapse-height', el.scrollHeight + 'px');
    }

    var collapseToggles = document.querySelectorAll('[data-bs-toggle="collapse"]');
    collapseToggles.forEach(function (btn) {
        var targetSel = btn.getAttribute('data-bs-target');
        var target = document.querySelector(targetSel);
        if (!target) { return; }

        if (target.classList.contains('show')) {
            setCollapseHeight(target);
        }

        btn.addEventListener('click', function () {
            var parentSel = btn.getAttribute('data-bs-parent');
            var isOpen = target.classList.contains('show');

            if (parentSel) {
                document.querySelectorAll(parentSel + ' .collapse.show').forEach(function (openEl) {
                    if (openEl !== target) {
                        openEl.classList.remove('show');
                        var otherBtn = document.querySelector('[data-bs-target="#' + openEl.id + '"]');
                        if (otherBtn) { otherBtn.setAttribute('aria-expanded', 'false'); }
                    }
                });
            }

            if (!isOpen) {
                setCollapseHeight(target);
                target.classList.add('show');
                btn.setAttribute('aria-expanded', 'true');
            } else {
                target.classList.remove('show');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    window.addEventListener('resize', function () {
        document.querySelectorAll('.collapse.show').forEach(setCollapseHeight);
    });
});
