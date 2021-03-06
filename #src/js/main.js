import focusVisible from './vendors/focusVisible';
import Swiper from 'swiper/bundle';
import macy from 'macy';



/* Burger 
-----------------------------------------------------------------------------*/
const mainHeader = document.querySelector('.main-header'),
      burger = document.querySelector('.burger'),
      burgerNav = document.querySelector('.main-nav'),
      burgerNavLink = mainHeader.querySelectorAll('a'),
      navOverlay = mainHeader.querySelector('.main-header__overlay');


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

navOverlay.addEventListener('click', () => {
    closeBurgerNav();
});


/* Burger's nav functions*/
function showBurgerNav () {
    burgerNav.classList.add('active');
    mainHeader.classList.add('active');  
    navOverlay.classList.add('main-header__overlay--active');  
}

function closeBurgerNav () {
    burger.classList.remove('active');
    burgerNav.classList.remove('active');
    mainHeader.classList.remove('active');
    navOverlay.classList.remove('main-header__overlay--active');
}



/* Header's functions
---------------------------------------------------------------*/
let headerAside = document.querySelector('.main-header__aside'),
    menu = document.querySelector('.main-nav__menu'),
    menuBtns = document.querySelectorAll('.main-nav__btn'),
    linksBlock = document.querySelectorAll('.main-nav__links');


/* Navigation's tabs*/
initTabs()
checkMenu()

window.addEventListener('resize', () => checkMenu());

function checkMenu() {
    let  menuHide = getComputedStyle(menu).display === 'none';

    if (menuHide) {
        linksBlock.forEach(el => {
            el.classList.remove('hide')
        })
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
        headerAside.style.top = height + 'px';
    } else {
        headerAside.style.top ='';
    }
});



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
const hoursNews = document.querySelector('.hours-news'),
      hoursMenu = document.querySelector('.hours-news__menu'),
      hoursMenuBtns = document.querySelectorAll('.hours-news__btn'),
      hoursContent = document.querySelectorAll('.hours-news__tabs'),
      topNewsSlider = document.querySelector('.top-news--slider');


if (hoursNews) {
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
}



/* Hours News sliders
---------------------------------------------------------------*/
let hoursNewsSlider = new Swiper('.hours-news__slider', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
    },
    speed: 700,
    wrapperClass: 'hours-news__list',
    slideClass: 'hours-news__slide',
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: {
        el: '.hours-news__pagination'
    }
});

if (topNewsSlider) {
    let topNews = new Swiper(topNewsSlider, {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
        },
        speed: 700,
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
const gallery = document.querySelector('.gallery'),
      galleryMenu = document.querySelector('.gallery__nav'),
      galleryBtns = document.querySelectorAll('.gallery__btn'),
      galleryContents = document.querySelectorAll('.big-article--gallery');

if (gallery) {
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
}



/* Publications Tabs
---------------------------------------------------------------*/
const publications = document.querySelector('.publications'),
      publicationsNav = document.querySelector('.publications__nav'),
      publicationsBtns = document.querySelectorAll('button.publications__btn'),
      articles = document.querySelectorAll('.js-article');

if (publications) {
    /* Masonry  grid */
    let myGrid = macy({
        container: '.publications__inner',
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

    publicationsNav.addEventListener('click', (el) => {
        let target = el.target;
            
        if(target && target.matches('button.publications__btn')) {
            showArticles(target.dataset.descr);
        }
    })

    showArticles()

    function showArticles(x = 'js-news') {
        hideArticles()

        articles.forEach(el => {
            if (el.classList.contains(x)) {
                el.classList.add('selected');
                el.classList.remove('disabled');
            }
        });

        publicationsBtns.forEach(el => {
            if (el.dataset.descr == x) {
                el.classList.add('publications__btn--active');
            }
        });

        myGrid.recalculate('true');
    }

    function hideArticles() {
        publicationsBtns.forEach(el => {
            el.classList.remove('publications__btn--active')
        });

        articles.forEach(el => {
            el.classList.add('disabled');
            el.classList.remove('selected')
        });
    }
}



/* Columns slider
---------------------------------------------------------------*/
let columnsSlider = new Swiper('.columns', {
    wrapperClass: 'columns__wrapper',
    slideClass: 'columns__slide',
    grabCursor: true,
    observer: true,
    observeParents: true,
    pagination: {
        el: '.columns__pagination',
    },
    breakpoints: {
        //when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        //when window width is >= 768px
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
          direction: 'horizontal',
        },
        // when window width is >= 1051px
        1051: {
            direction: 'vertical',
            slidesPerView: 1,
        }
      }
});
