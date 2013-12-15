require.config({
    paths: {
        "modernizr": "/js/modernizr/modernizr",
        "gmaps": "/js/gmaps/gmaps",
        "nav": "/js/nav"
    }
});

require(["modernizr", "gmaps", "nav"], function(Modernizr){
    console.log("Require.js is loaded");
});
