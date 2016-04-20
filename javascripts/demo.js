// Sets up hide/show links for the demos
jQuery('.showSource').each(function(i, e) {
  var jqE = jQuery(e);
  jqE.after(
    '<div style="display:none"> \
       <iframe style="width: 100%; height: 400px" \
        src="http://jsfiddle.net/'+jqE.attr("_src")+
        '/embedded/result,js,html/dark"> \
       </iframe> \
       <a class="hideSource">[Hide Demo]</a> \
     </div>'
  );
});

function showSource(e) {
  e.target.style.display='none';
  e.target.nextElementSibling.style.display='block';
}
jQuery('.showSource').click(showSource);
jQuery('.hideSource').click(function(e) {
  e.target.parentNode.style.display='none';
  e.target.parentNode.previousElementSibling.style.display = '';
});
// Show the first one
jQuery('.showSource').first().click();

