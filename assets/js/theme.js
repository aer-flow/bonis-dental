document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const responsiveHeroVideos = document.querySelectorAll('video[data-desktop-src]');

    if (responsiveHeroVideos.length) {
        const mobileVideoQuery = window.matchMedia('(max-width: 767px)');
        const attemptVideoPlayback = (video) => {
            if (prefersReducedMotion || !video.isConnected) {
                return;
            }

            video.muted = true;
            video.defaultMuted = true;
            video.playsInline = true;
            video.setAttribute('muted', '');
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');

            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {});
            }
        };

        const syncResponsiveVideoSource = (video) => {
            const source = video.querySelector('source');
            const desktopSrc = video.dataset.desktopSrc;
            const mobileSrc = video.dataset.mobileSrc;
            const nextSrc = mobileVideoQuery.matches && mobileSrc ? mobileSrc : desktopSrc;

            if (!source || !nextSrc) {
                return;
            }

            video.preload = mobileVideoQuery.matches ? 'auto' : 'metadata';

            if (source.getAttribute('src') === nextSrc) {
                attemptVideoPlayback(video);
                return;
            }

            source.setAttribute('src', nextSrc);
            video.load();
        };

        responsiveHeroVideos.forEach((video) => {
            syncResponsiveVideoSource(video);

            video.addEventListener('loadeddata', () => {
                attemptVideoPlayback(video);
            });

            video.addEventListener('canplay', () => {
                attemptVideoPlayback(video);
            });
        });

        const refreshResponsiveVideos = () => {
            responsiveHeroVideos.forEach((video) => {
                syncResponsiveVideoSource(video);
            });
        };

        if (typeof mobileVideoQuery.addEventListener === 'function') {
            mobileVideoQuery.addEventListener('change', refreshResponsiveVideos);
        } else if (typeof mobileVideoQuery.addListener === 'function') {
            mobileVideoQuery.addListener(refreshResponsiveVideos);
        }

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                responsiveHeroVideos.forEach((video) => {
                    attemptVideoPlayback(video);
                });
            }
        });

        window.addEventListener('pageshow', () => {
            responsiveHeroVideos.forEach((video) => {
                attemptVideoPlayback(video);
            });
        });
    }

    // Inițializare Animații Premium (AOS)
    if (window.AOS) {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Animatie sublinieri sectiuni
    const accentLines = document.querySelectorAll('main .gold-accent-line, main .eyebrow');

    if (accentLines.length) {
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            accentLines.forEach((line) => line.classList.add('is-visible'));
        } else {
            const accentGroups = new Map();

            accentLines.forEach((line) => {
                line.classList.remove('is-visible');

                const trigger = line.closest('section, .section-block, .team-bridge, .contact-v2-container') || line.parentElement;

                if (!trigger) {
                    return;
                }

                if (!accentGroups.has(trigger)) {
                    accentGroups.set(trigger, []);
                }

                accentGroups.get(trigger).push(line);
            });

            const accentObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const lines = accentGroups.get(entry.target) || [];

                    window.requestAnimationFrame(() => {
                        window.requestAnimationFrame(() => {
                            lines.forEach((line, index) => {
                                window.setTimeout(() => {
                                    line.classList.add('is-visible');
                                }, index * 80);
                            });
                        });
                    });

                    observer.unobserve(entry.target);
                });
            }, {
                threshold: 0.3,
                rootMargin: '0px 0px -18% 0px'
            });

            accentGroups.forEach((_, trigger) => accentObserver.observe(trigger));
        }
    }

    // Meniu mobil
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');

    if (toggle && nav) {
        const closeMenu = () => {
            toggle.setAttribute('aria-expanded', 'false');
            nav.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('menu-open');
        };

        const openMenu = () => {
            toggle.setAttribute('aria-expanded', 'true');
            nav.setAttribute('aria-hidden', 'false');
            document.body.classList.add('menu-open');
        };

        closeMenu();

        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        window.addEventListener('pageshow', closeMenu);
        window.addEventListener('resize', () => {
            if (window.innerWidth > 960) {
                closeMenu();
            }
        });
    }

    // Header transparent la scroll
    const header = document.querySelector('.site-header');
    if (header) {
        const updateHeaderState = () => {
            if (window.scrollY > 50) {
                header.classList.add('is-scrolled');
                header.style.backgroundColor = 'rgba(11, 15, 20, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.classList.remove('is-scrolled');
                header.style.backgroundColor = 'transparent';
                header.style.backdropFilter = 'none';
            }
        };

        updateHeaderState();
        window.addEventListener('scroll', updateHeaderState, { passive: true });
    }

    // Lista servicii - toggle real pe mobil
    const serviceLists = document.querySelectorAll('[data-service-list]');

    serviceLists.forEach((list) => {
        const items = Array.from(list.querySelectorAll('.service-list-item'));

        if (!items.length) {
            return;
        }

        const isMobileLayout = () => window.innerWidth <= 960;

        const setItemState = (item, isOpen) => {
            const trigger = item.querySelector('[data-service-list-trigger]');
            const panel = item.querySelector('.service-list-item__panel');

            if (!trigger || !panel) {
                return;
            }

            item.classList.toggle('is-open', isOpen);
            trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

            if (isMobileLayout()) {
                panel.style.maxHeight = isOpen ? `${panel.scrollHeight}px` : '0px';
            } else {
                panel.style.maxHeight = '';
            }
        };

        const closeAllItems = (exceptItem = null) => {
            items.forEach((item) => {
                if (item !== exceptItem) {
                    setItemState(item, false);
                }
            });
        };

        const syncServiceList = () => {
            items.forEach((item) => {
                const trigger = item.querySelector('[data-service-list-trigger]');
                const panel = item.querySelector('.service-list-item__panel');

                if (!trigger || !panel) {
                    return;
                }

                if (!isMobileLayout()) {
                    item.classList.remove('is-open');
                    trigger.setAttribute('aria-expanded', 'false');
                    panel.setAttribute('aria-hidden', 'true');
                    panel.style.maxHeight = '';
                    return;
                }

                panel.style.maxHeight = item.classList.contains('is-open') ? `${panel.scrollHeight}px` : '0px';
            });
        };

        items.forEach((item) => {
            const trigger = item.querySelector('[data-service-list-trigger]');

            if (!trigger) {
                return;
            }

            trigger.setAttribute('aria-expanded', 'false');

            trigger.addEventListener('click', () => {
                if (!isMobileLayout()) {
                    return;
                }

                const shouldOpen = !item.classList.contains('is-open');
                closeAllItems(shouldOpen ? item : null);
                setItemState(item, shouldOpen);
            });
        });

        syncServiceList();
        window.addEventListener('resize', syncServiceList);
        window.addEventListener('pageshow', syncServiceList);
    });

    // Carusel recenzii homepage
    const reviewCarousels = document.querySelectorAll('[data-review-carousel]');

    reviewCarousels.forEach((carousel) => {
        const viewport = carousel.querySelector('[data-review-viewport]');
        const track = carousel.querySelector('[data-review-track]');
        const prevButton = carousel.querySelector('[data-review-prev]');
        const nextButton = carousel.querySelector('[data-review-next]');

        if (!viewport || !track || !prevButton || !nextButton) {
            return;
        }

        const cards = Array.from(track.querySelectorAll('.premium-review-card, .review-card'));
        const loopingEnabled = cards.length > 1;
        let autoScrollId = null;
        let isPaused = false;
        let lastFrameTime = 0;

        if (loopingEnabled) {
            cards.forEach((card) => {
                const clone = card.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                clone.dataset.reviewClone = 'true';
                track.appendChild(clone);
            });

            carousel.classList.add('is-looping');
        }

        const getStep = () => {
            const card = cards[0];

            if (!card) {
                return viewport.clientWidth;
            }

            const trackStyles = window.getComputedStyle(track);
            const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || '0');

            return card.getBoundingClientRect().width + gap;
        };

        const getMaxScroll = () => {
            return Math.max(0, viewport.scrollWidth - viewport.clientWidth);
        };

        const getLoopWidth = () => {
            const firstCard = cards[0];
            const lastCard = cards[cards.length - 1];

            if (!firstCard || !lastCard) {
                return 0;
            }

            const trackStyles = window.getComputedStyle(track);
            const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || '0');

            return (lastCard.offsetLeft + lastCard.offsetWidth) - firstCard.offsetLeft + gap;
        };

        const normalizeLoopPosition = () => {
            if (!loopingEnabled) {
                return;
            }

            const loopWidth = getLoopWidth();

            if (!loopWidth) {
                return;
            }

            if (viewport.scrollLeft >= loopWidth) {
                viewport.scrollLeft -= loopWidth;
            } else if (viewport.scrollLeft < 0) {
                viewport.scrollLeft += loopWidth;
            }
        };

        const updateControls = () => {
            const hasOverflow = loopingEnabled ? cards.length > 1 : getMaxScroll() > 8;
            prevButton.disabled = !hasOverflow;
            nextButton.disabled = !hasOverflow;
        };

        const goToAdjacentSlide = (direction) => {
            const step = getStep();
            const maxScroll = getMaxScroll();
            const loopWidth = getLoopWidth();

            if (!step || !maxScroll) {
                return;
            }

            const threshold = step * 0.45;
            let target = viewport.scrollLeft + (step * direction);

            if (loopingEnabled && loopWidth) {
                if (target >= loopWidth) {
                    target -= loopWidth;
                } else if (target < 0) {
                    target += loopWidth;
                }
            } else if (direction > 0 && viewport.scrollLeft >= maxScroll - threshold) {
                target = 0;
            } else if (direction < 0 && viewport.scrollLeft <= threshold) {
                target = maxScroll;
            }

            viewport.scrollTo({
                left: Math.max(0, Math.min(target, maxScroll)),
                behavior: 'smooth'
            });

            if (loopingEnabled) {
                window.setTimeout(normalizeLoopPosition, 420);
            }
        };

        const stopAutoScroll = () => {
            if (!autoScrollId) {
                return;
            }

            window.cancelAnimationFrame(autoScrollId);
            autoScrollId = null;
            lastFrameTime = 0;
        };

        const runAutoScroll = (timestamp) => {
            if (!autoScrollId) {
                return;
            }

            if (!lastFrameTime) {
                lastFrameTime = timestamp;
            }

            const delta = Math.min(64, timestamp - lastFrameTime);
            lastFrameTime = timestamp;

            if (!isPaused && !prefersReducedMotion && loopingEnabled) {
                const speed = window.innerWidth <= 640 ? 0.03 : 0.04;
                viewport.scrollLeft += delta * speed;
                normalizeLoopPosition();
            }

            autoScrollId = window.requestAnimationFrame(runAutoScroll);
        };

        const startAutoScroll = () => {
            if (prefersReducedMotion || autoScrollId || !loopingEnabled) {
                return;
            }

            autoScrollId = window.requestAnimationFrame(runAutoScroll);
        };

        const restartAutoScroll = () => {
            stopAutoScroll();
            startAutoScroll();
        };

        prevButton.addEventListener('click', () => {
            goToAdjacentSlide(-1);
            restartAutoScroll();
        });

        nextButton.addEventListener('click', () => {
            goToAdjacentSlide(1);
            restartAutoScroll();
        });

        carousel.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        carousel.addEventListener('mouseleave', () => {
            isPaused = false;
        });
        carousel.addEventListener('focusin', () => {
            isPaused = true;
        });
        carousel.addEventListener('focusout', () => {
            isPaused = false;
        });
        viewport.addEventListener('touchstart', () => {
            isPaused = true;
        }, { passive: true });
        viewport.addEventListener('touchend', () => {
            isPaused = false;
            restartAutoScroll();
        }, { passive: true });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoScroll();
            } else {
                startAutoScroll();
            }
        });

        window.addEventListener('resize', () => {
            const maxScroll = getMaxScroll();

            if (!loopingEnabled && viewport.scrollLeft > maxScroll) {
                viewport.scrollTo({ left: maxScroll, behavior: 'auto' });
            }

            normalizeLoopPosition();

            updateControls();
            restartAutoScroll();
        });

        updateControls();
        startAutoScroll();
    });

    const pricingAccordions = Array.from(document.querySelectorAll('.pricing-accordion'));

    if (pricingAccordions.length) {
        let lastAccordionMode = null;

        const syncPricingAccordions = () => {
            const mobileLayout = window.innerWidth <= 960;
            const nextMode = mobileLayout ? 'mobile' : 'desktop';

            if (nextMode === lastAccordionMode) {
                return;
            }

            lastAccordionMode = nextMode;

            pricingAccordions.forEach((accordion, index) => {
                if (mobileLayout) {
                    if (index === 0) {
                        accordion.setAttribute('open', '');
                    } else {
                        accordion.removeAttribute('open');
                    }
                } else {
                    accordion.setAttribute('open', '');
                }
            });
        };

        syncPricingAccordions();
        window.addEventListener('resize', syncPricingAccordions);
    }
});
