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
    var listing;
    for(listing = 0; listing < 5 && listing < listings.length; listing++) {
        document.getElementById("item" + listing).style.background = "rgba(63, 186, 255, 0.7)";
        document.getElementById("item" + listing + "_name").innerHTML = listings[listing].name;
        document.getElementById("item" + listing + "_price").innerHTML = listings[listing].cost;
    }
};

window.onload = function() {
    updateHome();
};
