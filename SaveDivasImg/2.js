$(function(){
  $("#gimg").click(function(){
     html2canvas($("#wrp"), {
	    onrendered: function(canvas) {
	       var imgsrc = canvas.toDataURL("image/png");
	       console.log(imgsrc);
	       $("#newimg").attr('src',imgsrc);
	       $("#img").show();
        }
     });
  });  
  });