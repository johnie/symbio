require.config({
    paths: {
        "modernizr": "/js/modernizr/modernizr.js",
        "selectivizr": "selectivizr/selectivizr.js"
    }
});

require(["modernizr", "selectivizr"], function(Modernizr, win){
    console.log("Hello");
});