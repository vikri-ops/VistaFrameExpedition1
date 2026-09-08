/* =========================================================
   VISTAFRAME EXPEDITION
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT
    ===================================================== */

    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const toTop = document.getElementById("toTop");

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");



    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function handleScroll() {

        if (navbar) {
            navbar.classList.toggle(
                "scrolled",
                window.scrollY > 40
            );
        }

        if (toTop) {
            toTop.classList.toggle(
                "show",
                window.scrollY > 500
            );
        }
    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    handleScroll();



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        /* Tutup menu ketika link diklik */

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* Tutup menu ketika klik di luar */

        document.addEventListener("click", event => {

            if (
                navMenu.classList.contains("open") &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });


        /* Tutup menu ketika tekan Escape */

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (toTop) {

        toTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-menu a[href^='#']"
        );


    if (
        sections.length > 0 &&
        navLinks.length > 0
    ) {

        const activeSection =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const currentId =
                            entry.target.id;

                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                            const href =
                                link.getAttribute("href");

                            if (
                                href ===
                                `#${currentId}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-30% 0px -60% 0px",
                    threshold: 0
                }
            );


        sections.forEach(section => {

            activeSection.observe(section);

        });

    }



    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }



    /* =====================================================
       TRIP CARD
       PILIH DESTINASI
    ===================================================== */

    const tripButtons =
        document.querySelectorAll(
            ".trip-card .small-btn"
        );


    const destinationInput =
        document.getElementById(
            "destination"
        );


    tripButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const card =
                    button.closest(
                        ".trip-card"
                    );

                if (!card) {
                    return;
                }

                const titleElement =
                    card.querySelector("h3");

                if (!titleElement) {
                    return;
                }

                const title =
                    titleElement.textContent
                        .trim()
                        .toLowerCase();


                let destination =
                    "";


                /* Gunung */

                if (title.includes("rinjani")) {

                    destination =
                        "Gunung Rinjani";

                } else if (
                    title.includes("semeru")
                ) {

                    destination =
                        "Gunung Semeru";

                } else if (
                    title.includes("bromo")
                ) {

                    destination =
                        "Gunung Bromo";

                } else if (
                    title.includes("prau")
                ) {

                    destination =
                        "Gunung Prau";

                } else if (
                    title.includes("kerinci")
                ) {

                    destination =
                        "Gunung Kerinci";

                } else if (
                    title.includes("merbabu")
                ) {

                    destination =
                        "Gunung Merbabu";


                /* Danau */

                } else if (
                    title.includes("toba")
                ) {

                    destination =
                        "Danau Toba";

                } else if (
                    title.includes("segara")
                ) {

                    destination =
                        "Danau Segara Anak";

                } else {

                    destination =
                        titleElement.textContent.trim();

                }


                /* Isi form */

                if (destinationInput) {

                    destinationInput.value =
                        destination;

                }


                /* Scroll ke kontak */

                const contactSection =
                    document.getElementById(
                        "kontak"
                    );


                if (contactSection) {

                    contactSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }


                /* Fokus ke form */

                setTimeout(() => {

                    if (contactForm) {

                        const nameInput =
                            document.getElementById(
                                "name"
                            );

                        if (nameInput) {
                            nameInput.focus();
                        }

                    }

                }, 700);

            }
        );

    });



    /* =====================================================
       CONTACT FORM → WHATSAPP
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                /* Ambil data */

                const nameInput =
                    document.getElementById(
                        "name"
                    );

                const phoneInput =
                    document.getElementById(
                        "phone"
                    );

                const destinationSelect =
                    document.getElementById(
                        "destination"
                    );

                const messageInput =
                    document.getElementById(
                        "message"
                    );


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";

                const destination =
                    destinationSelect
                        ? destinationSelect.value
                        : "";

                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                /* Reset pesan */

                if (formMessage) {

                    formMessage.textContent = "";

                }


                /* Validasi */

                if (!name) {

                    showFormMessage(
                        "Nama wajib diisi.",
                        "error"
                    );

                    if (nameInput) {
                        nameInput.focus();
                    }

                    return;
                }


                if (!phone) {

                    showFormMessage(
                        "Nomor WhatsApp wajib diisi.",
                        "error"
                    );

                    if (phoneInput) {
                        phoneInput.focus();
                    }

                    return;
                }


                /* Validasi nomor */

                const cleanPhone =
                    phone.replace(
                        /[^0-9+]/g,
                        ""
                    );


                if (
                    cleanPhone.length < 10
                ) {

                    showFormMessage(
                        "Nomor WhatsApp tidak valid.",
                        "error"
                    );

                    if (phoneInput) {
                        phoneInput.focus();
                    }

                    return;
                }


                /* =================================================
                   NOMOR WHATSAPP ADMIN
                   
                   GANTI NOMOR INI
                   Contoh:
                   6281234567890
                ================================================= */

                const adminWhatsApp =
                    "6281234567890";


                /* =================================================
                   PESAN WHATSAPP
                ================================================= */

                const whatsappMessage =
`Halo VistaFrame Expedition! 👋

Saya ingin bertanya tentang Open Trip.

Nama: ${name}
Nomor WhatsApp: ${phone}
Destinasi: ${destination || "Belum memilih destinasi"}

Pesan:
${message || "Saya ingin mendapatkan informasi mengenai open trip."}

Terima kasih.`;


                const whatsappURL =
                    `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(
                        whatsappMessage
                    )}`;


                /* Tampilkan status */

                showFormMessage(
                    "Membuka WhatsApp...",
                    "success"
                );


                /* Buka WhatsApp */

                setTimeout(() => {

                    window.open(
                        whatsappURL,
                        "_blank"
                    );

                }, 300);

            }
        );

    }



    /* =====================================================
       FORM MESSAGE
    ===================================================== */

    function showFormMessage(
        message,
        type = "success"
    ) {

        if (!formMessage) {
            return;
        }

        formMessage.textContent =
            message;

        formMessage.classList.remove(
            "success",
            "error"
        );

        formMessage.classList.add(
            type
        );

    }



    /* =====================================================
       IMAGE LAZY LOAD
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            if (!img.hasAttribute("loading")) {

                img.setAttribute(
                    "loading",
                    "lazy"
                );

            }

        });


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    if (galleryItems.length > 0) {

        galleryItems.forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    const image =
                        item.querySelector("img");

                    if (!image) {
                        return;
                    }

                    createLightbox(
                        image.src,
                        image.alt
                    );

                }
            );

        });

    }



    /* =====================================================
       CREATE LIGHTBOX
    ===================================================== */

    function createLightbox(
        imageSrc,
        imageAlt
    ) {

        /* Cek apakah sudah ada */

        let lightbox =
            document.getElementById(
                "galleryLightbox"
            );


        /* Kalau belum, buat */

        if (!lightbox) {

            lightbox =
                document.createElement(
                    "div"
                );

            lightbox.id =
                "galleryLightbox";

            lightbox.innerHTML = `
                <div class="lightbox-content">

                    <button
                        class="lightbox-close"
                        aria-label="Tutup"
                    >
                        ×
                    </button>

                    <img
                        class="lightbox-image"
                        src=""
                        alt=""
                    >

                </div>
            `;


            document.body.appendChild(
                lightbox
            );


            /* CSS lightbox */

            const style =
                document.createElement(
                    "style"
                );

            style.textContent = `

                #galleryLightbox {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    padding: 30px;

                    background:
                        rgba(0, 35, 24, .92);

                    backdrop-filter:
                        blur(12px);

                    opacity: 0;
                    visibility: hidden;

                    transition: .3s ease;
                }

                #galleryLightbox.show {
                    opacity: 1;
                    visibility: visible;
                }

                .lightbox-content {
                    position: relative;

                    max-width: 1000px;
                    max-height: 90vh;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .lightbox-image {
                    max-width: 100%;
                    max-height: 85vh;

                    width: auto;
                    height: auto;

                    border-radius: 18px;

                    box-shadow:
                        0 30px 80px
                        rgba(0,0,0,.4);
                }

                .lightbox-close {
                    position: absolute;

                    top: -20px;
                    right: -20px;

                    width: 42px;
                    height: 42px;

                    display: grid;
                    place-items: center;

                    border-radius: 50%;

                    border: 1px solid
                        rgba(255,255,255,.25);

                    color: #fff;

                    background:
                        rgba(255,255,255,.12);

                    font-size: 27px;

                    cursor: pointer;

                    z-index: 2;

                    transition: .3s ease;
                }

                .lightbox-close:hover {
                    background: #e3ad68;
                    color: #073d2b;
                    transform: rotate(90deg);
                }

                @media (max-width: 600px) {

                    #galleryLightbox {
                        padding: 18px;
                    }

                    .lightbox-close {
                        top: -12px;
                        right: -5px;
                    }

                }

            `;

            document.head.appendChild(
                style
            );


            /* Close button */

            const closeButton =
                lightbox.querySelector(
                    ".lightbox-close"
                );


            closeButton.addEventListener(
                "click",
                closeLightbox
            );


            /* Klik background */

            lightbox.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        lightbox
                    ) {

                        closeLightbox();

                    }

                }
            );


            /* Escape */

            document.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key ===
                        "Escape"
                    ) {

                        closeLightbox();

                    }

                }
            );

        }


        /* Isi gambar */

        const lightboxImage =
            lightbox.querySelector(
                ".lightbox-image"
            );

        lightboxImage.src =
            imageSrc;

        lightboxImage.alt =
            imageAlt || "Galeri VistaFrame Expedition";


        /* Tampilkan */

        lightbox.classList.add(
            "show"
        );

        document.body.style.overflow =
            "hidden";

    }



    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    function closeLightbox() {

        const lightbox =
            document.getElementById(
                "galleryLightbox"
            );

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove(
            "show"
        );

        document.body.style.overflow =
            "";

    }



    /* =====================================================
       PHONE INPUT
       HANYA ANGKA
    ===================================================== */

    const phoneInput =
        document.getElementById(
            "phone"
        );


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                phoneInput.value =
                    phoneInput.value.replace(
                        /[^0-9+]/g,
                        ""
                    );

            }
        );

    }



    /* =====================================================
       CLOSE MOBILE MENU WHEN RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 768 &&
                navMenu
            ) {

                navMenu.classList.remove(
                    "open"
                );

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );



    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "VistaFrame Expedition website loaded successfully."
    );

});