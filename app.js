/* ==========================================================================
   Shiv Hardware and Sanitary Mart - Custom JS Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. Sticky Navigation Header Scroll Handler
    // ----------------------------------------------------
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // ----------------------------------------------------
    // 2. Mobile Responsive Hamburger Menu Drawer
    // ----------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden'); // Disable scroll when menu is open
    };

    const closeMenu = () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            closeMenu();
            
            // Manage active navigation class
            navLinks.forEach(nl => nl.classList.remove('active'));
            link.classList.add('active');
        });
    });


    // ----------------------------------------------------
    // 3. Category Data & Interactive Detail Modal
    // ----------------------------------------------------
    const categoryData = {
        tiles: {
            title: "Premium Tiles & Ceramics",
            tag: "TILES",
            description: "Explore our stunning collection of high-durability floor and wall tiling solutions. Ideal for bathrooms, kitchens, high-traffic corridors, and premium living rooms. We showcase a variety of textures, patterns, and finishes.",
            products: [
                "Double Charged Vitrified Tiles",
                "Digital Glazed Floor Tiles",
                "Ceramic Wall Tiles (High Gloss/Matte)",
                "Outdoor Elevation Tiles",
                "Non-Slip Parking Tiles",
                "Designer Borders & Highlighter Tiles",
                "Epoxy Grouts & Tile Adhesives"
            ]
        },
        sanitaryware: {
            title: "Elegant Sanitary Ware",
            tag: "SANITARY WARE",
            description: "Designed for ultimate hygiene, comfort, and state-of-the-art styling. Our collection of premium closets, basins, and vanities comes from trusted partners like Parryware and Jaquar, promising modern elegance for any restroom.",
            products: [
                "One-Piece Closet Commodes",
                "Wall Hung European Closets (Rimless)",
                "Table Top Designer Vanity Basins",
                "Wash Basin Pedestal Stands",
                "Modular Waterproof Bath Cabinets",
                "Dual Flush Cisterns & Seat Covers",
                "Urinals & Flush Valves"
            ]
        },
        pipesfittings: {
            title: "Pipes & Plumbing Fittings",
            tag: "PIPES & FITTINGS",
            description: "Build a highly reliable and leak-proof water delivery and drainage system with our high-grade plumbing solutions. Featuring certified CPVC, UPVC, and SWR pipes and joints that stand the test of time.",
            products: [
                "Prince CPVC Flowguard Pipes",
                "Astral UPVC Pressure Water Pipes",
                "SWR Drainage & Soil Pipes",
                "Brass-Threaded Plumbing Joints",
                "Leak-Proof Elbows, Tees & Couplers",
                "High-Grade Solvent Cements",
                "Water Storage Tanks & Accessories"
            ]
        },
        bathroomsolutions: {
            title: "Bathroom Luxury Solutions",
            tag: "BATHROOM SOLUTIONS",
            description: "Create your personal luxury spa with advanced chrome and brass bathroom fixtures. We supply water-saving aerated faucets, overhead rain showers, and single-lever diverters to give you a customized bathroom experience.",
            products: [
                "Jaquar & Parryware Designer Taps",
                "Overhead Multi-Flow Rain Showers",
                "Handheld & Wall-Mounted Showers",
                "Single-Lever Hot & Cold Diverters",
                "Premium Vanity Mirrors & Cabinets",
                "SS Soap Holders, Towel Rails & Rings",
                "Brass Bib Cocks & Health Faucets"
            ]
        },
        doorwindow: {
            title: "Door & Window Fittings",
            tag: "FITTINGS",
            description: "Ensure complete security, functionality, and visual alignment for your doors and windows. Our hardware products feature high-durability coatings that resist moisture and corrosion.",
            products: [
                "Brass & SS Mortise Door Handles",
                "High-Security Lock Bodies & Keys",
                "Premium Bearing hinges & Pivot joints",
                "Designer Aldrops & Tower Bolts",
                "Smooth Telescopic Drawer Channels",
                "Heavy-Duty Window Friction Stays",
                "Designer Main Door Pull Handles"
            ]
        },
        hardwarepumps: {
            title: "Hardware & Water Pumps",
            tag: "HARDWARE & PUMPS",
            description: "Get high-performance machinery and daily hardware tools for domestic and commercial projects. Featuring top-tier, efficient water pumping systems that guarantee continuous water flow.",
            products: [
                "High-Performance Monoblock Water Pumps",
                "Submersible Pumps & Heavy Motors",
                "Premium Power Toolkits (Drills, Grinders)",
                "General Structural Fasteners & Anchors",
                "SS Screws, Nails & Fasteners",
                "Measuring Tapes, Spanners & Plier Sets",
                "Safety Gear & Industrial Glues"
            ]
        }
    };

    const modal = document.getElementById('category-modal');
    const modalBody = document.getElementById('modal-body-content');

    window.openCategoryModal = (categoryId) => {
        const data = categoryData[categoryId];
        if (!data) return;

        // Populate modal contents
        modalBody.innerHTML = `
            <span class="modal-cat-tag">${data.tag}</span>
            <h3 class="modal-title">${data.title}</h3>
            <p class="modal-desc">${data.description}</p>
            <h4 class="modal-subtitle">Highlighted Collections:</h4>
            <div class="modal-products-list">
                ${data.products.map(product => `
                    <div class="modal-product-item">
                        <span class="modal-product-bullet"></span>
                        <span>${product}</span>
                    </div>
                `).join('')}
            </div>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');
    };

    window.closeCategoryModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overflow-hidden');
    };

    // Close modal on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCategoryModal();
            closeLightbox();
        }
    });


    // ----------------------------------------------------
    // 4. Dynamic Category Filtration Search Box
    // ----------------------------------------------------
    const searchInput = document.getElementById('category-search');
    const categoryCards = document.querySelectorAll('.category-card');
    const notFoundMessage = document.getElementById('search-not-found');
    const searchQueryText = document.getElementById('search-query-text');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        let matchesCount = 0;

        categoryCards.forEach(card => {
            const title = card.querySelector('.category-card-title').textContent.toLowerCase();
            const desc = card.querySelector('.category-card-desc').textContent.toLowerCase();
            const features = Array.from(card.querySelectorAll('.category-features li'))
                                  .map(li => li.textContent.toLowerCase())
                                  .join(' ');
            
            const matches = title.includes(query) || desc.includes(query) || features.includes(query);

            if (matches) {
                card.classList.remove('hidden');
                matchesCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (matchesCount === 0 && query !== '') {
            searchQueryText.textContent = query;
            notFoundMessage.classList.remove('hidden');
        } else {
            notFoundMessage.classList.add('hidden');
        }
    });


    // ----------------------------------------------------
    // 5. Gallery Lightbox Showcase
    // ----------------------------------------------------
    const galleryItems = [
        {
            src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&h=800&fit=crop",
            caption: "Luxury Wash Basin & Brass Faucets"
        },
        {
            src: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=1000&h=800&fit=crop",
            caption: "Premium Chrome Rain Showers"
        },
        {
            src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1000&h=800&fit=crop",
            caption: "Heavy-Duty Hardware Tools & Spares"
        },
        {
            src: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1000&h=800&fit=crop",
            caption: "Elegant Geometric Wall & Floor Tiles"
        }
    ];

    let currentGalleryIndex = 0;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    window.openLightbox = (index) => {
        currentGalleryIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');
    };

    window.closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        if (!navMenu.classList.contains('active')) {
            document.body.classList.remove('overflow-hidden');
        }
    };

    window.navigateLightbox = (direction) => {
        currentGalleryIndex += direction;
        
        // Wrap-around boundaries
        if (currentGalleryIndex >= galleryItems.length) {
            currentGalleryIndex = 0;
        } else if (currentGalleryIndex < 0) {
            currentGalleryIndex = galleryItems.length - 1;
        }
        
        updateLightboxContent();
    };

    const updateLightboxContent = () => {
        const item = galleryItems[currentGalleryIndex];
        lightboxImg.src = item.src;
        lightboxImg.alt = item.caption;
        lightboxCaption.textContent = item.caption;
    };

    // Keyboard navigation helper
    window.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });


    // ----------------------------------------------------
    // 6. Testimonials Carousel Slider Logic
    // ----------------------------------------------------
    const sliderContainer = document.getElementById('reviews-slider');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dotsContainer = document.getElementById('slider-dots');
    
    let activeSlideIndex = 0;
    let cardWidth = 0;
    let cardsPerView = 1;
    const cards = Array.from(sliderContainer.children);

    const updateSliderLayout = () => {
        const wrapperWidth = sliderContainer.parentElement.clientWidth;
        
        // Determine how many items are visible based on screen width
        if (wrapperWidth >= 768) {
            cardsPerView = 2;
        } else {
            cardsPerView = 1;
        }

        // Apply margins and size dynamically
        const gap = 30; // Matches CSS margin-right
        const totalGapsWidth = gap * (cardsPerView - 1);
        cardWidth = (wrapperWidth - totalGapsWidth) / cardsPerView;

        cards.forEach(card => {
            card.style.flex = `0 0 ${cardWidth}px`;
            card.style.maxWidth = `${cardWidth}px`;
        });

        // Regenerate dots
        const totalDotsCount = Math.max(1, cards.length - cardsPerView + 1);
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalDotsCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === activeSlideIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }

        // Clip bounds for active slide index
        if (activeSlideIndex >= totalDotsCount) {
            activeSlideIndex = totalDotsCount - 1;
        }

        scrollToActiveSlide(false);
    };

    const scrollToActiveSlide = (animate = true) => {
        const gap = 30;
        const offset = activeSlideIndex * (cardWidth + gap);
        sliderContainer.style.transition = animate ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
        sliderContainer.style.transform = `translateX(-${offset}px)`;

        // Update dots highlight state
        const dots = Array.from(dotsContainer.children);
        dots.forEach((dot, idx) => {
            if (idx === activeSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const goToSlide = (index) => {
        activeSlideIndex = index;
        scrollToActiveSlide(true);
    };

    prevBtn.addEventListener('click', () => {
        if (activeSlideIndex > 0) {
            activeSlideIndex--;
            scrollToActiveSlide(true);
        } else {
            // Loop to end
            const totalDotsCount = Math.max(1, cards.length - cardsPerView + 1);
            activeSlideIndex = totalDotsCount - 1;
            scrollToActiveSlide(true);
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalDotsCount = Math.max(1, cards.length - cardsPerView + 1);
        if (activeSlideIndex < totalDotsCount - 1) {
            activeSlideIndex++;
            scrollToActiveSlide(true);
        } else {
            // Loop to start
            activeSlideIndex = 0;
            scrollToActiveSlide(true);
        }
    });

    // Initialize layout and hook resize
    updateSliderLayout();
    window.addEventListener('resize', () => {
        updateSliderLayout();
    });

    // Touch/Swipe Support for Mobile Users
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    }, {passive: true});

    const handleSwipeGesture = () => {
        const threshold = 50;
        if (touchStartX - touchEndX > threshold) {
            // Swiped Left -> next slide
            nextBtn.click();
        } else if (touchEndX - touchStartX > threshold) {
            // Swiped Right -> prev slide
            prevBtn.click();
        }
    };


    // ----------------------------------------------------
    // 7. Scroll reveal Intersection Observer Animations
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.animate-up, .reveal-left, .reveal-right, .reveal-up');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Trigger once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element fits the screen fully
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: immediately activate animations if browser doesn't support Observer
        revealElements.forEach(el => el.classList.add('active'));
    }

});
