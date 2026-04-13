(() => {
    const gsap = window.gsap || null;
    const nav = document.querySelector('[data-primary-nav]');
    const toggle = document.querySelector('[data-nav-toggle]');

    if (nav && toggle) {
        const serviceMenus = nav.querySelectorAll('.nav-services');

        const closeServiceMenus = () => {
            serviceMenus.forEach((menu) => {
                menu.classList.remove('is-open');
                const trigger = menu.querySelector('.nav-services__trigger');
                trigger?.setAttribute('aria-expanded', 'false');
            });
        };

        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('is-open', !expanded);
            toggle.innerHTML = !expanded ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
            if (expanded) {
                closeServiceMenus();
            }
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                nav.classList.remove('is-open');
                closeServiceMenus();
                toggle.setAttribute('aria-expanded', 'false');
                toggle.innerHTML = '<i class="ri-menu-line"></i>';
            });
        });

        serviceMenus.forEach((menu) => {
            const trigger = menu.querySelector('.nav-services__trigger');
            trigger?.addEventListener('click', (event) => {
                if (!window.matchMedia('(max-width: 920px)').matches) {
                    return;
                }

                event.preventDefault();
                const expanded = trigger.getAttribute('aria-expanded') === 'true';
                closeServiceMenus();
                menu.classList.toggle('is-open', !expanded);
                trigger.setAttribute('aria-expanded', String(!expanded));
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 920 && nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
                closeServiceMenus();
                toggle.setAttribute('aria-expanded', 'false');
                toggle.innerHTML = '<i class="ri-menu-line"></i>';
            }
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.primary-nav > a, .nav-services__panel a').forEach((link) => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('is-active');
        }
    });

    document.querySelectorAll('.nav-services').forEach((menu) => {
        const trigger = menu.querySelector('.nav-services__trigger');
        const hasActiveChild = menu.querySelector('.nav-services__panel a.is-active');
        if (hasActiveChild) {
            trigger?.classList.add('is-active');
            menu.classList.add('has-active');
        }
    });

    document.querySelectorAll('[data-year]').forEach((node) => {
        node.textContent = new Date().getFullYear();
    });

    const getScrollOffset = () => {
        const header = document.querySelector('.site-header');
        return (header?.getBoundingClientRect().height || 0) + 18;
    };

    const smoothScrollToNode = (target, {
        duration = 0.85,
        delay = 0.08,
        updateHash = false,
        hashValue = ''
    } = {}) => {
        if (!target) {
            return;
        }

        const targetY = Math.max(
            target.getBoundingClientRect().top + window.scrollY - getScrollOffset(),
            0
        );

        if (!gsap) {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
            if (updateHash && hashValue) {
                window.setTimeout(() => {
                    window.history.replaceState(null, '', hashValue);
                }, 220);
            }
            return;
        }

        const scrollState = { y: window.scrollY };
        gsap.killTweensOf(scrollState);
        gsap.to(scrollState, {
            y: targetY,
            duration,
            delay,
            ease: 'power2.out',
            overwrite: true,
            onUpdate: () => {
                window.scrollTo(0, scrollState.y);
            },
            onComplete: () => {
                if (updateHash && hashValue) {
                    window.history.replaceState(null, '', hashValue);
                }
            }
        });
    };

    document.querySelectorAll('a[href^="#"]:not([href="#0"])').forEach((link) => {
        if (link.classList.contains('cd-faq__category')) {
            return;
        }

        link.addEventListener('click', (event) => {
            const hashValue = link.getAttribute('href');
            if (!hashValue || hashValue === '#') {
                return;
            }

            const target = document.querySelector(hashValue);
            if (!target) {
                return;
            }

            event.preventDefault();
            smoothScrollToNode(target, {
                duration: 0.95,
                delay: 0.06,
                updateHash: true,
                hashValue
            });
        });
    });

    if (window.location.hash && window.location.hash !== '#0') {
        const initialTarget = document.querySelector(window.location.hash);
        if (initialTarget) {
            window.requestAnimationFrame(() => {
                smoothScrollToNode(initialTarget, {
                    duration: 0.95,
                    delay: 0.18
                });
            });
        }
    }

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

                smoothScrollToNode(targetGroup, {
                    duration: 0.82,
                    delay: 0.1,
                    updateHash: true,
                    hashValue: targetSelector
                });
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

    const contactFab = document.querySelector('[data-contact-fab]');
    if (contactFab) {
        const fabToggle = contactFab.querySelector('[data-contact-toggle]');

        const closeFab = () => {
            contactFab.classList.remove('is-open');
            fabToggle?.setAttribute('aria-expanded', 'false');
        };

        fabToggle?.addEventListener('click', () => {
            const expanded = fabToggle.getAttribute('aria-expanded') === 'true';
            contactFab.classList.toggle('is-open', !expanded);
            fabToggle.setAttribute('aria-expanded', String(!expanded));
        });

        document.addEventListener('click', (event) => {
            if (!contactFab.contains(event.target)) {
                closeFab();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeFab();
            }
        });
    }

    document.querySelectorAll('[data-whatsapp-form]').forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const whatsappNumber = (form.dataset.whatsappNumber || '971585824210').replace(/\D/g, '');
            const formData = new FormData(form);

            const name = (formData.get('name') || '').toString().trim();
            const phone = (formData.get('phone') || '').toString().trim();
            const email = (formData.get('email') || '').toString().trim();
            const service = (formData.get('service') || '').toString().trim();
            const message = (formData.get('message') || '').toString().trim();

            const text = [
                'New Website Inquiry',
                `Name: ${name || '-'}`,
                `Phone: ${phone || '-'}`,
                `Email: ${email || '-'}`,
                `Service: ${service || '-'}`,
                `Message: ${message || '-'}`
            ].join('\n');

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
            const opened = window.open(whatsappUrl, '_blank', 'noopener');

            if (!opened) {
                window.location.href = whatsappUrl;
            }
        });
    });

    if (gsap) {
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

        const animatedNodes = Array.from(document.querySelectorAll('[data-animate]'));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const revealIndex = animatedNodes.indexOf(entry.target);
                const revealDelay = revealIndex >= 0 ? (revealIndex % 3) * 0.08 : 0;

                gsap.fromTo(entry.target,
                    { y: 28, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        delay: revealDelay,
                        ease: 'power2.out'
                    }
                );

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });

        animatedNodes.forEach((node) => observer.observe(node));
    }
})();
