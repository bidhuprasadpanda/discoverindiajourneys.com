/*
	@author: Ilyas karim <ilyas.datoo@gmail.com>
	@date: 5/may/2016

*/
(function ($) {
	$.fn.jPopup = function (options) {
		var options = $.extend({
			title : "Simple Popup Plugin",
			content : "simple content",
			footer : true,
			maximize : false,
		},options);
		createElements(options);
		popClickActions();
	}
	/*
		Plugin Structure
	*/
	function createElements(options) {

		var head = "<div class='jpop-head' ><a data-jpop='close' class='close'>&times;</a><h3 class='jpop-head-title' >"+options.title+"</h3></div>";
		var body = "<div class='jpop-body' >"+options.content+"</div>";
		if (options.footer == true) {
			var footer = "<div class='jpop-footer  text-right' ><button class='btn btn-close' data-jpop='close' >Close</button></div>";
		}else {
			var footer = "";
		}
		if (options.maximize == true) {
			var maximize = "maximize";
		}else {
			var maximize = "";
		}
		var template = "<div class='popup "+maximize+" ' >" + head + body + footer + "</div>";
		$("#jPopup").html(template);
		// $("#jPopup").html(template);
	}
	/*
		Detects clicks (Close Popup,Submit, ETC)
	*/
	function popClickActions() {
		$("html").on('click', '[data-jpop]', function(event) {
			event.preventDefault();
			var action = $(this).attr('data-jpop');
			if (action == 'close') {
				closePopup();
			}else if (action =='open') {
				openPopup();
			}else if (action =='toggle') {
				togglePopup();
			}
		});
	}
	function closePopup() {
		$("html").removeClass('jPopup-active');
	}
	function openPopup() {
		$("html").addClass('jPopup-active');
	}
	function togglePopup() {
		$("html").toggleClass('jPopup-active');
	}
}(jQuery))