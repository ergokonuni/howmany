$(document).ready(function(){
	
	deviceOrientation__Init();
	//appHeader__Init();
	appMenu__Init();
	textareaAutoresize__Init();

});




// DEVICE ORIENTATION
function deviceOrientation__Init(){
	
	docWidth   = $(document).width();
	docHeight  = $(document).height();
	
	$('html').removeClass('portrait landscape square');
	
	if (docWidth > docHeight) {
		$('html').addClass('landscape');
	} else if (docWidth < docHeight) {
		$('html').addClass('portrait');
	} else if (docWidth == docHeight) {
		$('html').addClass('square');
	}
	
	//console.log('DOC Size:' + docWidth + 'x' + docHeight);
	//console.log('HTML Class: ' + $('html').attr('class'));

};
$(window).on('resize', function(){
	deviceOrientation__Init();
});
// / DEVICE ORIENTATION




// APP HEADER
function appHeader__Init(){

	var scrollTop = 0;
	var scrollDirection = 0;

	$(window).on('scroll', function(e){
		
		if ($(this).scrollTop() > scrollTop) { scrollDirection = 1; }
		else if ($(this).scrollTop() < scrollTop) { scrollDirection = -1; }
		else { scrollDirection = 0; }
		
		scrollTop = $(this).scrollTop();
		fixedHeader(scrollDirection);

	});

	function fixedHeader(scrollDirection){
		
		header = $('.app--header');
		
		if (scrollDirection > 0){
			header.addClass('isHidden').removeClass('isVisible');
		}
		else if (scrollDirection < 0){
			header.addClass('isVisible').removeClass('isHidden');
		}

	};

};
// / APP HEADER




// APP MENU
function appMenu__Init(){
	
	toggle    = $('.i--menu');
	panel     = $('.app--menu');
	overlay   = $('.overlay');
	screen    = $('.screen');
	page      = $('.page');
	header    = $('.app--header');
	header_pd = header.css('padding-right');
	body      = $('body');
	body_pd   = body.css('padding-right');
	html      = $('html');
	
	toggle.on('click', function(){
		
		if (!panel.hasClass('isVisible')) {
			
			// Panel is Hidden. Showing it...
			
			panel.removeClass('isHidden').addClass('isVisible');
			body.addClass('xy-hidden');
			
			if (html.hasClass('desktop win')) {
				
				// Scrollbar dancing on desktops with Windows
				
				body.removeClass('xy-hidden');
				doc_width_before = $(document).width();
				body.addClass('xy-hidden');
				doc_width_after = $(document).width();
				scroll_width = doc_width_after - doc_width_before;
				body.css({'margin-right': parseFloat(body_pd) + scroll_width});
				header.css({'padding-right': parseFloat(header_pd) + scroll_width});
				
			}
			
			screen.removeClass('toCenter').addClass('toRight');
		}

		else if (panel.hasClass('isVisible')) {
			
			// Panel is Visible. Hiding it...

			panel.removeClass('isVisible').addClass('isHidden');
			screen.removeClass('toRight').addClass('toCenter');

			anim_time = 0
			anim_times = screen.css('transition-duration');
			anim_times = anim_times.split(', ');
			
			for (i = 0; i < anim_times.length; i++) {
				val = parseFloat(anim_times[i]) * 1000;
				if (anim_time < val) {
					anim_time = val;
				}
			}
			
			setTimeout(function(){

				if (html.hasClass('desktop win')) {
					
					// Scrollbar dancing on desktops with Windows
					
					body.css({'margin-right': body_pd});
					header.css({'padding-right': header_pd});
					
				}

				body.removeClass('xy-hidden');

			}, anim_time);

		}

	});
	
	panel.find('.list .item').on('click', function(){
		return false;
	});
	
};
// / APP MENU




// TEXTAREA AUTORESIZE
function textareaAutoresize__Init(){

	textarea = $('textarea[autoresize="on"]');

	textarea.each(function(){
		$(this).on('input keydown keyup change', function(){
			textareaAutoresize(this);
		});
		textareaAutoresize(this);
	});
	
	$(window).on('resize', function(){
		textarea.trigger('change');
		setTimeout(function(){
			textarea.trigger('change');
		}, 200);
	});

	function textareaAutoresize(el){
		offset = el.offsetHeight - el.clientHeight;
		$(el).css('height', 'auto');
		$(el).css('height', el.scrollHeight + offset);
		//console.log(el.scrollHeight);
	};

};
// / TEXTAREA AUTORESIZE

/*
function textareaAutoresize(el){
	
	if ($(el).length > 0) {
		
		textarea__hidden = $(el).parent().find('.textarea__hidden');
		
		if (!textarea__hidden.length > 0) {
			textarea__hidden__html = '<div class="textarea textarea__hidden"></div>';
			$(el).parent().append(textarea__hidden__html);
		}
		
		str = $(el).val();
		str_splited = str.split('\n');
		str_replaced = '';
		
		for (i = 0; i < str_splited.length; i++) {
			str_replaced += str_splited[i].replace(/[<>]/g, '_').replace(/\s\s/g, ' &nbsp;');
			str_replaced += '<br/>';
		}
		
		textarea__hidden.html(str_replaced);
		textarea__pd__top = $(el).css('padding-top');
		textarea__pd__bottom = $(el).css('padding-bottom');
		textarea__height = parseFloat(textarea__hidden.height()) + parseFloat(textarea__pd__top) + parseFloat(textarea__pd__bottom) + .1;
		$(el).css({'height':textarea__height});
		
	}
	
};
*/




/*
$(document).ready(function(){


	// Slider
	$('#slider').owlCarousel({

		// Most important owl features
		items: 1,
		singleItem: true,

		// Basic Speeds
		slideSpeed: 200,
		paginationSpeed: 800,
		rewindSpeed: 1000,

		// Autoplay
		autoplay: 4000,
		autoplayHoverPause: true,

		// Navigation
		nav: true,
		navText: false,
		rewindNav: true,
		scrollPerPage: true,

		// Pagination
		pagination: false,

		// Responsive 
		responsiveClass: true,

		// Lazy load
		lazyLoad: false,
		lazyFollow: true,
		lazyEffect: 'fade',

		// Auto height
		autoHeight: false,

		// Mouse Events
		dragBeforeAnimFinish: true,
		mouseDrag: true,
		touchDrag: true,

		// Transitions
		transitionStyle: 'fadeUp',

		// Other
		addClassActive: true

	});



	// Feedback Popup
	var modalDialogMouseOvered = false;
	var modal_holder = $('.modal-holder');
	
	$('#feedback-trigger').on('click', function(){
		modal_dialog = $($(this).attr('modal-dialog'));
		doModalVisible(modal_holder, modal_dialog);
		return false;
	});

	$('#test-trigger').on('click', function(){
		modal_dialog = $($(this).attr('modal-dialog'));
		doModalVisible(modal_holder, modal_dialog);
		return false;
	});

	$('.modal-dialog').on('mouseover', function(){ modalDialogMouseOvered = true; });
	$('.modal-dialog').on('mouseout', function(){  modalDialogMouseOvered = false; });

	$('.modal-holder').on('click', function(){
		if (!modalDialogMouseOvered) {
			doModalHidden($(this), $(this).find('.modal-dialog.isVisible'));
		}
	});

	$('.modal-close').on('click', function(){
		doModalHidden($(this).parents('.modal-holder'), $(this).parents('.modal-dialog'));
	});



	// do Modal Visible
	function doModalVisible(holder, dialog){
		
		if (holder.length > 0 && dialog.length > 0) {

			$('body').removeClass('overflow-hidden');

			if (device.windows()) {
				
				scroll_width = 0;
			
				doc_width_before = $(window).width();
					$('body').addClass('overflow-hidden');
						doc_width_after = $(window).width();

				scroll_width = doc_width_after - doc_width_before;

				$('body').css({'margin-right': scroll_width});

			}
			else {

				$('body').addClass('overflow-hidden');

			}

			holder.addClass('isVisible');
			holder.scrollTop(0);
			holder.find('.modal-dialog.isVisible').removeClass('isVisible');

			dialog.addClass('isVisible');

		}
		else {
			alert('error');
		}

	}



	// do Modal Hidden
	function doModalHidden(holder, dialog){

		if (holder.length > 0 && dialog.length > 0) {
		
			holder.addClass('isHidden');
			dialog.addClass('isHidden');

			setTimeout(function(){
				
				holder.removeClass('isVisible').removeClass('isHidden');
				dialog.removeClass('isVisible').removeClass('isHidden');
				$('body').css({'margin-right': 0});
				$('body').removeClass('overflow-hidden');

			}, 150);

		}

	}



});
*/