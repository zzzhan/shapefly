$(function(){
  var w = $(".marketing-word");
  var words = w.data('typed-text').split(',');
  w.typed({
	strings: words,
	typeSpeed: 0,
	loop:true,
	backDelay:3000,
	showCursor:true
  });
});