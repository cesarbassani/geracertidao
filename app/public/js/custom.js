// Author: AleMaciell
// setTimeout(function() {
// 	$(document).ready(function() {
// 		$('.preloader').fadeOut();
// 	});
// }, 1000);

/*open external link*/
$(".external").attr({target:"_blank"});

$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

/*open_menu*/
function openNav() {document.getElementById("menu_principal").style.width = "100%";}
function closeNav() {document.getElementById("menu_principal").style.width = "0%";}
