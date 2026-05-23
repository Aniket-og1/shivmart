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


    // ==========================================================================
    // PREMIUM REVAMP INTERACTIVES (AGENCY-QUALITY LOGIC)
    // ==========================================================================

    // 1. Page Preloader Fade-out
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            // Keep loader active for 1.3s to allow fill animation to finish
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 1300);
        });
        // Fallback in case load event takes too long
        setTimeout(() => {
            if (!preloader.classList.contains('fade-out')) {
                preloader.classList.add('fade-out');
            }
        }, 3000);
    }

    // 2. Page Scroll Progress & Back-to-Top circular ring
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const progressRingCircle = document.querySelector('.progress-ring-circle');

    if (progressRingCircle) {
        const radius = progressRingCircle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        
        progressRingCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressRingCircle.style.strokeDashoffset = circumference;

        const updateScrollIndicator = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            // Update top progress bar
            if (scrollProgress) {
                scrollProgress.style.width = `${scrollPercent}%`;
            }

            // Update circular progress ring
            const offset = circumference - (scrollPercent / 100) * circumference;
            progressRingCircle.style.strokeDashoffset = offset;

            // Show/Hide back-to-top button
            if (scrollTop > 400) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        };

        window.addEventListener('scroll', updateScrollIndicator);
        updateScrollIndicator(); // Run once initially
    }

    window.scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // 3. Showroom Visualizer Hotspots
    const hotspots = document.querySelectorAll('.hotspot');
    hotspots.forEach(hotspot => {
        const btn = hotspot.querySelector('.hotspot-btn');
        
        // Mobile Toggle Click
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = hotspot.classList.contains('active');
            
            // Close all other hotspots
            hotspots.forEach(h => h.classList.remove('active'));
            
            if (!isActive) {
                hotspot.classList.add('active');
            }
        });

        // Close on mouse leave for desktop hover experience
        hotspot.addEventListener('mouseleave', () => {
            hotspot.classList.remove('active');
        });
    });

    // Close visualizer tooltips when clicking anywhere else
    document.addEventListener('click', () => {
        hotspots.forEach(h => h.classList.remove('active'));
    });

    // 4. Interactive Cost Estimator / Project Planner
    let currentStep = 1;
    let selectedType = 'bathroom';
    let selectedTier = 'luxury';
    let scopeValue = 1;

    const calcStepTitle = document.getElementById('calc-header-step-title');
    const calcStepDesc = document.getElementById('calc-header-step-desc');
    const calcProgressFill = document.getElementById('calc-progress-fill');
    const calcBtnBack = document.getElementById('calc-btn-back');
    const calcBtnNext = document.getElementById('calc-btn-next');
    const calcSteps = document.querySelectorAll('.calc-step');

    // Step 3 dynamic scope labels mapping
    const scopeConfig = {
        bathroom: {
            question: "Number of bathrooms to remodel?",
            label: "Enter bathroom count (e.g. 1, 2, 3...)",
            defaultVal: 1,
            unit: "Bathroom"
        },
        tiles: {
            question: "Approximate flooring / tiling area?",
            label: "Enter area size in square feet (e.g. 150, 300, 600...)",
            defaultVal: 200,
            unit: "Sq Ft"
        },
        plumbing: {
            question: "Number of plumbing setups / bathrooms?",
            label: "Enter count of bathroom setups (e.g. 1, 2...)",
            defaultVal: 1,
            unit: "Setup"
        },
        full: {
            question: "Number of bathrooms for full fitout?",
            label: "Enter bathroom count (includes tiles, fittings & piping)",
            defaultVal: 1,
            unit: "Bathroom"
        }
    };

    // Handle options clicking inside Steps 1 and 2
    const stepOptions = document.querySelectorAll('.calc-step .calc-card-option');
    stepOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Unselect sibling options
            const siblings = option.parentElement.querySelectorAll('.calc-card-option');
            siblings.forEach(s => s.classList.remove('selected'));
            
            // Select current
            option.classList.add('selected');
            
            // Track state
            const parentStep = option.closest('.calc-step').getAttribute('data-step');
            const val = option.getAttribute('data-value');
            
            if (parentStep === '1') {
                selectedType = val;
                // Pre-populate step 3 input values based on defaults
                const config = scopeConfig[selectedType];
                document.getElementById('calc-scope-input').value = config.defaultVal;
            } else if (parentStep === '2') {
                selectedTier = val;
            }
        });
    });

    const updateStepView = () => {
        // Show active step, hide others
        calcSteps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.getAttribute('data-step')) === currentStep) {
                step.classList.add('active');
            }
        });

        // Update progress line width
        const progressPercent = (currentStep / 4) * 100;
        calcProgressFill.style.width = `${progressPercent}%`;

        // Update Header texts
        if (currentStep === 1) {
            calcStepTitle.textContent = "Select Project Type";
            calcStepDesc.textContent = "Step 1 of 4: Tell us what you are building";
            calcBtnBack.style.visibility = 'hidden';
            calcBtnNext.textContent = "Next Step";
        } else if (currentStep === 2) {
            calcStepTitle.textContent = "Choose Material Tier";
            calcStepDesc.textContent = "Step 2 of 4: Select your quality class";
            calcBtnBack.style.visibility = 'visible';
            calcBtnNext.textContent = "Next Step";
        } else if (currentStep === 3) {
            // Apply dynamic labels
            const config = scopeConfig[selectedType];
            document.getElementById('calc-scope-question').textContent = config.question;
            document.getElementById('calc-scope-label').textContent = config.label;

            calcStepTitle.textContent = "Specify Project Scope";
            calcStepDesc.textContent = "Step 3 of 4: Enter project dimensions";
            calcBtnBack.style.visibility = 'visible';
            calcBtnNext.textContent = "Calculate Estimate";
        } else if (currentStep === 4) {
            calcStepTitle.textContent = "Estimated Quote Breakdown";
            calcStepDesc.textContent = "Ready to build: Project pricing summary";
            calcBtnBack.style.visibility = 'visible';
            calcBtnNext.textContent = "Inquire on WhatsApp";
            
            // Run budget calculator formulas
            calculateBudgetResults();
        }
    };

    const calculateBudgetResults = () => {
        scopeValue = parseFloat(document.getElementById('calc-scope-input').value) || 1;
        if (scopeValue < 1) scopeValue = 1;

        let minUnit = 0;
        let maxUnit = 0;
        let unitText = "";

        // Core formula matrix
        if (selectedType === 'bathroom') {
            unitText = `${scopeValue} Bathroom${scopeValue > 1 ? 's' : ''}`;
            if (selectedTier === 'standard') { minUnit = 12000; maxUnit = 22000; }
            else if (selectedTier === 'premium') { minUnit = 28000; maxUnit = 50000; }
            else { minUnit = 65000; maxUnit = 135000; }
        } else if (selectedType === 'tiles') {
            unitText = `${scopeValue} Sq Ft`;
            if (selectedTier === 'standard') { minUnit = 65; maxUnit = 100; }
            else if (selectedTier === 'premium') { minUnit = 110; maxUnit = 170; }
            else { minUnit = 190; maxUnit = 320; }
        } else if (selectedType === 'plumbing') {
            unitText = `${scopeValue} Setup${scopeValue > 1 ? 's' : ''}`;
            if (selectedTier === 'standard') { minUnit = 4500; maxUnit = 8000; }
            else if (selectedTier === 'premium') { minUnit = 9500; maxUnit = 16500; }
            else { minUnit = 20000; maxUnit = 40000; }
        } else if (selectedType === 'full') {
            unitText = `${scopeValue} Bathroom Setup${scopeValue > 1 ? 's' : ''}`;
            if (selectedTier === 'standard') { minUnit = 25000; maxUnit = 45000; }
            else if (selectedTier === 'premium') { minUnit = 60000; maxUnit = 100000; }
            else { minUnit = 140000; maxUnit = 320000; }
        }

        const totalMin = Math.round(minUnit * scopeValue);
        const totalMax = Math.round(maxUnit * scopeValue);
        const avgTotal = Math.round((totalMin + totalMax) / 2);

        // Display results
        document.getElementById('estimate-range').textContent = `₹${totalMin.toLocaleString('en-IN')} - ₹${totalMax.toLocaleString('en-IN')}`;
        document.getElementById('summary-scope').textContent = unitText;
        
        let tierLabel = "Standard Tier (Value)";
        if (selectedTier === 'premium') tierLabel = "Premium Tier (Brands)";
        if (selectedTier === 'luxury') tierLabel = "Luxury Tier (Jaquar Artize)";
        document.getElementById('summary-tier').textContent = tierLabel;
        document.getElementById('summary-breakdown').textContent = `₹${avgTotal.toLocaleString('en-IN')}`;
    };

    const handleWhatsAppExport = () => {
        const config = scopeConfig[selectedType];
        let tierLabel = "Standard (Value)";
        if (selectedTier === 'premium') tierLabel = "Premium (Brands)";
        if (selectedTier === 'luxury') tierLabel = "Luxury (Jaquar Artize)";

        const totalMin = document.getElementById('estimate-range').textContent;
        const scopeText = document.getElementById('summary-scope').textContent;
        const avgText = document.getElementById('summary-breakdown').textContent;

        const message = `Hi Shiv Hardware, I generated a project estimate on your website and would like a formal quote:
- *Project Area:* ${selectedType.toUpperCase()}
- *Quality Class:* ${tierLabel}
- *Scope size:* ${scopeText}
- *Estimated Budget:* ${totalMin} (Average: ${avgText})
Please let me know of product availability. Thanks!`;

        // Send to Dinesh Agarwalla (WhatsApp: 917002808746)
        const whatsappUrl = `https://wa.me/917002808746?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    calcBtnBack.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepView();
        }
    });

    calcBtnNext.addEventListener('click', () => {
        if (currentStep < 4) {
            currentStep++;
            updateStepView();
        } else {
            handleWhatsAppExport();
        }
    });

});

