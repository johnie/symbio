function sections() {
    if (!Modernizr.touch) {
        $(".sections").css({
            "height" : $(window).height() + "px"
        });
    }
}

sections();

$(window).resize(function(){
    sections();    
});

function setDataHover() {
    $(".main-menu a").each(function() {
        $(this).attr("data-hover", $(this).text());
    });
}

setDataHover();

function autoFocus() {
    var section = $(".contact-section"),
        target = section.offset().top;

    $(window).scroll(function() {
        if ($(window).scrollTop() >= target) {
            section.find(".js-first-focus").focus();
            $(".pin").addClass("bounce");
        } else {
            section.find(".js-first-focus").blur();
        }
    });
}

// autoFocus(); 
// Remove?

function whereWeAt() {
    var map;
    // 59.330211,18.055214
    map = new GMaps({
        el: "#map",
        lat: 59.330611,
        lng: 18.055214,
        zoom: 16,
        zoomControl: false,
        panControl : false,
        streetViewControl : false,
        mapTypeControl: false,
        overviewMapControl: false,
        draggable: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
    });
    map.drawOverlay({
        lat: 59.330211,
        lng: 18.055214,
        content: "<div class='pin-wrap'><div class='bubble'>Klarabergsviadukten 63</div><div class='pin'></div><div class='pulse'></div></div>"
    });
}

whereWeAt();

function startAProject() {

    var projectBtn      = $("#startAProject"),
        projectWrap     = $(".start-a-project"),
        scrollTarget    = $(".contact-section");

    projectWrap.addClass("hidden");

    projectBtn.click(function(e) {

        $(this).text(function(i, text){
          return text === "+ Start a project" ? "Close" : "+ Start a project";
        })

        e.preventDefault();

        projectWrap.find("input[type='text']").first().focus();
    
        $('html, body').animate({
            scrollTop: scrollTarget.offset().top
        }, 250);
    
        if (projectWrap.hasClass('active')) {
            projectWrap.removeClass("active");
        } else {
            projectWrap.addClass("active");
        }
    
    });

    new CustomSelect("select", {
        hiddenSelectClass : "custom-select__hidden",
        customSelectClass : "custom-select full",
        listSelectClass : "custom-select__list",
        activeListClass : "custom-select__active",
        selectedOptionClass : "custom-select__selected"
    });
}

startAProject();

function jumpNext() {
    $(".jump-next[href*=#]").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 250);
    });
}

jumpNext();

function responsiveNav() {
    $(".menu-btn").on("click", function(e){
        e.preventDefault();
        $(this).toggleClass("open");
        $(".main-menu").toggleClass('visibility');
    });
}

responsiveNav();

// mapping for json format
$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

function contactForm() {
    $("#contactform").submit(function(){
        var payload = $(this).serializeObject();

        var successMsg = [
                "<div class='message-box message-box--success'>",
                "<h3 class='message-box__title'><span>Success!</span> We\'ll get back to you as soon as possible.</h3>",
                "</div>"
            ].join('\n'),
            errorMsg = [
                "<div class='message-box message-box--error'>",
                "<h3 class='message-box__title'><span>Ooops!</span> Something went wrong. Please try again.</h3>",
                "</div>"
            ].join('\n');

        $.ajax({
            type: 'POST',
            url: '/contact',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(payload),

            success: function() {

                console.log("Success");

            }, error: function(resp) {
                if (resp.status === 200) {
                    console.log("It responds!");
                } else {
                    console.log("Error!");
                }
            }
        });
        // disable default behaviour
        return false;
    });
}

contactForm();

function mainForm() {
    $("#startaproject").submit(function(){
        var payload = $(this).serializeObject();

        $.ajax({
            type: 'POST',
            url: '/start-a-project',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(payload),

            success: function() {
                
                console.log("Success!");

            }, error: function(resp) {
                if (resp.status === 200) {
                    console.log("It responds!");
                } else {
                    console.log("Error!");
                }
            }
        });
        // disable default behaviour
        return false;
    });
}

mainForm();

// Various functions and features
$(function(){
    if (Modernizr.touch) {
        $(".main-section").addClass("js-bg-scroll");
    }
});
