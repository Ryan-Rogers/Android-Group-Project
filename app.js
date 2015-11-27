// Initializations
var createListing;
var updateHome;
var listings = [];
var user = "anon";

// Functions
createListing = function() {
    var newListing = {name: "", cost: "", quantity: "", deliveryType: "", 
            appointments: "", venues: "", user: ""};
    newListing.name = document.getElementById("newListingName").value;
    newListing.cost = document.getElementById("newListingCost").value;
    newListing.quantity = document.getElementById("newListingQuantity").value;
    newListing.deliveryType = document.getElementById("newListingType").value;
    newListing.appointments = document.getElementById("newListingAppointments").value;
    newListing.venues = document.getElementById("newListingVenues").value;
    newListing.user = user;
    listings.push(newListing);
    console.log(newListing.name + " created");
    updateHome();
};

updateHome = function() {
    
    // Filtering with Search field
    var search = document.getElementById("search").value;
    var filteredListings = [];
    listings.forEach(function(item) {
        if(item.name.indexOf(search) !== -1) filteredListings.push(item);
    })
    
    var listing;
    // Populating Home
    for(listing = 0; listing < 6 && listing < filteredListings.length; listing++) {
        document.getElementById("item" + listing).style.background = "rgba(63, 186, 255, 0.8)";
        document.getElementById("item" + listing + "_name").innerHTML = filteredListings[listing].name;
        document.getElementById("item" + listing + "_price").innerHTML = filteredListings[listing].cost;
    }
    console.log("test");
};

window.onload = function() {
    updateHome();
};
