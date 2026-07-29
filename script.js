/* ===========================================
   PORTFOLIO v1.0
   Dilini Nisansala
===========================================*/
document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
    initRevealAnimation();
    initBackToTop();
    initModal();

});


/* ===========================================
   MOBILE MENU
===========================================*/

function initMobileMenu() {

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


/* ===========================================
   SMOOTH SCROLL
===========================================*/

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

}


/* ===========================================
   ACTIVE NAVIGATION
===========================================*/

function initScrollSpy() {

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}


/* ===========================================
   SCROLL REVEAL
===========================================*/

function initRevealAnimation() {

    const revealElements = document.querySelectorAll(

        ".hero, .about, .projects, .articles, .youtube, .contact"

    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(item => {

        item.classList.add("hidden");

        observer.observe(item);

    });

}


/* ===========================================
   BACK TO TOP BUTTON
===========================================*/

function initBackToTop() {

    const button = document.createElement("button");

    button.innerHTML = "↑";

    button.className = "back-to-top";

    document.body.appendChild(button);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ===========================================
    MODAL + EMAILJS
===========================================*/

function initModal() {

    const modal = document.getElementById("contactModal");
    const openBtn = document.getElementById("openModal");
    const closeBtn = document.getElementById("closeBtn");
    const closeIcon = document.querySelector(".close");

    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");


    if (!modal || !openBtn || !closeBtn || !closeIcon) {

        console.error("Modal elements not found.");

        return;

    }

    // OPEN MODAL
    openBtn.addEventListener("click", function (e) {

        e.preventDefault();

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

    // CLOSE MODAL
    function closeModal() {

        modal.classList.remove("show");

        document.body.style.overflow = "auto";

    }


    closeBtn.addEventListener("click", closeModal);

    closeIcon.addEventListener("click", closeModal);


    modal.addEventListener("click", function (e) {

        if (e.target === modal) {

            closeModal();

        }

    });

    // EMAILJS FORM SUBMIT
    
    if (contactForm) {

        contactForm.addEventListener("submit", function(e) {

            e.preventDefault();


            // EmailJS details

            const serviceID = "service_q196zrh";
            const templateID = "template_8svl9ak";


            emailjs.sendForm(
                serviceID,
                templateID,
                contactForm
            )

            .then(function() {


                // Show success message

                if (successMessage) {

                    successMessage.style.display = "block";

                }


                // Reset form

                contactForm.reset();



                // Close modal after 3 seconds

                setTimeout(() => {

                    if (successMessage) {

                        successMessage.style.display = "none";

                    }

                    closeModal();


                }, 3000);


            })

            .catch(function(error) {


                console.error("EmailJS Error:", error);


                alert(
                    "Message could not be sent. Please try again."
                );


            });


        });

    }

}