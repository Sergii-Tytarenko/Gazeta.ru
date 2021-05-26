/* Vendors
---------------------------------------------------------------*/
import focusVisible from './vendors/focusVisible';
import burger from './files/burger';


/* Header functions
---------------------------------------------------------------*/
let headerAside = document.querySelector('.main-header__aside'),
    menu = document.querySelector('.main-nav__menu'),
    menuBtns = document.querySelectorAll('.main-nav__btn'),
    linksBlock = document.querySelectorAll('.main-nav__links');


/* Navigation wrapper height
---------------------------------------------------------------*/
window.addEventListener('resize', () => calcNavHeigt());
calcNavHeigt()

function calcNavHeigt() {
    let mainNav = document.querySelector('.main-nav');

    if (mainNav) {
        let wrapper = mainNav.querySelector('.main-nav__wrapper');
        let menuHeight = mainNav.querySelector('.main-nav__menu').offsetHeight;
        let asideHeight = document.querySelector('.main-header__aside').offsetHeight;
        let h = document.body.clientHeight - (asideHeight + menuHeight);
    
        wrapper.style.maxHeight = h + 'px';
    }
}


/* Navigation tabs
---------------------------------------------------------------*/
window.addEventListener('resize', () => checkMenu());
checkMenu()

window.addEventListener('scroll', () => {
    let height = pageYOffset;
    scrollAside(height)
})

function checkMenu() {
    let  menuHide = getComputedStyle(menu).display === 'none';

    if (menuHide) {
        linksBlock.forEach(el => {
            el.classList.remove('hide')
        })
    } else {
        initTabs()
    }
}

function initTabs() {
    shwoLinks()

    menu.addEventListener('click', (event) => {
        let target = event.target;

        if (target && target.matches('button.main-nav__btn')) {
            menuBtns.forEach((item, i) => {
                if (target == item) {
                    shwoLinks(i);
                }
            });
        };
    })

    function shwoLinks(i = 0) {
        hideLinks();
        menuBtns[i].classList.add('active');
        linksBlock[i].classList.remove('hide')
    }

    function hideLinks() {
        menuBtns.forEach(el => {
            el.classList.remove('active')
        })
    
        linksBlock.forEach(el => {
            el.classList.add('hide')
        })
    }
}

function scrollAside(value) {
   if (getComputedStyle(headerAside).position == 'absolute') {
      headerAside.style.top = value + 'px';
   }
}

