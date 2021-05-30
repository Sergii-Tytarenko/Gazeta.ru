/* Vendors
---------------------------------------------------------------*/
import focusVisible from './vendors/focusVisible';
import burger from './files/burger';


/* Header functions
---------------------------------------------------------------*/
let headerAside = document.querySelector('.main-header__aside'),
    mainNav = document.querySelector('.main-nav'),
    navWrapper = document.querySelector('.main-nav__wrapper'),
    menu = document.querySelector('.main-nav__menu'),
    menuBtns = document.querySelectorAll('.main-nav__btn'),
    linksBlock = document.querySelectorAll('.main-nav__links');


/* Navigation's wrapper height (max-height at the small display)
---------------------------------------------------------------*/
window.addEventListener('resize', () => calcNavHeigt());
calcNavHeigt()

function calcNavHeigt() {
    if (mainNav) {
        let h = document.body.clientHeight - (headerAside.offsetHeight +  menu.offsetHeight);
        navWrapper.style.maxHeight = h + 'px';
    }
}


/* Navigation tabs
---------------------------------------------------------------*/
window.addEventListener('resize', () => checkMenu());
checkMenu()

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


/* Scroll aside
---------------------------------------------------------------*/
window.addEventListener('scroll', () => {
    let height = pageYOffset;

    if (getComputedStyle(headerAside).position == 'absolute') {
        setTimeout(() => {
            headerAside.style.top = height + 'px';
        }, 500);

    }
})

