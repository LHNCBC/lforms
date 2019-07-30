// Sets up hide/show links for the demos
function showSource(event) {
  var elem = event.target;
  if (!elem._loadedDemo) {
    elem._loadedDemo = true;
    var jqE = jQuery(elem);
    jqE.after(
      '<div style="display:none"> \
         <iframe style="width: 100%; height: 400px" \
          src="https://jsfiddle.net/'+jqE.attr("_src")+
          '/embedded/result,js,html/dark/"> \
         </iframe> \
         <a class="hideSource" onclick="hideSource(this)">[Hide Demo]</a> \
       </div>'
    );
  }
  elem.style.display='none';
  elem.nextElementSibling.style.display='block';
}
jQuery('.showSource').click(showSource);

function hideSource(elem) {
  elem.parentNode.style.display='none';
  elem.parentNode.previousElementSibling.style.display = '';
};

// Show the first one
jQuery('.showSource').first().click();

