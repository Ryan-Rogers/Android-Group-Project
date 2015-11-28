// Initializations
var createListing;
var updateHome;
var itemDetails;
var listings = [];
var user = "anon";
var filter;
var currentItem;
var buyItem;

// Functions
// Create a new listing
createListing = function() {
    
    // Creating a new listing
    var newListing = {name: "", cost: "", quantity: "", deliveryType: "", 
            appointments: "", venues: "", user: ""};
    newListing.name = document.getElementById("newListingName").value;
    newListing.cost = document.getElementById("newListingCost").value;
    newListing.quantity = document.getElementById("newListingQuantity").value;
    newListing.deliveryType = document.getElementById("newListingType").value;
    newListing.appointments = document.getElementById("newListingAppointments").value;
    newListing.venues = document.getElementById("newListingVenues").value;
    newListing.user = user;
    
    // Adding to listings[]
    listings.push(newListing);
    console.log(newListing.name + " created");
    
    // Updating Home
    updateHome();
};

// Update Home
updateHome = function() {
    
    // Unpopulating Home
    var listing;
    for(listing = 0; listing < 6; listing++) {
        document.getElementById("item" + listing).style.background = "rgba(63, 186, 255, 0.0)";
        document.getElementById("item" + listing + "_name").innerHTML = "";
        document.getElementById("item" + listing + "_price").innerHTML = "";
    }
    
    // Filtering with Search text
    var filteredListings = filter();
    
    // Repopulating Home
    for(listing = 0; listing < 6 && listing < filteredListings.length; listing++) {
        document.getElementById("item" + listing).style.background 
                = "rgba(63, 186, 255, 0.8)";
        document.getElementById("item" + listing + "_name").innerHTML 
                = filteredListings[listing].name;
        document.getElementById("item" + listing + "_price").innerHTML 
                = filteredListings[listing].cost;
    }
};

// Switch to itemDetails for selected item
itemDetails = function(item) {
    
    // Updating itemDetails page
    var filteredListings = filter();
    document.getElementById("itemDetailsTitle").innerHTML = filteredListings[item].name;
    document.getElementById("itemDetailsCost").innerHTML = filteredListings[item].cost;
    document.getElementById("itemDetailsQuantity").innerHTML = filteredListings[item].quantity;
    document.getElementById("itemDetailsType").innerHTML = filteredListings[item].deliveryType;
    document.getElementById("itemDetailsAppointments").innerHTML = filteredListings[item].appointments;
    document.getElementById("itemDetailsVenues").innerHTML = filteredListings[item].venues;
    document.getElementById("itemDetailsSeller").innerHTML = filteredListings[item].user;
    display("itemDetails");
    
    // Setting currentItem for purchases
    currentItem = item;
    
};

// Filter items by search
filter = function() {
    
    // Grabbing search term
    var search = document.getElementById("search").value.toLowerCase();
    
    // Filtering item list with search term
    var filteredListings = [];
    listings.forEach(function(item) {
        if(item.name.toLowerCase().indexOf(search) !== -1) filteredListings.push(item);
    })
    return filteredListings;
};

// Buy the current item
buyItem = function() {
    
};

// At load time
window.onload = function() {
    updateHome();
};
