$(document).ready(function(){
	deviceOrientation__Init();
	textareaAutoresize__Init();
});




// DEVICE ORIENTATION
function deviceOrientation__Init(){
	docWidth   = $(document).width();
	docHeight  = $(document).height();
	if (docWidth > docHeight) {
		$('html').removeClass('portrait').addClass('landscape');
	} else {
		$('html').removeClass('landscape').addClass('portrait');
	}
	//console.log('DOC Size:' + docWidth + 'x' + docHeight);
	//console.log('HTML Class: ' + $('html').attr('class'));
};
$(window).on('resize', function(){
	deviceOrientation__Init();
});




// TEXTAREA AUTORESIZE
function textareaAutoresize__Init(){
	$('textarea[autoresize="on"]').each(function(){
		textareaAutoresize(this);
		$(this).on('keydown keyup change', function(){
			textareaAutoresize(this);
		});
		/*
		textareaAutoresize__timer = setInterval(function(){
			textareaAutoresize(el);
		}, 1000);
		*/
	});
};
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
		//console.log(textarea__height);
		//$(el).val('sdasadsda as as a das s as as as das dsa das d das da das das dasda  s a as as asd as asd s as asas as as as');
	}
};
$(window).on('resize', function(){
	textareaAutoresize__Init();
});




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