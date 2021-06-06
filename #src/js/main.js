import focusVisible from './vendors/focusVisible';

/* Burger 
-----------------------------------------------------------------------------*/
const mainHeader = document.querySelector('.main-header'),
      burger = document.querySelector('.burger'),
      burgerNav = document.querySelector('.main-nav'),
      burgerNavLink = mainHeader.querySelectorAll('a');


/* Burger active
   Show burger nav
-----------------------------------------------------------------------------*/
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


/* Close menu when links are active
-----------------------------------------------------------------------------*/
for (let i = 0; i < burgerNavLink.length; i++) {
    burgerNavLink[i].addEventListener("click", function() {
        if(burgerNav.classList.contains('active')) {
            closeBurgerNav ();
        }
    });
}


/* Functions the burger's nav
-----------------------------------------------------------------------------*/
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


/* BodyLock
-----------------------------------------------------------------------------*/
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
