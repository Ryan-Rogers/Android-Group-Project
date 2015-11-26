// Initializations
var createListing;
var listings = [];

// Functions
createListing = function() {
    var newListing = "newObject";
    newListing.name = document.getElementById("newListingName").value;
    newListing.cost = document.getElementById("newListingCost").value;
    newListing.quantity = document.getElementById("newListingQuantity").value;
    newListing.deliveryType = document.getElementById("newListingType").value;
    newListing.appointments = document.getElementById("newListingAppointments").value;
    newListing.venues = document.getElementById("newListingVenues").value;
    listings.push(newListing);
    console.log(newListing.deliveryType);
};
