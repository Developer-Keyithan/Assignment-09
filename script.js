// Toggle Dark Mode
function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

// Active navbar
function setActiveLink() {
    const sections = document.querySelectorAll('.home-container, .about-container, .products-container, .faq-container, .contact-container');
    const navLinks = document.querySelectorAll('.navbar-container .content a');

    let currentSection = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 500;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => link.classList.remove('active'));

    const activeLink = document.querySelector(`.navbar-container .content a[href="#${currentSection}"]`);
    if (activeLink) activeLink.classList.add('active');
}

document.querySelectorAll('.navbar-container .content a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', setActiveLink);

setActiveLink();










