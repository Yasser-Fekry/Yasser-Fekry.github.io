let tooglephone = document.querySelector(".toogle-phone");
let phone = document.querySelector(".phone");
let closePhone = document.querySelector(".close");

tooglephone.addEventListener("click", function () {
    phone.classList.add("active");
});

closePhone.addEventListener("click", function () {
    phone.classList.remove("active");
});

// Function to open certificate in modal
function openCertificate(imageSrc) {
    const modal = document.querySelector(".active-img-pop");
    const modalImg = modal.querySelector(".div-img img");
    if (!modalImg) {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = "Certificate";
        img.loading = "lazy";
        document.querySelector(".active-img-pop .div-img").innerHTML = '';
        document.querySelector(".active-img-pop .div-img").appendChild(img);
    } else {
        modalImg.src = imageSrc;
    }
    modal.classList.add("active");
}

// --- Mouse-follow light effect ---
;
(function () {
    if ('ontouchstart' in window) return; // skip for touch devices
    const light = document.createElement('div');
    light.className = 'mouse-light';
    document.body.appendChild(light);

    let active = false;

    // Show light when hovering target elements
    const targets = document.querySelectorAll('.serv, .skill-card-about, .skill-card, .tool-card, .img-contnt, .icon-sevr');
    targets.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            active = true;
            light.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            active = false;
            light.classList.remove('active');
        });
    });

    // Position light on mouse move, but only visible when active
    document.addEventListener('mousemove', (e) => {
        light.style.left = e.clientX + 'px';
        light.style.top = e.clientY + 'px';
        if (active) {
            // small scale up near cursor
            light.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }, {
        passive: true
    });
})();

// Close modal when clicking outside
document.querySelector(".active-img-pop").addEventListener("click", function (e) {
    if (e.target === this) {
        this.classList.remove("active");
    }
});

let arwwo = document.querySelector(".arwwo");

window.addEventListener("scroll", function () {
    if (window.scrollY > 600) {
        arwwo.classList.add("active");
    } else {
        arwwo.classList.remove("active");
    }
});
arwwo.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

let wats = document.querySelector(".whats");

window.addEventListener("scroll", function () {
    if (window.scrollY > 600) {
        wats.classList.add("active");
    } else {
        wats.classList.remove("active");
    }
});

let continercontant = document.querySelector(".continer-contant-1");
let imgsection1 = document.querySelector(".img-section-1");

window.addEventListener("scroll", function () {
    if (window.scrollY >= continercontant.offsetTop - 1000) {
        continercontant.classList.add("active");
        imgsection1.classList.add("active");
    } else {
        continercontant.classList.remove("active");
        imgsection1.classList.remove("active");
    }
});

// let middel = document.querySelector(".middel");
// let front = document.querySelector(".front");

// window.addEventListener("load", function () {
//   middel.classList.add("active");
//   front.classList.add("active");
// });

let point = 0;
let pointslide = document.querySelectorAll(".point-slide");
let pointslidespan = document.querySelectorAll(".point-slide span");

let arraypointslidespan = Array.from(pointslidespan);

arraypointslidespan[0].classList.add("active");
arraypointslidespan.forEach((element) => {
    element.addEventListener("click", function () {
        removeactive();
        element.classList.add("active");

        arraypointslidespan[0].addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    });
});

let scroolbottom = document.querySelector(".scrool-bottom");
let titlesection = document.querySelectorAll(".title-section");

scroolbottom.addEventListener("click", function () {
    window.scrollTo({
        top: titlesection[0].offsetTop - 100,
        behavior: "smooth",
    });
});

arraypointslidespan[1].addEventListener("click", function () {
    window.scrollTo({
        top: titlesection[0].offsetTop - 100,
        behavior: "smooth",
    });
});

arraypointslidespan[2].addEventListener("click", function () {
    window.scrollTo({
        top: titlesection[1].offsetTop - 100,
        behavior: "smooth",
    });
});

arraypointslidespan[3].addEventListener("click", function () {
    window.scrollTo({
        top: titlesection[2].offsetTop - 100,
        behavior: "smooth",
    });
});

arraypointslidespan[4].addEventListener("click", function () {
    window.scrollTo({
        top: titlesection[3].offsetTop - 100,
        behavior: "smooth",
    });
});

function removeactive() {
    pointslidespan.forEach((element) => {
        element.classList.remove("active");
    });
}

window.addEventListener("scroll", function () {
    if (window.scrollY >= 0) {
        removeactive();
        arraypointslidespan[0].classList.add("active");
    }

    if (window.scrollY >= titlesection[0].offsetTop - 200) {
        removeactive();
        arraypointslidespan[1].classList.add("active");
    }

    if (window.scrollY >= titlesection[1].offsetTop - 200) {
        removeactive();
        arraypointslidespan[2].classList.add("active");
    }

    if (window.scrollY >= titlesection[2].offsetTop - 200) {
        removeactive();
        arraypointslidespan[3].classList.add("active");
    }
    if (window.scrollY >= titlesection[3].offsetTop - 200) {
        removeactive();
        arraypointslidespan[4].classList.add("active");
    }
});

// ---------------------------
let iconcentershow = document.querySelectorAll(".icon-center-show");

iconcentershow.forEach((element) => {
    element.addEventListener("click", function () {
        window.open("work.html", "_blank");
    });
});

let activeimgpop = document.querySelector(".active-img-pop");
let eayclick = document.querySelectorAll(".eay-click");
let imgcontntjs = document.querySelectorAll(".img-contnt-js .img-contnt");

let divimg = document.querySelector(".div-img");

eayclick.forEach((element) => {
    element.addEventListener("click", function (eo) {
        showactiveimg();
        let getsrc = element.parentElement.getElementsByTagName("img")[0].src;
        let srcimg = divimg.getElementsByTagName("img")[0];

        srcimg.src = getsrc;
    });
});

imgcontntjs.forEach((element) => {
    element.addEventListener("click", function (eo) {
        showactiveimg();
        let getsrc = element.getElementsByTagName("img")[0].src;
        let srcimg = divimg.getElementsByTagName("img")[0];

        srcimg.src = getsrc;
    });
});

activeimgpop.addEventListener("click", function () {
    removeshowactiveimg();
});

function removeshowactiveimg() {
    activeimgpop.classList.remove("active");
}

function showactiveimg() {
    activeimgpop.classList.add("active");
}

// -----------------------

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    showCustomWarning("🚫 Right-click has been disabled for security reasons.");
});

function showCustomWarning(message) {
    let warning = document.createElement("div");
    warning.textContent = message;
    warning.style.position = "fixed";
    warning.style.bottom = "30px";
    warning.style.left = "50%";
    warning.style.transform = "translateX(-50%)";
    warning.style.background = "rgba(11, 5, 29, 0.95)";
    warning.style.border = "1px solid #6131df";
    warning.style.color = "#fff";
    warning.style.padding = "12px 30px";
    warning.style.borderRadius = "50px";
    warning.style.fontFamily = "'Cairo', sans-serif";
    warning.style.fontSize = "16px";
    warning.style.boxShadow = "0 0 25px rgba(97, 49, 223, 0.4)";
    warning.style.zIndex = "9999";
    warning.style.backdropFilter = "blur(5px)";
    warning.style.transition = "all 0.5s ease";

    document.body.appendChild(warning);
    setTimeout(() => {
        warning.style.opacity = "0";
        warning.style.transform = "translateX(-50%) translateY(20px)";
        setTimeout(() => warning.remove(), 500);
    }, 3000);
}


document.onkeydown = function (e) {
    if (event.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == "S".charCodeAt(0)) {
        return false;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const certificates = [{
            filename: 'Cloud and Virtualization Concepts.jpg',
            name: 'Cloud and Virtualization Concepts'
        },
        {
            filename: 'Computer Network Fundamentals.jpg',
            name: 'Computer Network Fundamentals'
        },
        {
            filename: 'Cybersecurity For Beginners.jpg',
            name: 'Cybersecurity For Beginners'
        },
        {
            filename: 'Ethical Hacking.jpg',
            name: 'Ethical Hacking'
        },
        {
            filename: 'Implementation of Computer Network Fundamentals.jpg',
            name: 'Implementation of Computer Network Fundamentals'
        },
        {
            filename: 'Introduction to network security.jpg',
            name: 'Introduction to network security'
        },
        {
            filename: 'Network Virtualization Concepts.jpg',
            name: 'Network Virtualization Concepts'
        },
        {
            filename: 'Red Hat System Administration I.jpg',
            name: 'Red Hat System Administration I'
        }
    ];

    let currentCertIndex = 0;

    function updateCertificateDisplay(index) {
        // Ensure index is within bounds
        if (index < 0) index = 0;
        if (index >= certificates.length) index = certificates.length - 1;

        currentCertIndex = index;

        // Update image
        const certImage = document.getElementById('certImage');
        const certPath = `imges/web/${certificates[index].filename}`;
        certImage.src = certPath;
        certImage.alt = certificates[index].name;

        // Update certificate name
        document.getElementById('certName').textContent = certificates[index].name;

        // Update indicator
        document.getElementById('certIndex').textContent = index + 1;

        // Update button states
        const prevBtn = document.getElementById('prevCert');
        const nextBtn = document.getElementById('nextCert');

        // Disable prev button if at first certificate
        prevBtn.style.opacity = index === 0 ? '0.5' : '1';
        prevBtn.style.cursor = index === 0 ? 'not-allowed' : 'pointer';

        // Disable next button if at last certificate
        nextBtn.style.opacity = index === certificates.length - 1 ? '0.5' : '1';
        nextBtn.style.cursor = index === certificates.length - 1 ? 'not-allowed' : 'pointer';
    }

    // Event listeners for navigation
    document.getElementById('prevCert').addEventListener('click', () => {
        if (currentCertIndex > 0) {
            updateCertificateDisplay(currentCertIndex - 1);
        }
    });

    document.getElementById('nextCert').addEventListener('click', () => {
        if (currentCertIndex < certificates.length - 1) {
            updateCertificateDisplay(currentCertIndex + 1);
        }
    });

    // Download button
    document.getElementById('downloadCert').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = `imges/web/${certificates[currentCertIndex].filename}`;
        link.download = certificates[currentCertIndex].filename;
        link.click();
    });

    // View large button
    document.getElementById('viewCert').addEventListener('click', () => {
        openCertificate(`imges/web/${certificates[currentCertIndex].filename}`);
    });

    // Initialize display on page load
    updateCertificateDisplay(0);
});

// Section 3 Content Switcher
document.addEventListener('DOMContentLoaded', () => {
    const switchers = document.querySelectorAll('.switcher-btn');
    const sections = {
        'certs-content': document.getElementById('certs-content'),
        'blogs-content': document.getElementById('blogs-content')
    };

    switchers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            switchers.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');

            // Hide all sections and show target
            const targetId = e.target.getAttribute('data-target');
            Object.values(sections).forEach(sec => sec.style.display = 'none');

            if (sections[targetId]) {
                sections[targetId].style.display = 'block';
                // Refresh AOS animations if present
                if (typeof AOS !== 'undefined') AOS.refresh();
            }
        });
    });
});

// Blog Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('blogSearchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const blogPosts = document.querySelectorAll('.design-th .img-contnt');

            blogPosts.forEach(post => {
                const img = post.querySelector('img');
                const altText = img ? img.getAttribute('alt').toLowerCase() : '';

                if (altText.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });

            // Refresh AOS animations
            if (typeof AOS !== 'undefined') AOS.refresh();
        });
    }
});

// 3D Tilt Effect for Modern Skill Cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.modern-skill-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (max 15 degrees)
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            // Remove transition for instant follow
            card.style.transition = 'none';

            // Apply transform with perspective
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            // Add smooth transition for reset
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});

// Function to check if the user is on a mobile device and show a warning
function checkMobileDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024;

    if (isMobile) {
        const warningDiv = document.createElement("div");
        warningDiv.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #0b051d; z-index: 9999999; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; text-align: center; padding: 20px;";

        warningDiv.innerHTML = `
            <i class="fas fa-desktop" style="font-size: 4rem; color: #6131df; margin-bottom: 20px;"></i>
            <h1 style="color: #ffffff; font-size: 2rem; margin-bottom: 10px;">Sorry , We do not support mobile view yet.</h1>
            <p style="font-size: 1.1rem; color: #cfcfe0;">Please feel free to use desktop application</p>
        `;

        document.body.appendChild(warningDiv);
        document.body.style.overflow = "hidden";
    }
}

window.addEventListener("load", checkMobileDevice);
