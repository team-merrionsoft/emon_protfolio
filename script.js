 document.addEventListener('DOMContentLoaded', () => {
            // Canvas setup
            const canvas = document.getElementById('spaceCanvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas to full window size
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Starfield parameters
            const stars = [];
            const starCount = Math.floor(window.innerWidth * window.innerHeight / 200); // Ultra dense stars
            const layers = 3; // Simplified depth
            const starColors = [
                'rgba(255, 255, 255, 0.95)',  // Pure white
                'rgba(100, 200, 255, 0.9)',   // Electric blue
                'rgba(180, 100, 255, 0.9)'    // Cosmic purple
            ];
            
            // Create uniform grid of stars
            const gridSize = 20; // Distance between stars
            const cols = Math.ceil(canvas.width / gridSize);
            const rows = Math.ceil(canvas.height / gridSize);
            
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const layer = Math.floor(Math.random() * layers);
                    const offsetX = (Math.random() - 0.5) * gridSize * 0.4;
                    const offsetY = (Math.random() - 0.5) * gridSize * 0.4;
                    
                    stars.push({
                        x: i * gridSize + offsetX,
                        y: j * gridSize + offsetY,
                        radius: (0.5 + Math.random() * 0.5) * (1 + layer * 0.2),
                        vx: (Math.random() - 0.5) * 0.1,
                        vy: (Math.random() - 0.5) * 0.1,
                        layer: layer,
                        color: starColors[layer % starColors.length],
                        opacity: 0.5 + Math.random() * 0.3,
                        twinkleSpeed: 0.05 + Math.random() * 0.05,
                        twinklePhase: Math.random() * Math.PI * 2,
                        glow: 1.5 + Math.random() * 0.5
                    });
                }
            }
            
            // Mouse position for interactive effects
            let mouseX = canvas.width / 2;
            let mouseY = canvas.height / 2;
            
            canvas.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            // 3D Sphere parameters
            const sphereRadius = Math.min(canvas.width, canvas.height) * 0.3;
            const sphereDetail = 60;  // Ultra detailed wireframe
            const sphereGlowIntensity = 0.4;  // Intense glow
            const sphereLines = [];
            const sphereRotation = { x: 0, y: 0, z: 0 };
            const sphereRotationSpeed = { x: 0.001, y: 0.0015, z: 0.0005 };
            
            // Create sphere wireframe
            for (let i = 0; i <= sphereDetail; i++) {
                const lat = Math.PI * (-0.5 + (i / sphereDetail));
                for (let j = 0; j <= sphereDetail; j++) {
                    const lng = 2 * Math.PI * (j / sphereDetail);
                    
                    const x = Math.cos(lng) * Math.cos(lat);
                    const y = Math.sin(lat);
                    const z = Math.sin(lng) * Math.cos(lat);
                    
                    sphereLines.push({ x, y, z });
                }
            }
            
            // Particles
            const particles = [];
            const maxParticles = 800;  // Ultra dense particles
            const particleColors = [
                'rgba(255, 255, 255, 0.8)',  // Pure white
                'rgba(100, 200, 255, 0.8)',  // Electric blue
                'rgba(180, 100, 255, 0.8)'   // Cosmic purple
            ];
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                
                // Clear canvas with semi-transparent black for motion blur effect
                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Draw stars with parallax effect
                stars.forEach(star => {
                    // Update star position based on layer (parallax)
                    star.x += star.vx * (star.layer + 1) * 0.3;
                    star.y += star.vy * (star.layer + 1) * 0.3;
                    
                    // Wrap stars around edges
                    if (star.x < 0) star.x = canvas.width;
                    if (star.x > canvas.width) star.x = 0;
                    if (star.y < 0) star.y = canvas.height;
                    if (star.y > canvas.height) star.y = 0;
                    
                    // Twinkle effect
                    star.twinklePhase += star.twinkleSpeed;
                    const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
                    
                    // Draw star
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                    
                    // Create gradient for star glow
                    const gradient = ctx.createRadialGradient(
                        star.x, star.y, 0,
                        star.x, star.y, star.radius * 2
                    );
                    
                    gradient.addColorStop(0, `rgba(230, 230, 250, ${star.opacity * twinkle})`);
                    gradient.addColorStop(0.3, `rgba(138, 43, 226, ${star.opacity * twinkle * 0.8})`);
                    gradient.addColorStop(0.7, `rgba(100, 149, 237, ${star.opacity * twinkle * 0.5})`);
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    
                    ctx.fillStyle = gradient;
                    ctx.fill();
                });
                
                // Update sphere rotation
                sphereRotation.x += sphereRotationSpeed.x;
                sphereRotation.y += sphereRotationSpeed.y;
                sphereRotation.z += sphereRotationSpeed.z;
                
                // Calculate sphere center with slight offset based on mouse position
                const centerX = canvas.width / 2 + (mouseX - canvas.width / 2) * 0.05;
                const centerY = canvas.height / 2 + (mouseY - canvas.height / 2) * 0.05;
                
                // Draw sphere wireframe
                // Add sphere glow background
                const glowGradient = ctx.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, sphereRadius * 1.5
                );
                glowGradient.addColorStop(0, `rgba(138, 43, 226, ${sphereGlowIntensity})`);
                glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.fillStyle = glowGradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, sphereRadius * 1.5, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = 'rgba(176, 196, 222, 0.8)';
                ctx.lineWidth = 1.2;
                ctx.lineCap = 'round';
                
                // Draw latitude lines
                for (let i = 0; i <= sphereDetail; i++) {
                    ctx.beginPath();
                    
                    for (let j = 0; j <= sphereDetail; j++) {
                        const index = i * (sphereDetail + 1) + j;
                        const point = sphereLines[index];
                        
                        // Apply 3D rotation
                        const rotated = rotatePoint(point, sphereRotation);
                        
                        // Project 3D to 2D with perspective
                        const scale = 1 / (2 + rotated.z);
                        const x2d = centerX + rotated.x * sphereRadius * scale;
                        const y2d = centerY + rotated.y * sphereRadius * scale;
                        
                        if (j === 0) {
                            ctx.moveTo(x2d, y2d);
                        } else {
                            ctx.lineTo(x2d, y2d);
                        }
                    }
                    
                    // Create gradient for the line
                    const lineGradient = ctx.createLinearGradient(
                        centerX - sphereRadius, centerY,
                        centerX + sphereRadius, centerY
                    );
                    
                    lineGradient.addColorStop(0, 'rgba(138, 43, 226, 0.7)');
                    lineGradient.addColorStop(0.5, 'rgba(100, 149, 237, 0.9)');
                    lineGradient.addColorStop(1, 'rgba(138, 43, 226, 0.7)');
                    
                    ctx.strokeStyle = lineGradient;
                    ctx.stroke();
                }
                
                // Draw longitude lines
                for (let j = 0; j <= sphereDetail; j++) {
                    ctx.beginPath();
                    
                    for (let i = 0; i <= sphereDetail; i++) {
                        const index = i * (sphereDetail + 1) + j;
                        const point = sphereLines[index];
                        
                        // Apply 3D rotation
                        const rotated = rotatePoint(point, sphereRotation);
                        
                        // Project 3D to 2D with perspective
                        const scale = 1 / (2 + rotated.z);
                        const x2d = centerX + rotated.x * sphereRadius * scale;
                        const y2d = centerY + rotated.y * sphereRadius * scale;
                        
                        if (i === 0) {
                            ctx.moveTo(x2d, y2d);
                        } else {
                            ctx.lineTo(x2d, y2d);
                        }
                    }
                    
                    ctx.stroke();
                }
                
                // Create particles occasionally
                if (Math.random() < 0.3 && particles.length < maxParticles) {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = sphereRadius * (0.8 + Math.random() * 0.4);
                    
                    particles.push({
                        x: centerX + Math.cos(angle) * distance,
                        y: centerY + Math.sin(angle) * distance,
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2,
                        radius: Math.random() * 2 + 1,
                        life: 100 + Math.random() * 100,
                        maxLife: 100 + Math.random() * 100,
                        color: `rgba(${Math.floor(138 + Math.random() * 50)}, ${Math.floor(43 + Math.random() * 50)}, ${Math.floor(226 + Math.random() * 50)}, 0.7)`
                    });
                }
                
                // Update and draw particles
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life--;
                    
                    if (p.life <= 0) {
                        particles.splice(i, 1);
                        continue;
                    }
                    
                    const alpha = p.life / p.maxLife;
                    
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * alpha, 0, Math.PI * 2);
                    
                    // Create glow effect
                    const gradient = ctx.createRadialGradient(
                        p.x, p.y, 0,
                        p.x, p.y, p.radius * alpha * 2
                    );
                    
                    gradient.addColorStop(0, p.color);
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            }
            
            // Helper function to rotate a 3D point
            function rotatePoint(point, rotation) {
                // Rotate around X axis
                const cosX = Math.cos(rotation.x);
                const sinX = Math.sin(rotation.x);
                const y1 = point.y * cosX - point.z * sinX;
                const z1 = point.y * sinX + point.z * cosX;
                
                // Rotate around Y axis
                const cosY = Math.cos(rotation.y);
                const sinY = Math.sin(rotation.y);
                const x2 = point.x * cosY + z1 * sinY;
                const z2 = -point.x * sinY + z1 * cosY;
                
                // Rotate around Z axis
                const cosZ = Math.cos(rotation.z);
                const sinZ = Math.sin(rotation.z);
                const x3 = x2 * cosZ - y1 * sinZ;
                const y3 = x2 * sinZ + y1 * cosZ;
                
                return { x: x3, y: y3, z: z2 };
            }
            
            // Start animation
            animate();
        });
        const words = ["Flutter Developer", "Programmer", "Entrepreneur"];
    let i = 0;
    let j = 0;
    let currentWord = '';
    let isDeleting = false;
    const speed = 150;
    const pause = 1500;

    function type() {
      currentWord = words[i];
      let displayText = isDeleting ? currentWord.substring(0, j--) : currentWord.substring(0, j++);

      document.getElementById('typewriter').textContent = displayText;

      if (!isDeleting && j === currentWord.length + 1) {
        isDeleting = true;
        setTimeout(type, pause);
      } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? speed / 2 : speed);
      }
    }

    type();
     document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.querySelector('input[type="text"]').value.trim();
        const email = document.querySelector('input[type="email"]').value.trim();
        const message = document.querySelector('textarea').value.trim();

        // Basic validation
        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Email format check
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Construct the mailto link
        const subject = encodeURIComponent("Message from Portfolio Contact Form");
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        const mailtoLink = `mailto:dev.emon.bd@gmail.com?subject=${subject}&body=${body}`;

        // Open default email app (Gmail, Outlook, etc.)
        window.location.href = mailtoLink;
    });