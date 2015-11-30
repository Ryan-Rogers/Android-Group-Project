// Holds the id of the content to display on load and after each change
var currentContent;

// Hides the inputed content
var hide = function(contentId) {
    
    // Hiding input content
    document.getElementById(contentId).style.visibility = "collapse";
    document.getElementById(contentId).style.display = "none";
};

// Hides current content, updates it, and then shows the inputed content
var display = function(contentId) {
    
    // Hiding currently shown content & updating, if necessary
    if(contentId !== currentContent) {
        
        // Updating currently shown content
        hide(currentContent);
        currentContent = contentId;
        changeBackground(contentId);
        
        // Showing input content
        document.getElementById(contentId).style.visibility = "visible";
        document.getElementById(contentId).style.display = "table";
        if(contentId == "options") updateOptions();
        else if(contentId == "communication") updateCommunication();
    }
};

// Changes background of body to input content
var changeBackground = function(contentId) {
    var body = document.getElementsByTagName("BODY")[0];
    body.style.backgroundImage = "url(" + contentId + "_bg.jpg)";
    body.style.backgroundRepeat = "repeat-y";
    body.style.backgroundSize = "100%";
};

// At load time
var landingPage = function() {
    
    // Updating and showing home page
    document.getElementById("home").style.visibility = "visible";
    document.getElementById("home").style.display = "table";
    currentContent = "home";
};

// Setting load time function
window.onload = landingPage();
