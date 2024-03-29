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
				setTimeout(() => { document.querySelector('#hamburger-2').classList.add('is-active') }, 10)

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

			// 메뉴 is-active remove
			const menuNoActive = () => {
				document.querySelectorAll('.box-header .menu-list .inner-gap-1 > ul > li').forEach((e) => {
					e.classList.remove('is-active');
				});
			}

			// MO 햄버거 버튼 클릭시 전체 메뉴 활성화
			document.querySelector('#hamburger-1').addEventListener('click', (e) => {
				setTimeout(() => {
					menuNoActive();
				}, 200)

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

			// MO 1뎁스 클릭.
			const depthClick = () => {
				const depth1s = document.querySelectorAll('.box-header .menu-list h3');

				if(matchMedia("screen and (max-width: 1400px)").matches){
					for (const tg of depth1s) {
						tg.onclick = e => {
							e.currentTarget.parentNode.classList.toggle('is-active');
						}
					}
				}
			}

			depthClick();

			// PC 햄버거 버튼 클릭 상태에서 resize
			window.addEventListener('resize', () => {
				if (window.innerWidth >= 1024) {
					document.getElementsByTagName('html')[0].style.overflow = "";

					// mo menu-list is-active remove
					menuNoActive();
				}
				depthClick();
			})

			window.addEventListener('load', () => {
				depthClick();
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

				floating.classList.remove('open');
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
				selectBox.querySelector(tg + ' > .button').addEventListener('click', (e) => {
					let parent = e.target.parentElement;
					e.preventDefault()

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
					e.parentNode.parentNode.parentNode.querySelector(tg + ' > .button').innerText = e.innerText;
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

/* commonTab */
(function (window, undefined) {
	"use strict";
	/**
	 * @description commonTab
	 * @modify
			@202312015 추가
	*/
	var commonTab = {
		/** 플러그인명 */
		bind: commonTab,
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
			tg: '[data-event="commonTab"]'
		},
		initialize: function () {
			const me = this;

			me._click();
		},
		_click: function () {
			const me = this,
				tg = me.selectors.tg;

			const tabBoxs = document.querySelectorAll(tg + ' .btn');

			for (const tabBox of tabBoxs) {
				tabBox.addEventListener('click', (e) => {
					// class remove					
					e.currentTarget.parentNode.parentNode.parentNode.querySelectorAll('.list > li').forEach((item) => {
						item.classList.remove('is-active')
					})
					// class add
					e.currentTarget.parentNode.classList.add('is-active');
				})
			}
		}
	};

	window.commonTab = commonTab;
}(window));

/* TabSection */
(function (window, undefined) {
	"use strict";
	/**
	 * @description TabSection
	 * @modify
			@20230115 추가
	*/
	var tabSection = {
		/** 플러그인명 */
		bind: tabSection,
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
			tg: '[data-event="tabMenu"]',
			tg2: '[data-event="tabMenu-section"]'
		},
		initialize: function () {
			const me = this;

			me._click();
		},
		_click: function () {
			const me = this,
						tg = me.selectors.tg,
						tg2 = me.selectors.tg2;

			const tgs = document.querySelectorAll(tg + ' li button');

			document.querySelectorAll(tg + ' li').forEach(e => {
				let item = e.classList.contains('is-active');

				if( item ){
					const current = e.getAttribute('data-tab');
					document.querySelector('[data-section="' + current + '"]').classList.add('is-active');
				}
			});

			for( const tg of tgs ){
				tg.onclick = e => {
					// tab button
					document.querySelectorAll('[data-event="tabMenu"] li').forEach(item => {
						item.classList.remove('is-active');
					});
					e.target.parentNode.classList.add('is-active');

					// tab 내용
					const idx = e.target.parentNode.getAttribute('data-tab');
					
					document.querySelectorAll(tg2 + ' [data-section]').forEach(e => {
						e.classList.remove('is-active');
					});

					document.querySelector(tg2 + ' [data-section="' + idx + '"]').classList.add('is-active');
				}
			}
		}
	};

	window.tabSection = tabSection;
}(window));

/* file Delete */
(function (window, undefined) {
	"use strict";
	/**
	 * @description file Delete
	 * @modify
			@202312018 추가
	*/
	var fileDelete = {
		/** 플러그인명 */
		bind: fileDelete,
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
			tg: '[data-event="fileDelete"]'
		},
		initialize: function () {
			const me = this;

			me._click();
		},
		_click: function () {
			const me = this,
				tg = me.selectors.tg;

			const delBtns = document.querySelectorAll(tg + ' .del-btn');

			for (const delBtn of delBtns) {
				delBtn.addEventListener('click', (e) => {
					// class remove					
					e.target.parentNode.parentNode.querySelectorAll('.file-item > li').forEach(() => {
						e.target.parentNode.remove();
					})
				})
			}
		}
	};

	window.fileDelete = fileDelete;
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
						item.parentNode.parentNode.classList.remove('is-active');
					})

					e.target.parentNode.parentNode.classList.toggle('is-active');
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
		initialize: function () {
			const me = this;

			me._click();
		},
		_click: function () {
			const me = this,
				tg = me.selectors.tg,
				tg2 = me.selectors.tg2;

			let ck = (st, item) => {
				st == "on" ? item.checked = true : item.checked = false;
			}

			document.querySelectorAll(tg + ' input').forEach(e => {
				e.onclick = (e) => {
					document.querySelectorAll('input[name="' + e.target.name + '"]').forEach(item => {
						e.target.checked ? ck('on', item) : ck('off', item);
					});
				}
			});

			document.querySelectorAll(tg2 + ' input').forEach(e => {
				e.onclick = (e) => {
					if (document.querySelectorAll('[data-event="checkbox"] input[name="' + e.target.name + '"]').length == document.querySelectorAll('[data-event="checkbox"] input[name="' + e.target.name + '"]:checked').length) {
						ck('on', document.querySelector('[data-event="checkboxAll"] input[name="' + e.target.name + '"]'));
					} else {
						ck('off', document.querySelector('[data-event="checkboxAll"] input[name="' + e.target.name + '"]'));
					}
				}
			});
		}
	};

	window.checkboxAll = checkboxAll;
}(window));

/* protocol */
(function (window, undefined) {
	"use strict";
	/**
	 * @description protocol
	 * @modify
			@20231218 추가
	*/
	var protocol = {
		/** 플러그인명 */
		bind: protocol,
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
			tg: '[data-selectDay=]',
			tg2: '[data-day=]'
		},
		initialize: function () {
			const me = this;

			me._click();
		},
		_click: function () {
			const me = this,
				tg = me.selectors.tg,
				tg2 = me.selectors.tg2;

			const set = (dd) => {
				document.querySelectorAll('.inner-protocol').forEach((tg) => {
					tg.style.display = 'none';
				})
				document.querySelector('[data-day="' + dd + '"]').style.display = 'block';
			}

			document.querySelectorAll('[data-selectDay]').forEach((e) => {

				// load
				if (e.classList.contains('is-active')) {
					const dd = e.getAttribute('data-selectDay');
					const text = e.parentNode.querySelector('.is-active').innerText;
					
					set(dd);
					e.parentNode.parentNode.parentNode.querySelector('.button').innerText = text;
				}

				// click
				e.addEventListener('click', (item) => {
					const dd = e.getAttribute('data-selectDay');

					set(dd);
				})
			})
		}
	};

	window.protocol = protocol;
}(window));

/* Layer popup */
(function (window, undefined) {
	"use strict";
	/**
	 * @description Layer popup
	 * @modify
			@20231226 추가
	*/
	var layerPopup = {
		/** 플러그인명 */
		bind: layerPopup,
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
			openBtn: '[data-event="layerOpen"]',
			closeBtn : '[data-event="layerClose"]'
		},
		initialize: function() {
			let me = this;

			me._click();
		},
		_click: function(){
			const me = this,
						openBtn = me.selectors.openBtn,
						closeBtn = me.selectors.closeBtn;

			const openBtns = document.querySelectorAll(openBtn),
						closeBtns = document.querySelectorAll(closeBtn);

			for( const tg of openBtns ){
				tg.onclick = e => {
					let currentTarget = e.currentTarget.getAttribute('data-layerId');

					document.querySelector('#' + currentTarget).style.display = 'block';
					document
					document.querySelector('#' + currentTarget).scrollTo(0, 0);
					//document.querySelector('#' + currentTarget + ' .inner-layer').focus();
					document.body.classList.add('oh');
				}
			};

			for( const tg of closeBtns ){
				tg.onclick = e => {
					layerClose();
				}
			};

			document.querySelectorAll('.box-layer').forEach(e => {
				e.onclick = e => {
					if( e.target.classList.contains('box-layer') ){
						layerClose();
					}
				}
			});

			const layerClose = function(){
				document.querySelectorAll('.box-layer').forEach(e => {
					e.style.display = 'none';
				});

				document.body.classList.remove('oh');
			}
		}
	};

	window.layerPopup = layerPopup;
}(window));

/* Detail search */
(function (window, undefined) {
	"use strict";
	/**
	 * @description detailSearch
	 * @modify
			@20231226 추가
	*/
	var detailSearch = {
		/** 플러그인명 */
		bind: detailSearch,
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
			tg: '[data-event="detailSearch"]'
		},
		initialize: function () {
			const me = this;

			me._click();
		},
		_click: function () {
			const me = this,
				tg = me.selectors.tg;

			const openBoxs = document.querySelectorAll(tg + ' .common-detailBtn');

			for (const openBox of openBoxs) {
				openBox.addEventListener('click', (e) => {
					e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.detail-search').classList.toggle('is-open');
				})
			}
		}
	};

	window.detailSearch = detailSearch;
}(window));

/* common accordion */
(function (window, undefined) {
	"use strict";
	/**
	 * @description accordion
	 * @modify
			@20231227 추가
	*/
	var accordion = {
		/** 플러그인명 */
		bind: accordion,
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
			tg: '[data-event="accordion"]'
		},
		initialize: function () {
			const me = this;

			me._click();
		},
		_click: function () {
			const me = this,
				tg = me.selectors.tg;

			const openBtns = document.querySelectorAll(tg + ' .more-btn');

			for (const openBtn of openBtns) {
				openBtn.addEventListener('click', (e) => {
					e.target.parentNode.classList.toggle('is-open');

					if (e.target.parentNode.classList.contains('is-open')) {
						if (e.target.parentNode.classList.contains('en')) {
							e.target.innerText = 'Close'
						} else {
							e.target.innerText = '닫기'
						}
					} else {
						if (e.target.parentNode.classList.contains('en')) {
							e.target.innerText = 'View all'
						} else {
							e.target.innerText = '전체보기'
						}
					}
				})
			}
		}
	};

	window.accordion = accordion;
}(window));

/* listQnA */
(function (window, undefined) {
	"use strict";
	/**
	 * @description listQnA
	 * @modify
			@20231227 추가
	*/
	var listQnA = {
		/** 플러그인명 */
		bind: listQnA,
		/** 기본 옵션값 선언부 */
		defaults: {
		},
		/** selector 선언부 */
		selectors: {
			tg: '[data-event="listQnA"]'
		},
		initialize: function () {
			const me = this;

			me._click();
		},
		_click: function () {
			const me = this,
				tg = me.selectors.tg;

			const tabBoxs = document.querySelectorAll(tg + ' > ul > li > button');

			for (const tabBox of tabBoxs) {
				tabBox.addEventListener('click', (e) => {
					e.currentTarget.parentNode.classList.toggle('is-active');
				})
			}

			const tabBoxs2 = document.querySelectorAll(tg + ' > ul > li > ul > li > button');

			for (const tabBox of tabBoxs2) {
				tabBox.addEventListener('click', (e) => {
					console.log(e.currentTarget.parentNode.parentNode.parentNode);
					e.currentTarget.parentNode.parentNode.parentNode.classList.toggle('is-active');
				})
			}
		}
	};

	window.listQnA = listQnA;
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
		setTimeout(() => {
			document.querySelector('.box-header').classList.add('bg-fff'); // white 모드 헤더
			document.querySelector('.sub-top').classList.add('bg-fff'); // white 모드 sub 배너
		}, 100)
	}

	setTimeout(() => {
		if (document.getElementsByClassName('sub-top').length) {
			document.querySelector('.sub-top').style.display = 'block';
		}
		document.querySelector('.box-wrap').style.display = 'block';
		document.querySelector('.box-footer').style.display = 'block';
	}, 200)
}