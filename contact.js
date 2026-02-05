let tooglephone = document.querySelector(".toogle-phone");
let phone = document.querySelector(".phone");
let closePhone = document.querySelector(".close");

tooglephone.addEventListener("click", function () {
    phone.classList.add("active");
});

closePhone.addEventListener("click", function () {
    phone.classList.remove("active");
});

let onlode = document.querySelector(".onlode");

function lode() {
    window.addEventListener("load", function () {
        onlode.classList.add("none");
    });
}

setTimeout(() => {
    onlode.remove();
}, 100);

disableRightClick();

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
