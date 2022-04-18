export default function handleOpenHamburger(logoSelector, hamburgerSelector, hamburgerButtonSelector) {
    const headerLogo = document.querySelector(logoSelector);
    const hamburgerButton = document.querySelector(hamburgerButtonSelector);
    const hamburger = document.querySelector(hamburgerSelector);

    function removeHamburgerStyle() {
        hamburger.removeAttribute('style');
    }
    
    hamburgerButton.addEventListener('click', e => {
        console.log(e.target.checked);
        if (e.target.checked) {
            headerLogo.style.opacity = 0;
            hamburger.removeEventListener('transitionend', removeHamburgerStyle);
            hamburger.style.overflow = 'visible';
        } else if (!e.target.checked) {
            headerLogo.removeAttribute('style');
            hamburger.addEventListener('transitionend', removeHamburgerStyle);
        }
    })
}