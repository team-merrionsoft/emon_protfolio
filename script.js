 document.addEventListener('DOMContentLoaded', function() {
            // Initialize GSAP and plugins
            gsap.registerPlugin(ScrollTrigger, TextPlugin);
            
            // Hero section animations
            const heroTimeline = gsap.timeline({ defaults: { duration: 0.5, ease: "power3.out" } });
            
            heroTimeline
                .to("#hero-title", { opacity: 1, y: 0, duration: 0.8 })
                .to("#typewriter", { 
                    text: { value: "Flutter Developer " ,},
                    duration: 1.2,
                    ease: "none"
                }, "-=0.4")
                .to("#hero-description", { opacity: 1, duration: 0.6 }, "-=0.3")
                .to("#hero-buttons", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
                .to("#tech-badges", { opacity: 1, stagger: 0.1 }, "-=0.2")
                .to("#hero-profile", { opacity: 1, duration: 0.8 }, "-=0.3");
            
            // Scroll-based animations using GSAP ScrollTrigger
            gsap.utils.toArray('.gsap-fade-in').forEach(element => {
                const delay = element.dataset.delay || 0;
                gsap.fromTo(element, 
                    { opacity: 0, y: 30 }, 
                    {
                        opacity: 1, 
                        y: 0,
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 90%',
                            end: 'bottom center',
                            toggleActions: 'play none none none'
                        },
                        delay: parseFloat(delay),
                        duration: 0.8
                    }
                );
            });
            
            gsap.utils.toArray('.gsap-slide-left').forEach(element => {
                const delay = element.dataset.delay || 0;
                gsap.fromTo(element, 
                    { opacity: 0, x: 50 }, 
                    {
                        opacity: 1, 
                        x: 0,
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 90%',
                            end: 'bottom center',
                            toggleActions: 'play none none none'
                        },
                        delay: parseFloat(delay),
                        duration: 0.8
                    }
                );
            });
            
            gsap.utils.toArray('.gsap-slide-right').forEach(element => {
                const delay = element.dataset.delay || 0;
                gsap.fromTo(element, 
                    { opacity: 0, x: -50 }, 
                    {
                        opacity: 1, 
                        x: 0,
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 90%',
                            end: 'bottom center',
                            toggleActions: 'play none none none'
                        },
                        delay: parseFloat(delay),
                        duration: 0.8
                    }
                );
            });
            
            gsap.utils.toArray('.gsap-reveal-in').forEach(element => {
                const delay = element.dataset.delay || 0;
                gsap.fromTo(element, 
                    { clipPath: 'inset(0 100% 0 0)' }, 
                    {
                        clipPath: 'inset(0 0% 0 0)',
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 90%',
                            end: 'bottom center',
                            toggleActions: 'play none none none'
                        },
                        delay: parseFloat(delay),
                        duration: 0.8
                    }
                );
            });
            
            gsap.utils.toArray('.gsap-scale-in').forEach(element => {
                const delay = element.dataset.delay || 0;
                gsap.fromTo(element, 
                    { opacity: 0, scale: 0.95 }, 
                    {
                        opacity: 1, 
                        scale: 1,
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 90%',
                            end: 'bottom center',
                            toggleActions: 'play none none none'
                        },
                        delay: parseFloat(delay),
                        duration: 0.6,
                        ease: "back.out(1.7)"
                    }
                );
            });
            
            // Animated timeline for experience section
            gsap.utils.toArray('.timeline-item').forEach(item => {
                ScrollTrigger.create({
                    trigger: item,
                    start: "top center",
                    onEnter: () => item.classList.add('active')
                });
            });
            
            // Mobile menu toggle
            const menuToggle = document.getElementById('menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            
            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                gsap.fromTo(mobileMenu, 
                    { height: 0, opacity: 0 }, 
                    { height: 'auto', opacity: 1, duration: 0.4 }
                );
            });
            
        
            // Scroll progress bar
            const progressBar = document.querySelector('.progress-bar');
            
            window.addEventListener('scroll', () => {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollY = window.scrollY;
                const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;
                progressBar.style.width = `${scrollPercent}%`;
            });
            
            // Floating particle generator
           
        });
         function sendMail(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(`New message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:dev.emon.bd@gmail.com?subject=${subject}&body=${body}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = mailtoLink;
    } else {
      window.open(mailtoLink, "_blank");
    }
  }
