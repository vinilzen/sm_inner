$(function() {
/* Отключить(компенсировать) zoom на моб устройствах  */
/*
	if (document.body.clientWidth < 640)
		$('head')
			.append('<meta name="viewport" content="width=device-width, initial-scale=.5, maximum-scale=.5, user-scalable=no">');

	window.addEventListener("orientationchange", function() {
		if (document.body.clientWidth < 640)
			$('head')
				.append('<meta name="viewport" content="width=device-width, initial-scale=.5, maximum-scale=.5, user-scalable=no">');
		else
			$('head')
				.append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">');
	});
*/

	if ($('.kind-of-review').length && document.body.clientWidth > 400){
		var curent_h = $('.kind-of-review').height();
		$('.container-review, .tabbable').css({height:curent_h});
	}

	$('a#tag_tab[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		if(word_array1) $(".tag1").empty().jQCloud(word_array1);
		if(word_array2) $(".tag2").empty().jQCloud(word_array2);
		if(word_array3) $(".tag3").empty().jQCloud(word_array3);
	});


	$('.responsive').slick({
		slide:'.item',
		arrow:true,
		speed: 600,
		slidesToShow: 6,
		slidesToScroll: 6,
		responsive: [{
			breakpoint: 1023,
			settings: {
				arrow:true,
				slide:'.item',
				slidesToShow: 4,
				slidesToScroll: 4,
			}
		}, {
			breakpoint: 768,
			settings: {
				arrow:false,
				dots: true,
				slide:'.item',
				slidesToShow: 2,
				slidesToScroll: 2
			}
		}, ]
	});


	function fix_screen() {
		if (document.body.clientWidth < 1024 && document.body.clientWidth > 640) {

			// Убираем отступы по краям в отзывах
			var ml = (document.body.clientWidth-$('.container').width()) / 2;
			$('.tab-content.tab-root-container').css({
				width: document.body.clientWidth,
				'margin-left': -ml
			});
			$('body').css('overflow-x', 'hidden');
		} else {
			$('.tab-content.tab-root-container, body').attr('style','');
		}
		if (document.body.clientWidth > 401) {
			$('.custom-bgr').attr('style', '');
		}
	}

	window.addEventListener("orientationchange", fix_screen);
	$(window).resize(fix_screen);
	if (document.body.clientWidth < 1024 && document.body.clientWidth > 640) {
		fix_screen();
	}

	if (document.body.clientWidth < 401) {
		$.each($('.kind-of-review a'), function(k,v){
			var block_id = $(v).attr('href');
			if ($(block_id).length) {
				$(block_id).detach().appendTo($(v));
				$(block_id).slick({
					arrow:false,
					slide:'li',
					dots: true,
					infinite: true,
					speed: 300,
					slidesToShow: 1,
					slidesToScroll: 1,
				});

			} else {
				console.log('nety-', k);
			}
		});
	}

	$(window).scroll(function() {
		if ($('.popover.fade.bottom.in').length === 0){
			if ($('body').scrollTop() > 100) {
				$('.custom-bgr').css('top', '-70px');
			} else {
				$('.custom-bgr').css('top', 0);
			}
		}
	});

	$('.preview_photo li a').click(function(e){
		var src = $('img', $(this)).attr('src');
		$('.big_preview img').fadeOut('fast', function() {
			$('.big_preview img').attr('src',src).fadeIn();
		});
		return false;
	});

	$('#toggleMenu').click(function() {
		if ($(this).hasClass('active')) {
			$('.custom-bgr').attr('style', '');
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
			$('.custom-bgr').css({
				'height': $('.right-custom-nav ul').outerHeight() + $('.right-custom-nav').position().top
			});
		}
	});

	$('.right-custom-nav a').click(function(e){
		var id = $(e.target).attr('href');
		if (id && $(id).length) {
			var offset = (document.body.clientWidth < 401) ? 40 : 60,
				scrollTo = $(id).offset().top - offset;
			$('html, body').animate({scrollTop: scrollTo}, 800);
		}
		if (document.body.clientWidth < 401) {
			$('.custom-bgr').attr('style', '');
			$('#toggleMenu').removeClass('active');
		}
	});

	$('#change-sity').popover({
		placement: 'bottom',
		html: true,
		container:'body',
		content: function() {
			return $('#change-sity-content').html();
		}
	});

	$('#change-sity').on('shown.bs.popover', function () {
		if (document.body.clientWidth < 401) {
			$('.popover').css({
				top:0,
				left:0,
				position:'fixed',
				width:'100%',
				height:$(window).height()
			});
			$('.change-sity-content ul').height($(window).height() - 100);
			$('.custom-bgr').css('top', '-70px');
		}

		$('.close-change-sity').click(function() {
			$('#change-sity').popover('hide');
		});
	});
	$('#change-sity').on('hidden.bs.popover', function () {
		if ($('body').scrollTop() > 100) {
			$('.custom-bgr').css('top', '-70px');
		} else {
			$('.custom-bgr').css('top', 0);
		}
	});
});