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

			me._click();
			me._scroll();
		},
		_click: () => {

		},
		_scroll: () => {
			window.addEventListener('scroll', () => {
				if( window.scrollY > 100 ){
					document.querySelector('.box-header').classList.add('type-2');
				}else
				document.querySelector('.box-header').classList.remove('type-2');{}
			})
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
				selectBox.querySelector('.common-selectbox > button').onclick = e => {
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

			document.querySelectorAll('.common-selectbox > ul > li button').forEach(e => {
				e.onclick = () => {
					e.parentNode.parentNode.parentNode.querySelector('.common-selectbox > button').innerText = e.innerText;
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

/**
 * front.js 하단에 위치
 */
//  XMLHttpRequest js 에서 가져오는 DOM 관련 이벤트는 onload에 넣기.
window.onload = () => {
	setTimeout(() => {
		header.initialize();
		footer.initialize();
	}, 100)
}

// 공통 js 호출
device.initialize();

// body scroll smooth
const lenis = new Lenis()

function raf(time) {
	lenis.raf(time)
	requestAnimationFrame(raf)
}

requestAnimationFrame(raf)