let tooglephone = document.querySelector(".toogle-phone");
let phone = document.querySelector(".phone");
let closePhone = document.querySelector(".close");

tooglephone.addEventListener("click", function () {
    phone.classList.add("active");
});

closePhone.addEventListener("click", function () {
    phone.classList.remove("active");
});

let arwwo = document.querySelector(".arwwo");

window.addEventListener("scroll", function () {
    if (window.scrollY > 60 - 0) {
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

//  ----------

let onlode = document.querySelector(".onlode");

function lode() {
    onlode.classList.add("none");
}

setTimeout(() => {
    onlode.remove();
}, 1000);

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
