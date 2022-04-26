export default function handleOpenHamburger(logoSelector, hamburgerSelector, hamburgerButtonSelector, overlaySelector, page) {
    const headerLogo = document.querySelector(logoSelector);
    const hamburgerButton = document.querySelector(hamburgerButtonSelector);
    const hamburger = document.querySelector(hamburgerSelector);
    const logo = hamburger.querySelector('.logo');
    const navigationList = hamburger.querySelectorAll('.navigation__item');
    const overlay = document.querySelector(overlaySelector);

    function removeHamburgerStyle() {
        hamburger.removeAttribute('style');
    }

    function hideBodyOverflow() {
        document.body.style.overflow = 'hidden';
    }

    function imitateHamburgerClick() {
        hamburgerButton.click();
    }
    
    hamburgerButton.addEventListener('click', e => {
        if (e.target.checked) {
            headerLogo.style.opacity = 0;
            overlay.classList.add('overlay_active');
            overlay.addEventListener('click', imitateHamburgerClick);
            hamburger.addEventListener('transitionend', hideBodyOverflow);
            hamburger.removeEventListener('transitionend', removeHamburgerStyle);
            hamburger.style.overflow = 'visible'; 
            logo.addEventListener('click', imitateHamburgerClick);
            navigationList.forEach(item => item.addEventListener('click', imitateHamburgerClick)); 
        } else if (!e.target.checked) {
            headerLogo.removeAttribute('style');
            overlay.classList.remove('overlay_active');
            overlay.removeEventListener('click', imitateHamburgerClick);
            hamburger.addEventListener('transitionend', removeHamburgerStyle);
            hamburger.removeEventListener('transitionend', hideBodyOverflow);
            document.body.removeAttribute('style');
            logo.removeEventListener('click', imitateHamburgerClick);
            navigationList.forEach(item => item.removeEventListener('click', imitateHamburgerClick));
        }
    })
}