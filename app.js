// Declarations
var userSession = "Guest";

// App content
var listings = [];
var userHistory = [];
var users = [];
var messages = [];

// Object constructor
var createMessage;

var newListing;

var filter;
var currentItem;
var buyItem;
var itemDetails;
var historyDetails;
var register;
var login;
var logout;
var saveProfile;
var findUser;
var recoverPassword;

// Page content update
var updateHome;
var updateDetails;
var updateCommunication;
var updateOptions;
var updateHistory;

// Initializations
// Create a new listing if user is logged in
newListing = function() {
    
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
        newListing.user = userSession;
        
        // Updating listings
        listings.push(newListing);
        updateHome();
        alert("You have successfully listed this item!");
        
    // User is logged out, routing to Login
    } else {
        alert("You must be logged in to list an item!");
        display("login");
    }
};

// Creating a new message
createMessage = function(inputRecipient, inputSender, inputContent, 
        inputStatus, inputDate) {
    var message = {
        recipient: inputRecipient,
        sender: inputSender,
        content: inputContent,
        status: inputStatus,
        date: inputDate
    };
    
    // Returning new message and adding it to messages[]
    messages.push(message);
    return message;
};

// Update Communicaiton
updateCommunication = function() {
    
    // Populating message list dynamically
    var index;
    
    for(index = 0; index < messages.length; index++) {
        
        // Checking for messages to current user
        if(messages[index].recipient == userSession) {
            document.getElementById("communicationDiv").innerHTML 
                    += "<br><div class='item' style='background: rgba(255, 117, 117, 0.8)'><button class='itemButton'><div class='alignLeft'><div id='history5_name'>Name</div><div id='history5_price'>Price</div></div></button></div>";
        }
    }
    
    // Indicating 0 messages if none found
    if(document.getElementById("communicationDiv").innerHTML.length == 0) {
        document.getElementById("communicationDiv").innerHTML 
                = "<br>0 Messages";
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
            alert("Purchased successfully!");
            
        // Redirecting to Home if sold out
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
        var currentUser;
        users.forEach(function(user) {
            if(user.username == userSession) {
                currentUser = user;
            }
        })
        
        document.getElementById("profileTitle").innerHTML = currentUser.username;
        document.getElementById("profileName").value = currentUser.name;
        document.getElementById("profileEmail").value = currentUser.email;
        document.getElementById("profilePassword").value = currentUser.password;
        
    // User is logged out, routing to Login
    } else {
        display("login");
    }
};

// Saving profile information
saveProfile = function() {
    var currentUser;
    users.forEach(function(user) {
        if(user.username == userSession) {
            currentUser = user;
        }
    })
    
    currentUser.name = document.getElementById("profileName").value;
    currentUser.email = document.getElementById("profileEmail").value;
    currentUser.password = document.getElementById("profilePassword").value;
    
    alert("Profile updated successfully!");
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
        var newUser = {
            username: newUsername, 
            password: document.getElementById("newPassword").value,
            name: document.getElementById("newName").value,
            email: document.getElementById("newEmail").value
        };
        users.push(newUser);
        display("login");
        alert("You have successfully registered!");
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
        alert("You have successfully logged in!");
    }
};

// Logout
logout = function() {
    userSession = "Guest";
    updateOptions();
    alert("You have successfully logged out!");
};

// Reseting password
recoverPassword = function() {
    var passwordReset = false;
    users.forEach(function(user) {
        
        // Reseting password and notifying user
        if(user.username == document.getElementById("username").value) {
            user.password = Math.floor(Math.random() * 9000) + 1000;
            console.log("Your temporary password is: " + user.password);
            passwordReset = true;
        }
        
        if(!passwordReset) console.log("User not found");
    })
};

// At load time
window.onload = function() {
    // Parse.initialize("PiNTSFuGoch7GfNIBMoBGEuEq550dMllSKNKgx50", "nWuvss7iWhgB8IpiCdObrRDWw9n3Q8HVClDeRh9x");
    updateHome();
};
