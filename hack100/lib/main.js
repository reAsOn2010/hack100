// The main module of the the_reason Add-on.

// Modules needed are `require`d, similar to CommonJS modules.
// In this case, creating a Widget that opens a new tab needs both the
// `widget` and the `tabs` modules.
var Widget = require("widget").Widget;
var tabs = require('tabs');
var self = require('self');

exports.main = function() {

    // Widget documentation: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/modules/sdk/widget.html
    
    var pageMod = require("page-mod");
 
    pageMod.PageMod({
        include: "http://10.71.45.100/*",
        contentScriptFile: [self.data.url("jquery.min.js"), self.data.url("hack100.js")]
    });
    
    
    new Widget({
        // Mandatory string used to identify your widget in order to
        // save its location when the user moves it in the browser.
        // This string has to be unique and must not be changed over time.
        id: "hack100-widget",

        // A required string description of the widget used for
        // accessibility, title bars, and error reporting.
        label: "Hack100 add-on",


        // An optional string URL to content to load into the widget.
        // This can be local content or remote content, an image or
        // web content. Widgets must have either the content property
        // or the contentURL property set.
        //
        // If the content is an image, it is automatically scaled to
        // be 16x16 pixels.
        contentURL: "http://www.mozilla.org/favicon.ico",
        //contentURL: self.data.url("osu.png"),

        // Add a function to trigger when the Widget is clicked.
        onClick: function(event) {
            
            // Tabs documentation: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/modules/sdk/tabs.html

            // Open a new tab in the currently active window.
            //tabs.open("http://www.mozilla.org");
            
            //tabs.activeTab.attach({
            //    contentScriptFile: self.data.url("hack100.js")
            //});
        }
    });
};
