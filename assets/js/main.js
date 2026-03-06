(() => {
    const nav = document.querySelector('[data-primary-nav]');
    const toggle = document.querySelector('[data-nav-toggle]');

    if (nav && toggle) {
        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('is-open', !expanded);
            toggle.innerHTML = !expanded ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                nav.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.innerHTML = '<i class="ri-menu-line"></i>';
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 920 && nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.innerHTML = '<i class="ri-menu-line"></i>';
            }
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.primary-nav a').forEach((link) => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('is-active');
        }
    });

    document.querySelectorAll('[data-year]').forEach((node) => {
        node.textContent = new Date().getFullYear();
    });

    const faqBlocks = document.querySelectorAll('.js-cd-faq');
    faqBlocks.forEach((faq) => {
        const itemsPanel = faq.querySelector('.cd-faq__items');
        const categories = faq.querySelectorAll('.cd-faq__category');
        const closePanel = faq.querySelector('.cd-faq__close-panel');
        const overlay = faq.querySelector('.cd-faq__overlay');

        const closeMobileFaq = () => {
            if (!itemsPanel) {
                return;
            }
            itemsPanel.classList.remove('cd-faq__items--slide-in');
            faq.classList.remove('cd-faq--panel-open');
        };

        categories.forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetSelector = link.getAttribute('href');
                if (!targetSelector || !targetSelector.startsWith('#')) {
                    return;
                }

                const targetGroup = faq.querySelector(targetSelector);
                if (!targetGroup) {
                    return;
                }

                event.preventDefault();
                categories.forEach((cat) => cat.classList.remove('cd-faq__category-selected'));
                link.classList.add('cd-faq__category-selected');

                if (window.matchMedia('(max-width: 920px)').matches && itemsPanel) {
                    itemsPanel.classList.add('cd-faq__items--slide-in');
                    faq.classList.add('cd-faq--panel-open');
                }

                targetGroup.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        faq.querySelectorAll('.cd-faq__trigger').forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault();

                const item = trigger.closest('.cd-faq__item');
                if (!item) {
                    return;
                }

                const group = item.closest('.cd-faq__group');
                group?.querySelectorAll('.cd-faq__item').forEach((other) => {
                    if (other !== item) {
                        other.classList.remove('cd-faq__item--expanded');
                    }
                });

                item.classList.toggle('cd-faq__item--expanded');
            });
        });

        closePanel?.addEventListener('click', (event) => {
            event.preventDefault();
            closeMobileFaq();
        });

        overlay?.addEventListener('click', () => {
            closeMobileFaq();
        });
    });

    if (window.gsap) {
        const gsap = window.gsap;

        gsap.from('.site-header', {
            y: -26,
            opacity: 0,
            duration: 0.62,
            ease: 'power2.out'
        });

        const heroNodes = document.querySelectorAll('[data-hero-el]');
        if (heroNodes.length) {
            gsap.from(heroNodes, {
                y: 28,
                opacity: 0,
                duration: 0.75,
                ease: 'power2.out',
                stagger: 0.1,
                delay: 0.08
            });
        }

        const animatedNodes = document.querySelectorAll('[data-animate]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                gsap.fromTo(entry.target,
                    { y: 28, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
                );

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });

        animatedNodes.forEach((node) => observer.observe(node));
    }
})();
