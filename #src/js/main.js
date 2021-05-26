/* Vendors
---------------------------------------------------------------*/
import focusVisible from './vendors/focusVisible';
import burger from './files/burger';


/* Burger menu height
---------------------------------------------------------------*/
window.addEventListener('resize', () => calcNavHeigt());
calcNavHeigt()

function calcNavHeigt() {
    let mainNav = document.querySelector('.main-nav');

    if (mainNav) {
        let wrapper = mainNav.querySelector('.main-nav__wrapper');
        let menuHeight = mainNav.querySelector('.main-nav__menu').clientHeight;
        let asideHeight = document.querySelector('.main-header__aside').clientHeight;
        let h = document.body.clientHeight - (asideHeight + menuHeight);
    
        wrapper.style.maxHeight = h + 'px';
    }
}



