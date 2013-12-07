require.config({
    paths: {
		// [fix] - The paths doesn't somehow load correctly?
        "modernizr": "modernizr/modernizr.js",
        "selectivizr": "selectivizr/selectivizr.js"
    }
});

require(["modernizr", "selectivizr"], function(Modernizr, win){
    console.log("Require.js is loaded");
});
