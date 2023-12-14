if (window.console == undefined) { console = { log: () => { } } }

/* device */
(function (window, undefined) {
	"use strict";
	/**
	 * @description device 분기
	 * @modify
			@20231201 추가
	*/
	var device = {
		/** 플러그인명 */
		bind: device,
		initialize: function () {
			const me = this;

			me._resize();
		},
		_resize: () => {
			const body = document.querySelector('body');

			const deviceCall = () => {
				window.innerWidth < 1024 ? ( // mobile
					body.classList.remove('pc'),
					body.classList.add('mobile')
				) : ( // pc
					body.classList.remove('mobile'),
					body.classList.add('pc')
				)
			}

			deviceCall();

			window.addEventListener('resize', () => {
				deviceCall();
			})
		}
	};

	window.device = device;
}(window));

/* header */
(function (window, undefined) {
	"use strict";
	/**
	 * @description header menu
	 * @modify
			@20231201 추가
	*/
	var header = {
		/** 플러그인명 */
		bind: header,
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
			// 비동기 selector 사용 금지
		},
		initialize: function () {
			const me = this;

			me._scroll();
			me._hover();
			me._click(); // 모바일 Gnb menu
		},
		_hover: () => {
			const headerGnb = '.box-header';

			const headerRemoveClass = () => {
				document.querySelector(headerGnb).classList.remove('is-hover');
				document.querySelector(headerGnb).classList.remove('is-search');
				document.querySelector(headerGnb).classList.remove('is-lang');
			}

			// 1뎁스 GNB mouseover
			document.querySelector(headerGnb + ' .gnb-menu').addEventListener('mouseover', (e) => {
				headerRemoveClass();
				document.querySelector(headerGnb).classList.add('is-hover');
			})

			// 검색 mouseover
			document.querySelector(headerGnb + ' .btn-search').addEventListener('mouseover', (e) => {
				headerRemoveClass();
				document.querySelector(headerGnb).classList.add('is-search');
				setTimeout(() => {document.querySelector('#hamburger-2').classList.add('is-active')}, 10)
				
				if (document.querySelector('body').classList.contains('mobile')) { // mobile
					if (document.querySelector('.box-header').classList.contains('is-search')) {
						// mo 분기 필요.
						document.getElementsByTagName('html')[0].style.overflow = "hidden";
					} else {
						document.getElementsByTagName('html')[0].style.overflow = "";
					}
				}
			})

			// 언어선택 mouseover
			document.querySelector(headerGnb + ' .box-lang').addEventListener('mouseover', (e) => {
				headerRemoveClass();
				document.querySelector(headerGnb).classList.add('is-lang');
			})

			// mouseleave
			document.querySelector(headerGnb).addEventListener('mouseleave', (e) => {
				headerRemoveClass();
			})

			// dim mouseover
			document.querySelector(headerGnb + ' .dim').addEventListener('mouseover', (e) => {
				headerRemoveClass();
			})
		},
		_scroll: () => {
			const boxHeader = document.querySelector('.box-header');

			const scrollSet = () => {
				if (window.scrollY > 100) {
					boxHeader.classList.add('type-2');
				} else {
					boxHeader.classList.remove('type-2');
				}
			}

			scrollSet();

			window.addEventListener('scroll', () => {
				scrollSet();
			})
		},
		_click: () => {
			const me = this,
				tg = '.hamburger';

			const tgs = document.querySelectorAll(tg);

			// MO 햄버거 버튼 모션
			for (const tg of tgs) {
				tg.onclick = e => {
					e.currentTarget.classList.toggle('is-active');
				}
			}

			// MO 햄버거 버튼 클릭시 전체 메뉴 활성화
			document.querySelector('#hamburger-1').addEventListener('click', (e) => {
				document.querySelector('.box-header').classList.toggle('is-menuOpen');
				if (document.querySelector('.box-header').classList.contains('is-menuOpen')) {
					document.getElementsByTagName('html')[0].style.overflow = "hidden";
				} else {
					document.getElementsByTagName('html')[0].style.overflow = "";
				}
			})

			document.querySelector('#searchXbtn-1').addEventListener('click', (e) => {
				document.querySelector('.box-header').classList.remove('is-search');
				document.getElementsByTagName('html')[0].style.overflow = "";
			})			

			// PC 햄버거 버튼 클릭 상태에서 resize
			window.addEventListener('resize', () => {
				if (window.innerWidth >= 1024) {
					document.getElementsByTagName('html')[0].style.overflow = "";
				}
			})

			// MO 1뎁스 클릭.
			const depth1s = document.querySelectorAll('.box-header .menu-list h3');

			for (const tg of depth1s) {
				tg.onclick = e => {
					e.currentTarget.parentNode.classList.toggle('is-active');
				}
			}
		}
	};

	window.header = header;
}(window));

// Footer
(function (window, undefined) {
	"use strict";
	/**
	 * @description Footer
	 * @modify
			@20231201 추가
	*/
	var footer = {
		/** 플러그인명 */
		bind: footer,
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
			// 비동기 selector 사용 금지
		},
		initialize: function () {
			const me = this;

			me._click(); // family
			me._floatingClick(); // floating btn
		},
		_click: () => {
			const tg = '[data-event="selectBox"]',
				selectBoxs = document.querySelectorAll(tg);

			for (const selectBox of selectBoxs) {
				selectBox.querySelector('.ft-select > button').onclick = e => {
					let parent = e.target.parentElement;

					if (!parent.classList.contains('is-active')) {
						selectBoxs.forEach(e => {
							if (e.classList.contains('is-active')) {
								e.classList.remove('is-active');
							}
						});
						if (!parent.classList.contains('disabled')) {
							parent.classList.add('is-active');
						}
					} else {
						parent.classList.remove('is-active');
					}
				}
			}

			document.querySelectorAll('.selectBox li button').forEach(e => {
				e.onclick = () => {
					e.parentNode.parentNode.parentNode.querySelector('.selectBox > button').innerText = e.innerText;
				}
			});

			window.addEventListener('click', (e) => {
				if (!e.target.classList.contains('button')) {
					selectBoxs.forEach(e => {
						e.classList.remove('is-active');
					});
				}
			})
		},
		_floatingClick: () => {
			const tg = document.querySelector('.btn-quick'),
				floating = document.querySelector('.box-floating'),
				btnTop = document.querySelector('.btn-top');

			// btn quick click
			tg.addEventListener('click', () => {
				floating.classList.toggle('open');
			})

			// scroll
			window.addEventListener('scroll', () => {
				if (window.scrollY >= 100) {
					floating.classList.add('scroll');
				} else {
					floating.classList.remove('scroll');
				}

				//floating.classList.remove('open');
			})

			// btnTop click
			btnTop.addEventListener('click', () => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				})
			})
		}
	};

	window.footer = footer;
}(window));

/* selectBox */
(function (window, undefined) {
	"use strict";
	/**
	 * @description selectBox
	 * @modify
			@20231206 추가
	*/
	var selectBox = {
		/** 플러그인명 */
		bind: selectBox,
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
			tg: '[data-event="commonSelectBox"]'
		},
		initialize: function () {
			const me = this;

			me._click();
		},
		_click: function () {
			const me = this,
				tg = me.selectors.tg;

			const selectBoxs = document.querySelectorAll(tg);

			for (const selectBox of selectBoxs) {
				selectBox.querySelector(tg + ' > button').addEventListener('click', (e) => {
					let parent = e.target.parentElement;

					if (!parent.classList.contains('is-active')) {

						selectBoxs.forEach(e => {
							if (e.classList.contains('is-active')) {
								e.classList.remove('is-active');
							}
						});
						
						if (!parent.classList.contains('disabled')) {
							parent.classList.add('is-active');
						}
					} else {
						parent.classList.remove('is-active');
					}
				})
			}

			document.querySelectorAll(tg + ' > ul > li button').forEach(e => {
				e.onclick = () => {
					e.parentNode.parentNode.parentNode.querySelector(tg + ' > button').innerText = e.innerText;
					e.parentNode.parentNode.parentNode.classList.add('font');
				}
			});

			window.addEventListener('click', (e) => {
				if (!e.target.classList.contains('button')) {
					selectBoxs.forEach(e => {
						e.classList.remove('is-active');
					});
				}
			})
		}
	};

	window.selectBox = selectBox;
}(window));

/* main tab */
(function (window, undefined) {
	"use strict";
	/**
	 * @description 메인 검사 btn tab
	 * @modify
			@20231206 추가
	*/
	var mainSearchBtn = {
		/** 플러그인명 */
		bind: mainSearchBtn,
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
			tg: '.main-inspectionSearch .btn'
		},
		initialize: function () {
			const me = this;

			me._click();
		},
		_click: function () {
			const me = this,
				tg = me.selectors.tg;

			document.querySelectorAll(tg).forEach((item) => {
				item.addEventListener('click', (e) => {

					document.querySelectorAll(tg).forEach((item) => {
						item.parentNode.classList.remove('is-active');
					})

					e.target.parentNode.classList.toggle('is-active');
				})
			})
		}
	};

	window.mainSearchBtn = mainSearchBtn;
}(window));

/* checkboxAll */
(function (window, undefined) {
	"use strict";
	/**
	 * @description checkboxAll
	 * @modify
			@20231214 추가
	*/
	var checkboxAll = {
		/** 플러그인명 */
		bind: checkboxAll,
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
			tg: '[data-event="checkboxAll"]',
			tg2: '[data-event="checkbox"]'
		},
		initialize: function() {
			const me = this;

			me._click();
		},
		_click: function(){
			const me = this,
						tg = me.selectors.tg,
						tg2 = me.selectors.tg2;

			let ck = (st, item) => {
				st == "on" ? item.checked = true : item.checked = false;
			}

			document.querySelectorAll(tg + ' input').forEach( e => {
				e.onclick = (e) => {
					document.querySelectorAll('input[name="' + e.target.name + '"]').forEach( item => {
						e.target.checked ? ck('on', item) : ck('off', item);
					});
				}
			});

			document.querySelectorAll(tg2 + ' input').forEach( e => {
				e.onclick = (e) => {
					if( document.querySelectorAll('[data-event="checkbox"] input[name="' + e.target.name + '"]').length == document.querySelectorAll('[data-event="checkbox"] input[name="' + e.target.name + '"]:checked').length ){
						ck('on', document.querySelector('[data-event="checkboxAll"] input[name="' + e.target.name + '"]'));
					}else{
						ck('off', document.querySelector('[data-event="checkboxAll"] input[name="' + e.target.name + '"]'));
					}
				}
			});
		}
	};

	window.checkboxAll = checkboxAll;
}(window));

/**
 * front.js 하단에 위치
 */
//  XMLHttpRequest js 에서 가져오는 DOM 관련 이벤트는 onload에 넣기.
window.addEventListener('load', () => {
	setTimeout(() => {
		header.initialize();
		footer.initialize();
	}, 100)
})

// 공통 js 호출
device.initialize();

// header bg
const headerBg = (item) => {
  const key = item['bg'];

  if (key == 'white') {
    setTimeout(() => {document.querySelector('.box-header').classList.add('bg-fff')}, 100)
  }
}