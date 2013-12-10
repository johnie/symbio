function sections() {
    $(".sections").css({
        "height" : $(window).height() + "px"
    });
}

sections();

$(window).resize(function(){
    sections();    
});

$(function(){
    $(".first-nav").find("li:first a").addClass("current");

    $("#jump-link").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(".main").offset().top
        }, 250);
    });
});
