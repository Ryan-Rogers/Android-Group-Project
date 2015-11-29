// Initializations
var userSession = "Guest";

var listings = [];
var userHistory = [];
var users = [];

var updateHome;
var filter;
var createListing;
var currentItem;
var buyItem;
var itemDetails;
var updateHistory;
var historyDetails;
var updateDetails;
var updateOptions;
var register;
var login;

// Functions
// Create a new listing if user is logged in
createListing = function() {
    
    // Checking for login
    if(userSession !== "Guest") {
        
        // Parse
        /* var NewListing = Parse.Object.extend("Listing");
        var newListing = new NewListing();
        testObject.save({foo: "bar"}).then(function(object) {
          alert("yay! it worked");
        }); */
        
        // Creating a new listing
        var newListing = {name: "", cost: "", quantity: "", deliveryType: "", 
                appointments: "", venues: "", user: ""};
        newListing.name = document.getElementById("newListingName").value;
        newListing.cost = document.getElementById("newListingCost").value;
        newListing.quantity 
                = document.getElementById("newListingQuantity").value;
        newListing.deliveryType 
                = document.getElementById("newListingType").value;
        newListing.appointments 
                = document.getElementById("newListingAppointments").value;
        newListing.venues = document.getElementById("newListingVenues").value;
        newListing.user = user;
        
        // Adding to listings[]
        listings.push(newListing);
        console.log(newListing.name + " created");
        
        // Updating Home
        updateHome();
        
    // User is logged out, routing to Login
    } else {
        alert("You must be logged in to list an item!");
        display("login");
    }
};

// Update Home
updateHome = function() {
    
    // Unpopulating Home
    var listing;
    for(listing = 0; listing < 6; listing++) {
        document.getElementById("item" + listing).style.background 
                = "rgba(63, 186, 255, 0.0)";
        document.getElementById("item" + listing + "_name").innerHTML = "";
        document.getElementById("item" + listing + "_price").innerHTML = "";
    }
    
    // Filtering with Search text
    var filteredListings = filter(listings, 
            document.getElementById("search").value.toLowerCase());
    
    // Repopulating Home
    for(listing = 0; listing < 6 && listing < filteredListings.length; 
            listing++) {
        document.getElementById("item" + listing).style.background 
                = "rgba(63, 186, 255, 0.8)";
        document.getElementById("item" + listing + "_name").innerHTML 
                = filteredListings[listing].name;
        document.getElementById("item" + listing + "_price").innerHTML 
                = filteredListings[listing].cost;
    }
};

// Switch to itemDetails for selected item in History
historyDetails = function(itemIndex) {
    
    // Updating itemDetails page
    var filteredListings = filter(userHistory, 
            document.getElementById("searchHistory").value.toLowerCase());
    updateDetails(filteredListings[itemIndex]);
    
    // Setting currentItem for purchases
    currentItem = filteredListings[itemIndex];
    currentItem.index = itemIndex;
};

// Switch to itemDetails for selected item in Home
itemDetails = function(itemIndex) {
    
    // Updating itemDetails page
    var filteredListings = filter(listings, 
            document.getElementById("search").value.toLowerCase());
    updateDetails(filteredListings[itemIndex]);
    
    // Setting currentItem for purchases
    currentItem = filteredListings[itemIndex];
    currentItem.index = itemIndex;
};

// Update itemDetails
updateDetails = function(item) {
    document.getElementById("itemDetailsTitle").innerHTML = item.name;
    document.getElementById("itemDetailsCost").innerHTML = item.cost;
    document.getElementById("itemDetailsQuantity").innerHTML = item.quantity;
    document.getElementById("itemDetailsType").innerHTML = item.deliveryType;
    document.getElementById("itemDetailsAppointments").innerHTML 
            = item.appointments;
    document.getElementById("itemDetailsVenues").innerHTML = item.venues;
    document.getElementById("itemDetailsSeller").innerHTML = item.user;
    display("itemDetails");
};

// Filter items by search
filter = function(unfiltered, term) {
    
    // Filtering item list with term
    var filteredListings = [];
    unfiltered.forEach(function(item) {
        if(item.name.toLowerCase().indexOf(term) !== -1) {
            filteredListings.push(item);
        }
    })
    return filteredListings;
};

// Buy the current item
buyItem = function() {
    
    // Checking for login
    if(userSession !== "Guest") {
        
        // Checking if item is in stock
        if(currentItem.quantity > 0) {
            
            // Buying item and updating listing
            currentItem.quantity -= 1;
            itemDetails(currentItem.index);
            
            // Updating History
            userHistory.push(currentItem);
            updateHistory();
            
        // Redirecting to Home
        } else {
            alert("This item is sold out!");
            display("home");
        }
        
    // User is logged out, routing to Login
    } else {
        alert("You must be logged in to buy an item!");
        display("login");
    }
};

// Updating History
updateHistory = function() {
    
    // Unpopulating History
    var listing;
    for(listing = 0; listing < 6; listing++) {
        document.getElementById("history" + listing).style.background 
                = "rgba(226, 121, 226, 0.0)";
        document.getElementById("history" + listing + "_name").innerHTML = "";
        document.getElementById("history" + listing + "_price").innerHTML = "";
    }
    
    // Filtering with Search text
    var filteredHistory = filter(userHistory, 
            document.getElementById("searchHistory").value.toLowerCase());
    
    // Repopulating History
    for(listing = 0; listing < 6 && listing < filteredHistory.length; 
            listing++) {
        document.getElementById("history" + listing).style.background 
                = "rgba(226, 121, 226, 0.8)";
        document.getElementById("history" + listing + "_name").innerHTML 
                = filteredHistory[listing].name;
        document.getElementById("history" + listing + "_price").innerHTML 
                = filteredHistory[listing].cost;
    }
};

// Update Options page
updateOptions = function() {
    
    // Checking for login
    if(userSession !== "Guest") {
        
    // User is logged out, routing to Login
    } else {
        display("login");
    }
};

// Registering a new user if unique
register = function() {
    var newUsername = document.getElementById("newUsername").value;
    
    // Checkng uniqueness
    var usernameUnique = true;
    users.forEach(function(user) {
        if(user.username == newUsername) {
            alert("This username already exists!");
            usernameUnique = false;
        }
    })
    
    // Creating unique new user
    if(usernameUnique) {
        var newUser = {username: newUsername, 
                password: document.getElementById("newPassword").value};
        users.push(newUser);
        display("login");
    }
};

// Login
login = function() {
    var passwordCorrect = false;
    var usernameEntered = document.getElementById("username").value;
    var passwordEntered = document.getElementById("password").value;
    
    // Searching for entered username
    users.forEach(function(user) {
        if(user.username == usernameEntered) {
            
            // Checking password
            if(user.password == passwordEntered) {
                
                // Logging in
                userSession = user.username;
                passwordCorrect = true;
            }
        }
    })
    
    if(!passwordCorrect) alert("Username not found or incorrect password!");
    else {
        display("options");
    }
};

// At load time
window.onload = function() {
    // Parse.initialize("PiNTSFuGoch7GfNIBMoBGEuEq550dMllSKNKgx50", "nWuvss7iWhgB8IpiCdObrRDWw9n3Q8HVClDeRh9x");
    updateHome();
};
