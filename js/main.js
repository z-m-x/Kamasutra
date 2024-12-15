(function($) {

	"use strict";

	// 视差滚动效果初始化
	$(window).stellar({
    responsive: true,          // 响应式
    parallaxBackgrounds: true, // 背景视差
    parallaxElements: true,    // 元素视差
    horizontalScrolling: false,// 禁用水平滚动
    hideDistantElements: false,// 不隐藏远处元素
    scrollProperty: 'scroll'   // 滚动属性
  });

	// 设置全屏高度
	var fullHeight = function() {
		// 设置.js-fullheight元素高度为窗口高度
		$('.js-fullheight').css('height', $(window).height());
		// 窗口大小改变时重新设置高度
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});
	};
	fullHeight();

	// 加载动画
	var loader = function() {
		setTimeout(function() { 
			// 1毫秒后移除加载动画
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

  // 客户评价轮播
  var carousel = function() {
		$('.carousel-testimony').owlCarousel({
			center: true,      // 居中显示
			loop: true,        // 循环播放
			items:1,           // 默认显示1个
			margin: 30,        // 项目间距
			stagePadding: 0,   // 舞台内边距
			nav: false,        // 不显示导航
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{       // 响应式配置
				0:{items: 1},   // 手机显示1个
				600:{items: 2}, // 平板显示2个
				1000:{items: 3} // 电脑显示3个
			}
		});
	};
	carousel();

	// 导航下拉菜单
	$('nav .dropdown').hover(function(){
		var $this = $(this);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
		$this.removeClass('show');
		$this.find('> a').attr('aria-expanded', false);
		$this.find('.dropdown-menu').removeClass('show');
	});

	// 下拉菜单展开事件监听
	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// 图片弹窗预览
	$('.image-popup').magnificPopup({
    type: 'image',                // 类型为图片
    closeOnContentClick: true,    // 点击内容关闭
    closeBtnInside: false,        // 关闭按钮在外部
    fixedContentPos: true,        // 固定内容位置
    mainClass: 'mfp-no-margins mfp-with-zoom', // 弹窗类名
    gallery: {                    // 画廊配置
      enabled: true,              // 启用画廊
      navigateByImgClick: true,   // 点击图片导航
      preload: [0,1]              // 预加载前后各1张
    },
    image: {
      verticalFit: true          // 垂直适应
    },
    zoom: {                      // 缩放配置
      enabled: true,             // 启用缩放
      duration: 300              // 动画持续时间
    }
  });

  // 视频、地图等弹窗
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,              // 在700px以下禁用
    type: 'iframe',              // iframe类型
    mainClass: 'mfp-fade',       // 主类名
    removalDelay: 160,           // 移除延迟
    preloader: false,            // 不显示预加载器
    fixedContentPos: false       // 内容不固定
  });

  // 数字计数器
  var counter = function() {
		$('#section-counter').waypoint( function( direction ) {
			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000  // 7秒内完成动画
					);
				});
			}
		} , { offset: '95%' }); // 当元素出现在视口95%位置时触发
	}
	counter();

	// 内容动画
	var contentWayPoint = function() {
		var i = 0;
		// 监听.ftco-animate元素
		$('.ftco-animate').waypoint( function( direction ) {
			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				i++;
				$(this.element).addClass('item-animate');
				// 依次执行动画
				setTimeout(function(){
					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							// 根据data-animate-effect属性设置不同动画效果
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' ); // 每个元素间隔50ms执行
					});
				}, 100);
			}
		} , { offset: '95%' }); // 当元素出现在视口95%位置时触发
	};
	contentWayPoint();

})(jQuery);

