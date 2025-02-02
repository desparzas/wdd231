document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    console.log(logo);
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.innerText = navMenu.classList.contains('open') ? 'X' : '☰';
        logo.classList.toggle('hidden');
    });

});