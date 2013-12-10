var lastId,
    topMenu       = $(".nav"),
    topMenuHeight = topMenu.outerHeight()+0,
    menuItems     = topMenu.find("a"),
    activeClass   = "active",
    scrollItems   = menuItems.map(function(){
      var item    = $($(this).attr("href"));
      if (item.length) { 
        return item; 
      }
    });

menuItems.click(function(e){
    e.preventDefault();
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 300);
});

function highlightNav() {
   var fromTop = $(window).scrollTop()+1;
   var cur = scrollItems.map(function(){ if ($(this).offset().top < fromTop) { return this; } });
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .removeClass(activeClass)
         .filter("[href=#"+id+"]").addClass(activeClass);
   }   
}

highlightNav();
$(window).scroll( highlightNav );

function fixNav(){
    var spySection = $(".main-section");

    $(window).scroll(function(){
        if ($(this).scrollTop() > spySection.outerHeight()) {
          $(".navigation").addClass('fixed-pos');
        } else {
          $(".navigation").removeClass('fixed-pos');
        }
    });
}

fixNav();
