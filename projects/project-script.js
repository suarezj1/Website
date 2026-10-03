/* ========================================
   HEADER DROPDOWNS
======================================== */

const dropdownMenus = document.querySelectorAll(
    ".work-menu, .contact-menu"
);

dropdownMenus.forEach((menu) => {

    const button = menu.querySelector(
        ".work-button, .contact-button"
    );

    if (!button) return;


    button.addEventListener("click", (event) => {

        event.stopPropagation();


        /* Close the other dropdown */

        dropdownMenus.forEach((otherMenu) => {

            if (otherMenu !== menu) {

                otherMenu.classList.remove("open");

                const otherButton =
                    otherMenu.querySelector(
                        ".work-button, .contact-button"
                    );

                if (otherButton) {
                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            }
        });


        /* Open / close clicked dropdown */

        const isOpen =
            menu.classList.toggle("open");

        button.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

});


/* Close dropdowns when clicking elsewhere */

document.addEventListener("click", () => {

    dropdownMenus.forEach((menu) => {

        menu.classList.remove("open");

        const button =
            menu.querySelector(
                ".work-button, .contact-button"
            );

        if (button) {
            button.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

});


/* ========================================
   HONEYPOT ACTIVITY LOG
======================================== */

const logEntries = document.getElementById("activity-log-entries");
const activityLog = document.getElementById("activity-log");

function addLogEntry(event) {

    if (!logEntries || !activityLog) return;

    const row = document.createElement("div");

    row.classList.add("activity-log-row");

    row.innerHTML = `
        <span>${event.time}</span>
        <span>${event.event}</span>
        <span>${event.status}</span>
        <span>${event.location}</span>
    `;

    logEntries.appendChild(row);

    activityLog.scrollTop = activityLog.scrollHeight;
}

/* ========================================
   CONSUMER BEHAVIOR SLIDESHOW
======================================== */

(function () {

    const sliders = document.querySelectorAll('.walkthrough-slider');

    if (!sliders.length) return;

    sliders.forEach((slider) => {

        const slides = slider.querySelectorAll('.w-slide');
        const dots = slider.querySelectorAll('.w-dot');
        const prevBtn = slider.querySelector('.w-prev');
        const nextBtn = slider.querySelector('.w-next');
        const counter = slider.querySelector('.w-current');

        if (!slides.length) return;

        let current = 0;

        function render() {

            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === current);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === current);
            });

            if (counter) {
                counter.textContent = current + 1;
            }

            if (prevBtn) {
                prevBtn.disabled = current === 0;
            }

            if (nextBtn) {
                nextBtn.disabled = current === slides.length - 1;
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (current > 0) {
                    current -= 1;
                    render();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (current < slides.length - 1) {
                    current += 1;
                    render();
                }
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                current = i;
                render();
            });
        });

        render();

    });

})();

/* ========================================
   REDLINING
======================================== */

(function () {
    var sections = Array.prototype.slice.call(document.querySelectorAll('.rl-section'));
    var links = Array.prototype.slice.call(document.querySelectorAll('.page-index-links a'));

    if (!sections.length || !links.length) return;

    var linkFor = {};
    links.forEach(function (link) {
        var id = link.getAttribute('href').slice(1);
        linkFor[id] = link;
    });

    function setActive(id) {
        links.forEach(function (link) {
            link.classList.toggle('active', link === linkFor[id]);
        });
    }

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        },
        { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });

    // Set the first section active by default.
    setActive(sections[0].id);
})();

/* =========================================
   HONEYPOT SAMPLE ACTIVITY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const activityContainer =
        document.getElementById("activity-log-entries");

    // Only run on the honeypot page
    if (!activityContainer) return;

    fetch("images/data/honeypot-activity.csv")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load activity data.");
            }

            return response.text();
        })

        .then(csv => {

            const rows = csv.trim().split(/\r?\n/);

            // Remove CSV header
            rows.shift();

            activityContainer.innerHTML = "";

            rows.forEach(row => {

                const columns = row
                    .split(",")
                    .map(value =>
                        value.trim().replace(/^"|"$/g, "")
                    );

                if (columns.length < 4) return;

                const logRow = document.createElement("div");
                logRow.className = "activity-log-row";

                columns.slice(0, 4).forEach(value => {
                    const cell = document.createElement("span");
                    cell.textContent = value;
                    logRow.appendChild(cell);
                });

                activityContainer.appendChild(logRow);
            });
        })

        .catch(error => {

            console.error(error);

            activityContainer.innerHTML = `
                <div class="activity-log-row">
                    <span>—</span>
                    <span>Activity unavailable</span>
                    <span>—</span>
                    <span>—</span>
                </div>
            `;
        });
});