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