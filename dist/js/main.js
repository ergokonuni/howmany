$(document).ready(function(){
	
	deviceOrientation__Init();
	//appHeader__Init();
	appSidebar__Init();
	textareaAutoresize__Init();

});






// GLOBAL VARS
html        = 'html';
body        = 'body';
header      = '.app--header';
sidebars    = '.app--sidebar';
content     = '.page';
header_pd_r =  parseFloat($(header).css('padding-right'));
body_pd_r   =  parseFloat($(body).css('padding-right'));
// / GLOBAL VARS






// DEVICE ORIENTATION
function deviceOrientation__Init(){
	
	docWidth   = $(document).width();
	docHeight  = $(document).height();
	
	$(html).removeClass('portrait landscape square');
	
	if (docWidth > docHeight) {
		$(html).addClass('landscape');
	} else if (docWidth < docHeight) {
		$(html).addClass('portrait');
	} else if (docWidth == docHeight) {
		$(html).addClass('square');
	}
	
	//console.log('DOC Size:' + docWidth + 'x' + docHeight);
	//console.log('HTML Class: ' + $(html).attr('class'));

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
		
		if (scrollDirection > 0){
			$(header).addClass('isHidden').removeClass('isVisible');
		}
		else if (scrollDirection < 0){
			$(header).addClass('isVisible').removeClass('isHidden');
		}

	};

};
// / APP HEADER






// APP SIDEBAR
function appSidebar__Init(){

	// Vars
	toggles   = '[data-sidebar-id]';
	var content_animTimeout, overlay_animTimeout;
	
	// Sidebar Items Tabindex Init
	tabIndexDancing($(sidebars));
	
	// Add Click Event to Sidebar Toggle
	$(toggles).on('click', function(){
		
		// Vars
		toggle  =  this;
		sidebar = '#' + $(toggle).attr('data-sidebar-id');
		overlay = '#' + $(toggle).attr('data-overlay-id');
		
		// Check for elements exist
		if (elementExist([sidebar, overlay, content, header, body])) {
			
			if (!$(sidebar).hasClass('isVisible')) {
				
				// Sidebar is Hidden. Showing it...
				
				$(overlay).off('click').on('click', function(){
					$(toggle).trigger('click');
				});
				
				if ($(sidebars + '.isVisible').length < 1) {
					bodyScrollbarDancing('start');
					tabIndexDancing($(content), $(sidebar));
				} else {
					tabIndexDancing($(sidebars), $(sidebar));
				}
				
				clearTimeout(content_animTimeout);
				
				$(body).addClass('xy-hidden');
				$(toggles).removeClass('alt');
				$(toggle).addClass('alt');
				
				if ($(sidebars + '.isVisible').length < 1) {
					$(overlay).removeClass('isNone').addClass('isBlock');
					overlay_animTimeout = setTimeout(function(){
						$(overlay).removeClass('isHidden').addClass('isVisible');
					}, 10);
				}
				
				if ($(sidebars + '.isVisible').length > 0) {
					$(sidebars + '.isVisible').removeClass('isVisible').addClass('isHidden');
					clearTimeout(overlay_animTimeout);
				}

				$(sidebar).removeClass('isHidden').addClass('isVisible');
				$(sidebar).scrollTop(0);

				if ($(sidebar).hasClass('major')){
					$(sidebars + '.minor').addClass('x2');
					$(content).removeClass('toCenter toLeft').addClass('toRight');
				}
				else if ($(sidebar).hasClass('minor')) {
					$(sidebars + '.major').addClass('x2');
					$(content).removeClass('toCenter toRight').addClass('toLeft');
				}
				
			}
			else if ($(sidebar).hasClass('isVisible')) {
				
				// Sidebar is Visible. Hiding it...

				clearTimeout(content_animTimeout);
				
				$(sidebar).removeClass('isVisible').addClass('isHidden');
				$(sidebars).removeClass('x2');
				$(content).removeClass('toLeft toRight').addClass('toCenter');
				$(overlay).removeClass('isVisible').addClass('isHidden');
				$(toggles).removeClass('alt');
				tabIndexDancing($(sidebar), $(content));
				
				anim_time = 0
				anim_times = $(overlay).css('transition-duration');
				anim_times = anim_times.split(', ');
				
				for (i = 0; i < anim_times.length; i++) {
					val = parseFloat(anim_times[i]) * 1000;
					if (anim_time < val) {
						anim_time = val;
					}
				}
				
				content_animTimeout = setTimeout(function(){

					bodyScrollbarDancing('end');

					$(content).removeClass('toCenter');
					$(overlay).removeClass('isBlock').addClass('isNone');
					$(body).removeClass('xy-hidden');

				}, anim_time);

			}

		}

	});

};
// / APP SIDEBAR






// BODY SCROLLBAR DANCING ON DESKTOP WITH WINDOWS (OMG!)
function bodyScrollbarDancing(state){
	
	if ($(html).hasClass('desktop win')) {

		if (state == 'start') {
			
			if ($(body).css('overflow') != 'hidden') {
				if (smallPage()) {
					scrollbar_width = 0;
				} else {
					scrollbar_width = getScrollbarWidth();
				}
				if (!body_pd_r)   { body_pd_r   = 0; }
				if (!header_pd_r) { header_pd_r = 0; }
				$(body).css({'padding-right':body_pd_r + scrollbar_width, 'overflow':'hidden'});
				$(header).css({'padding-right':header_pd_r + scrollbar_width});
				$(body).addClass('xy-hidden');
			}
			
		}
		else if (state == 'end') {
			
			if (!body_pd_r)   { body_pd_r   = 0; }
			if (!header_pd_r) { header_pd_r = 0; }
			content_width = $(content).width();
			$(content).css({'width':content_width});
			$(body).css({'padding-right':body_pd_r, 'overflow':'auto', 'overflow-x':'hidden'});
			$(header).css({'padding-right':header_pd_r});
			$(body).removeClass('xy-hidden');
			setTimeout(function(){
				$(content).css({'width':'auto'});
				$(body).css({'overflow-x':'auto'});
			}, 20);
			
		}
		
	}

};



function getScrollbarWidth(){

	scrollbar_width = 0;
	crutch = '.crutch--holder';
	
	if ($(crutch).length < 1) {
		crutch_html = '<div class="crutch--holder"><div class="crutch--inner"></div></div>';
		$(body).append(crutch_html);
	}
	
	$(crutch).css({'overflow':'auto', 'display':'block'});
	crutch_width_before = $(crutch).width();
	$(crutch).css({'overflow':'hidden'});
	crutch_width_after = $(crutch).width();
	$(crutch).css({'overflow':'auto', 'display':'none'});
	scrollbar_width = crutch_width_after - crutch_width_before;

	return scrollbar_width;

};



function smallPage(){

	doc_height = $(document).height();
	win_height = $(window).height();

	if (doc_height <= win_height) {
		return true;
	} else {
		return false;
	}

};
// / BODY SCROLLBAR DANCING ON DESKTOP WITH WINDOWS (OMG!)






// TAB-INDEX DANCING
function tabIndexDancing(elm_disabled, elm_enabled){
	
	$(elm_disabled).each(function(){
		
		// Disabling Tabindex in Specified Elements
		if (!$(this).hasClass('tabindex--disabled')) {
			
			$(this).addClass('tabindex--disabled');
			$(this).find('a, input, textarea, button, [tabindex]').each(function(){

				tabindex      = $(this).attr('tabindex');
				data_tabindex = $(this).attr('data-tabindex');
				
				if (tabindex && tabindex != '') {
					$(this).attr('data-tabindex', tabindex);
				}
				$(this).attr('tabindex', '-1');
				
			});
			
		}
		
	});
	
	$(elm_enabled).each(function(){
		
		// Enabling Tabindex in Specified Elements
		if ($(this).hasClass('tabindex--disabled')) {
			
			$(this).removeClass('tabindex--disabled');
			$(this).find('a, input, textarea, button, [tabindex]').each(function(){
				
				tabindex      = $(this).attr('tabindex');
				data_tabindex = $(this).attr('data-tabindex');
				
				if (data_tabindex && data_tabindex != '') {
					$(this).attr('tabindex', data_tabindex);
				} else {
					$(this).removeAttr('tabindex');
				}
				
			});
			
		}
		
		if (!$(header).hasClass('tabindex--hidden')) {
			if ($(this).hasClass('app--sidebar major')) {
				$(header).find('.i--more').attr('data-tabindex', $(header).find('.i--more').attr('tabindex'));
				$(header).find('.i--more').removeAttr('tabindex');
			} else {
				$(header).find('.i--more').attr('tabindex', $(header).find('.i--more').attr('data-tabindex'));
				$(header).find('.i--more').removeAttr('data-tabindex');
			}
		}
		
	});

};
// / TAB-INDEX DANCING






// ELEMENT EXIST
function elementExist(elm){
	
	var elm_exist = true;
	
	for (i = 0; i < elm.length; i++) {
		
		if ($(elm[i]).length < 1) {
			console.log("Can't find Element: " + elm[i]);
			elm_exist = false;
		}

	}
	
	return elm_exist;

};
// / ELEMENT EXIST






// TEXTAREA AUTORESIZE
function textareaAutoresize__Init(){

	textarea = $('textarea[data-autoresize="on"]');

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