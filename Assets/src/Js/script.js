// <=========== Change Dark Mode ===========>

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "d") {
        event.preventDefault();
        darkMode();
    }
});

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








// <=========== Active navbar ===========>

function setActiveLink() {
    const sections = document.querySelectorAll('.home-container, .about-container, .products-container, .faq-container, .team-container, .contact-container');
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








// <=========== Home Image Sliding ===========>

const slides = document.querySelectorAll('.slide-item');
const dots = document.querySelectorAll('.dots');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = 'none';
        dots[i].classList.remove('active');
    });

    slides[index].style.display = 'flex';
    dots[index].classList.add('active');
}

function prevSlide() {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    showSlide(currentIndex);
}

function nextSlide() {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
}

function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

let autoSlide = setInterval(nextSlide, 2000);

const slideContainer = document.querySelector('.slide-container');
slideContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
slideContainer.addEventListener('mouseleave', () => autoSlide = setInterval(nextSlide, 2000));

showSlide(currentIndex);






// <=========== Image Filter ===========>
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





// <=========== FAQs ===========>
const toggleItems = document.querySelectorAll('.question-card');

toggleItems.forEach((item) => {
    const toggleHead = item.querySelector('.question');

    toggleHead.addEventListener('click', () => {
        const openAnswer = document.querySelector('.question-card.active');

        if (openAnswer && openAnswer !== item) {
            toggleItem(openAnswer);
        }

        toggleItem(item);
    });
});

const toggleItem = (item) => {
    const toggleAnswer = item.querySelector('.answer');

    if (item.classList.contains('active')) {
        toggleAnswer.removeAttribute('style');
        item.classList.remove('active');
    } else {
        toggleAnswer.style.height = toggleAnswer.scrollHeight + 'px';
        item.classList.add('active');
    }
};









// <=========== Team ===========>
const teamSlides = document.querySelectorAll('.slide-card');
const bullets = document.querySelectorAll('.bullet');
let currentSlide = 0;

function showTeamSlide(index) {
    teamSlides.forEach((members, i) => {
        members.style.display = 'none';
        bullets[i].classList.remove('active');
    });

    teamSlides[index].style.display = 'flex';
    bullets[index].classList.add('active');
}

function prevTeamSlide() {
    currentSlide = (currentSlide === 0) ? teamSlides.length - 1 : currentSlide - 1;
    showTeamSlide(currentSlide);
}

function nextTeamSlide() {
    currentSlide = (currentSlide === teamSlides.length - 1) ? 0 : currentSlide + 1;
    showTeamSlide(currentSlide);
}

function changeSlide(index) {
    currentSlide = index;
    showTeamSlide(currentSlide);
}

let autoSlideing = setInterval(nextTeamSlide, 4000);

const teamContainer = document.querySelector('.slide-card');
teamContainer.addEventListener('mouseenter', () => clearInterval(autoSlideing));
teamContainer.addEventListener('mouseleave', () => autoSlide = setInterval(nextTeamSlide, 2000));

showSlide(currentSlide);











// <=========== Contact Us ===========>
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    document.getElementById("firstNameError").textContent = "";
    document.getElementById("lastNameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("messageError").textContent = "";

    let isValid = true;

    if (firstName.length < 1 || firstName.length > 15) {
        isValid = false;
        document.getElementById("firstNameError").textContent = "First name must be between 1 and 15 characters.";
    }

    if (lastName.length < 1 || lastName.length > 15) {
        isValid = false;
        document.getElementById("lastNameError").textContent = "Last name must be between 1 and 15 characters.";
    }

    const emailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        document.getElementById("emailError").textContent = "Enter a valid email address.";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        isValid = false;
        document.getElementById("phoneError").textContent = "Phone number must be exactly 10 digits.";
    }

    if (message.length < 2 || message.length > 120) {
        isValid = false;
        document.getElementById("messageError").textContent = "Message must be between 2 and 120 characters.";
    }

    if (isValid) {
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.innerHTML = '<i class="ri-check-double-fill"></i> Successfully Submitted';

        submitBtn.disabled = true;
        document.getElementById("form").reset();
    }
});

document.getElementById("form").addEventListener("input", function () {
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.innerHTML = 'Submit <i class="ri-send-plane-fill"></i>';
    submitBtn.disabled = false;
});









// <=========== Footer ===========>
document.getElementById("subscription").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("emailInput").value.trim();
    document.getElementById("subscriptionEmailError").textContent = "";

    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

    if (!emailRegex.test(email)) {
        isValid = false;
        document.getElementById("subscriptionEmailError").textContent = "Enter a valid email address.";
    }

    const submitBtn = document.getElementById("subscribeBtn");
    if (isValid) {
        submitBtn.innerHTML = 'Loading... <span class="spinner"><i class="ri-loader-4-line"></i></span>';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = 'Subscribe <i class="ri-notification-4-line"></i>';
            submitBtn.disabled = false;

            const errorPanel = document.getElementById("errorPanelContainer");
            errorPanel.style.display = "flex";

            setTimeout(() => {
                errorPanel.style.display = "none";
            }, 10000);
        }, 5000);
    } else {
        submitBtn.innerHTML = 'Subscribe <i class="ri-notification-4-line"></i>';
        submitBtn.disabled = false;
    }
});

document.getElementById("emailInput").addEventListener("input", function () {
    const submitBtn = document.getElementById("subscribeBtn");
    submitBtn.innerHTML = 'Subscribe <i class="ri-notification-4-line"></i>';
    submitBtn.disabled = false;
});
