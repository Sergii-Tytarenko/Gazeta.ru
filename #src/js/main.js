import focusVisible from './vendors/focusVisible';
import Swiper from 'swiper/bundle';
import macy from 'macy';


/* Burger 
-----------------------------------------------------------------------------*/
const mainHeader = document.querySelector('.main-header'),
      burger = document.querySelector('.burger'),
      burgerNav = document.querySelector('.main-nav'),
      burgerNavLink = mainHeader.querySelectorAll('a');


/* Burger is active*/
burger.addEventListener('click', function () {
    if (burger) {
        burger.classList.toggle('active');
    }
    if ( burger.classList.contains('active') ) {
        showBurgerNav ();
    } else {
        closeBurgerNav ();
    }
});


/* Close menu when links are active*/
for (let i = 0; i < burgerNavLink.length; i++) {
    burgerNavLink[i].addEventListener("click", function() {
        if(burgerNav.classList.contains('active')) {
            closeBurgerNav ();
        }
    });
}


/* Burger's nav functions*/
function showBurgerNav () {
    burgerNav.classList.add('active');
    mainHeader.classList.add('active');
    body_lock(0);
}

function closeBurgerNav () {
    burger.classList.remove('active');
    burgerNav.classList.remove('active');
    mainHeader.classList.remove('active');
    body_lock(0);
}


/* Header's functions
---------------------------------------------------------------*/
let headerAside = document.querySelector('.main-header__aside'),
    mainNav = document.querySelector('.main-nav'),
    navWrapper = document.querySelector('.main-nav__wrapper'),
    menu = document.querySelector('.main-nav__menu'),
    menuBtns = document.querySelectorAll('.main-nav__btn'),
    linksBlock = document.querySelectorAll('.main-nav__links');


/* Navigation wrapper's height (max-height on the small display)*/
window.addEventListener('resize', () => calcNavHeigt());
calcNavHeigt()

function calcNavHeigt() {
    if (mainNav) {
        let h = document.body.clientHeight - (headerAside.offsetHeight +  menu.offsetHeight);
        navWrapper.style.maxHeight = h + 'px';
    }
}


/* Navigation's tabs*/
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


/* Scrolling aside*/
window.addEventListener('scroll', () => {
    let height = pageYOffset;

    if (getComputedStyle(headerAside).position == 'absolute') {
        setTimeout(() => {
            headerAside.style.top = height + 'px';
        }, 1000);

    }
})


/* Modal Windows
-----------------------------------------------------------------------------*/
let modalLinks = document.querySelectorAll('.modal-link'),
    overlay = document.querySelector('.overlay');

if (modalLinks.length > 0) {
    for (let i = 0; i < modalLinks.length; i++) {

        modalLinks[i].addEventListener('click', (e) => {
            let linkTarget = e.target.dataset.modal,
            	modalWindow = document.querySelector(`${linkTarget}`);

            modalActive(modalWindow);
        });
        
    }
}

function modalActive (target) {
    if (target) {
        modalShow (target);

        let closeBtn = target.querySelector('.modal__close');

        closeBtn.addEventListener('click', () => {
            modalClose (target);
        });

        overlay.addEventListener('click', () => {
            modalClose (target);
        });

        document.addEventListener('keydown', function (e) {
            if (e.code === 'Escape') {
                modalClose (target);
            }
        });
    }
}

function modalShow (target) {
	target.classList.add('show');
	overlay.classList.add('active');
	body_lock(0);
}

function modalClose (target) {
	target.classList.remove('show');
	overlay.classList.remove('active');
	body_lock(0);
}


/* BodyLock*/
let unlock = true;
function body_lock(delay) {
	let body = document.querySelector("body");
	
    if (body.classList.contains("lock")) {
      body_lock_remove(delay);
    } else {
      body_lock_add(delay);
    }
}

function body_lock_remove(delay) {
	let body = document.querySelector("body");

	if (unlock) {
		let lock_padding = document.querySelectorAll(".lp");

		setTimeout(() => {
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = "0px";
		}
		body.style.paddingRight = "0px";
		body.classList.remove("lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
		unlock = true;
		}, delay);
	}
}

function body_lock_add(delay) {
	let body = document.querySelector("body");

	if (unlock) {
	let lock_padding = document.querySelectorAll(".lp");

	for (let index = 0; index < lock_padding.length; index++) {
		const el = lock_padding[index];
		el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
	}
	body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
	body.classList.add("lock");

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, delay);
	}
}


/* Hours News Tabs
---------------------------------------------------------------*/
const hoursMenu = document.querySelector('.hours-news__menu'),
      hoursMenuBtns = hoursMenu.querySelectorAll('.hours-news__btn'),
      hoursContent = document.querySelectorAll('.hours-news__tabs'),
      topNewsSlider = document.querySelector('.top-news--slider');


if (window.getComputedStyle(hoursMenu).display == 'flex') initHoursTabs();
initHoursTabs();
function initHoursTabs() {
    shwoContnet()
    
    hoursMenu.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.matches('button.hours-news__btn')) {
            hoursMenuBtns.forEach((item, i) => {
                if (target == item) {
                    shwoContnet(i);
                }
            });
        };
    })

    function shwoContnet(i = 0) {
        hideContent();
        hoursMenuBtns[i].classList.add('active');
        hoursContent[i].classList.remove('hide')
    }

    function hideContent() {
        hoursMenuBtns.forEach(el => {
            el.classList.remove('active')
        })

        hoursContent.forEach(el => {
            el.classList.add('hide')
        })
    }
}


/* Hours News sliders
---------------------------------------------------------------*/
let hoursNews = new Swiper('.hours-news__slider', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
    },
    speed: 700,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    wrapperClass: 'hours-news__list',
    slideClass: 'hours-news__slide',
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: {
        el: '.hours-news__pagination'
    }
});

if(topNewsSlider) {
    let topNews = new Swiper(topNewsSlider, {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
        },
        speed: 700,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        wrapperClass: 'top-news__list--wrapp',
        slideClass: 'top-news__row--slide',
        slidesPerView: 1,
        spaceBetween: 50,
        pagination: {
            el: '.top-news__pagination'
        }
    });
}


/* Crop text
---------------------------------------------------------------*/
(function () {

    const cropElement = document.querySelectorAll('.crop-text'),
          size = 17,                                          
          endCharacter = '...';                                

    cropElement.forEach(el => {
        let text = el.innerHTML.split(" ");
        
        if (text.length > size) {
            text = text.slice(0, size).join(" ");
            el.innerHTML = text + endCharacter;
        }
    });

}());


/* Gallery's Tabs
---------------------------------------------------------------*/
const galleryMenu = document.querySelector('.gallery__nav'),
      galleryBtns = galleryMenu.querySelectorAll('.gallery__btn'),
      galleryContents = document.querySelectorAll('.big-post--gallery');

galleryMenu.addEventListener('click', (event) => {
    let target = event.target;
    if (target && target.matches('button.gallery__btn')) {
        galleryBtns.forEach((item, i) => {
            if (target == item) {
                shwoContnet(i);
            }
        });
    };
})

shwoContnet();

function shwoContnet(i = 0) {
    hideContent();
    galleryBtns[i].classList.add('gallery__btn--active');
    galleryContents[i].classList.remove('hide');
    galleryContents[i].classList.add('show');
}

function hideContent() {
    galleryBtns.forEach(el => {
        el.classList.remove('gallery__btn--active')
    })

    galleryContents.forEach(el => {
        el.classList.add('hide');
        el.classList.remove('show');
    })
}


/* Masonry  grid 
---------------------------------------------------------------*/
let myGrid = macy({
    container: '.articles__inner',
    trueOrder: false,
    waitForImages: false,
    margin: {
        x: 15,
        y: 15,
    },
    columns: 4,
    breakAt: {
        1200: 3,
        920: 2,
        530: 1
    }
});