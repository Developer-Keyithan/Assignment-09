// Toggle Dark Mode
function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    
    var icon = document.querySelector('.navbar-container .content button i');
    if (element.classList.contains("dark-mode")) {
        icon.classList.replace("ri-moon-clear-line", "ri-sun-line");
    } else {
        icon.classList.replace("ri-sun-line", "ri-moon-clear-line");
    }
}


// Active navbar
function setActiveLink() {
    const sections = document.querySelectorAll('.home-container, .about-container, .products-container, .faq-container, .contact-container');
    const navLinks = document.querySelectorAll('.navbar-container .content a');

    let currentSection = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
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
            top: targetSection.offsetTop - 0,
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', setActiveLink);

setActiveLink();


// Image Filter
const filterButtons = document.querySelectorAll(".filter-buttons button");
const filterableCards = document.querySelectorAll(".card-container .card");

const filterCards = e => {
    const activeButton = document.querySelector(".filter-buttons .active");
    if (activeButton) activeButton.classList.remove("active");
    e.target.classList.add("active");

    filterableCards.forEach(card => {
        card.classList.add("hide");
        if (card.dataset.name.includes(e.target.dataset.name) || e.target.dataset.name === "featured") {
            card.classList.remove("hide");
        }
    });
};

filterButtons.forEach(button => button.addEventListener("click", filterCards));






