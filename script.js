document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Menu Toggle (Basic)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger){
        hamburger.addEventListener('click', () => {
            // Toggle display for mobile logic here
            // For simplicity in this stack, we keep it hidden or you can add a class
            alert("Mobile menu clicked - You can add a 'active' class toggle here!");
        });
    }
});
