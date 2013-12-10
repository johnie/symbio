require.config({
    paths: {
        "modernizr": "/js/modernizr/modernizr",
        "selectivizr": "/js/selectivizr/selectivizr",
        "onepage-scroll": "/js/onepage-scroll/jquery.onepage-scroll.min",
        "nav": "/js/nav"
    }
});

require(["modernizr", "selectivizr", "onepage-scroll", "nav"], function(Modernizr, win, onepagescroll){
    console.log("Require.js is loaded");
});
