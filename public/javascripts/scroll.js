jQuery(document).ready(function($) {
	var button = "<div id='GoTop' class='gotop btn border-primary'></div>";
	var bodyPage = $('body');
	bodyPage.append(button);
	$("#GoTop").append('<i class="fas fa-chevron-up text-primary"></i>')
	$("#GoTop").css({
		"position":"fixed",
		"bottom"  :"20px",
		"right"	  :"20px",
		"display" : "none"
	})
	window.onscroll = function() {scrollFunction()};
	function scrollFunction() {
	    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
	        document.getElementById("GoTop").style.display = "block";
	    } else {
	        document.getElementById("GoTop").style.display = "none";
	    }
	}
	$("#GoTop").click(function(event) {
		document.body.scrollTop = 0;
  		document.documentElement.scrollTop = 0;
	});
});