require.config({
    paths: {
        "modernizr": "/js/modernizr/modernizr",
        "selectivizr": "/js/selectivizr/selectivizr"
    }
});

require(["modernizr", "selectivizr"], function(Modernizr, win){
    console.log("Require.js is loaded");
});
