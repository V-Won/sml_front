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

			me._click();
		},
		_click: () => {
			const tg = '[data-event="selectBox"]',
						selectBoxs = document.querySelectorAll(tg);

			for( const selectBox of selectBoxs ){
				selectBox.querySelector('.ft-select > button').onclick = e => {
					let parent = e.target.parentElement;
					
					if( !parent.classList.contains('is-active') ){
						selectBoxs.forEach(e => {
							if( e.classList.contains('is-active') ){
								e.classList.remove('is-active');
							}
						});
						if( !parent.classList.contains('disabled') ){
							parent.classList.add('is-active');
						}
					}else{
						parent.classList.remove('is-active');
					}
				}
			}

			document.querySelectorAll('.selectBox li button').forEach(e => {
				e.onclick = () => {
					e.parentNode.parentNode.parentNode.querySelector('.selectBox > button').innerText = e.innerText;
				}
			});

			window.onclick = (e) => {
				if( !e.target.classList.contains('button') ){
					selectBoxs.forEach(e => {
						e.classList.remove('is-active');
					});
				}
			}
		}
	};

	window.footer = footer;
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