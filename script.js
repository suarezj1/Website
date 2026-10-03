/* ========================================
   CONTACT DROPDOWN
======================================== */

const contactMenu = document.querySelector(".contact-menu");
const contactButton = document.getElementById("contact-button");

if (contactMenu && contactButton) {

    contactButton.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen = contactMenu.classList.toggle("open");

        contactButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    document.addEventListener("click", function (event) {

        if (!contactMenu.contains(event.target)) {

            contactMenu.classList.remove("open");

            contactButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* ========================================
   LANGUAGE SWITCHER
======================================== */

const languageButtons =
    document.querySelectorAll(".language-button");

const translatedElements =
    document.querySelectorAll("[data-en][data-es]");


function setLanguage(language) {

    translatedElements.forEach(function (element) {

        element.textContent =
            element.dataset[language];

    });


    languageButtons.forEach(function (button) {

        button.classList.toggle(
            "active",
            button.dataset.language === language
        );

    });


    document.documentElement.lang = language;

    localStorage.setItem(
        "portfolio-language",
        language
    );

}


languageButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        setLanguage(
            button.dataset.language
        );

    });

});


/* Remember visitor's language */

const savedLanguage =
    localStorage.getItem("portfolio-language");

if (
    savedLanguage === "en" ||
    savedLanguage === "es"
) {

    setLanguage(savedLanguage);

}


/* ========================================
   BONNIE IDLE + CLICK ANIMATION
======================================== */

const bonnie = document.getElementById("bonnie");

if (bonnie) {

    let bonnieTimer;


    function scheduleBonnie() {

        clearTimeout(bonnieTimer);

        bonnieTimer = setTimeout(function () {

            bonnie.currentTime = 0;
            bonnie.play();

        }, 90000);

    }


    bonnie.addEventListener("ended", function () {

        scheduleBonnie();

    });


    bonnie.addEventListener("click", function () {

        clearTimeout(bonnieTimer);

        bonnie.currentTime = 0;
        bonnie.play();

    });


    scheduleBonnie();

}