$(document).ready(function() {
    var items = [
        { id: 1, name: "Treadmill", price: 999, rating: 4.5, details: " ", images: ["treadmill1.jpg", "treadmill2.jpg"], videos: [] },
        { id: 2, name: "Exercise Bike", price: 799, rating: 4.0, details: " ", images: ["bike1.jpg", "bike2.jpg"], videos: [] },
        { id: 3, name: "Dumbbells 5kg", price: 150, rating: 4.5, details: " ", images: ["dumb1.jpg", "dumb2.jpg"], videos: [] },
        { id: 4, name: "Dumbbells 10kg", price: 200, rating: 4.1, details: " ", images: ["dumb12.jpg", "dumb21.jpg"], videos: [] },
        { id: 5, name: "Gym Mats", price: 50, rating: 3.5, details: " ", images: ["mat1.jpg", "mat2.jpg"], videos: [] },
        { id: 6, name: "Spinning Bike", price: 90, rating: 3.9, details: " ", images: ["spin1.jpg", "spin2.jpg"], videos: [] },
        { id: 7, name: "Squat Racks", price: 3550, rating: 4.7, details: " ", images: ["sqat1.png"], videos: [] },
        { id: 8, name: "Flooring Glue", price: 10, rating: 3.5, details: " ", images: ["glue1.jpeg"], videos: [] },
        { id: 9, name: "Stairmaster", price: 6550, rating: 4.5, details: " ", images: ["stair1.png"], videos: [] },
        { id: 10, name: "Black Bumper Plate Bundle", price: 320, rating: 4.5, details: " ", images: ["plats.jpeg"], videos: [] }
        // Add more items here
    ];

    var selectedItems = []; // List to store selected items and quantities

    // Function to display item details on itemPage
    function displayItemDetails(item) {
        var imagesHtml = ""; // Initialize an empty string to store images HTML
        // Iterate over each image and add it to the imagesHtml
        item.images.forEach(function(image) {
            imagesHtml += `<img src="${image}" alt="${item.name}">`;
        });
        // Set the item details in the #itemDetails div
        $("#itemDetails").html(`
            <h2>${item.name}</h2>
            <p>Price: $${item.price}</p>
            <p>Rating: ${item.rating}</p>
            <p>${item.details}</p>
            <div>
                <h3>Images</h3>
                ${imagesHtml}
            </div>
            <button class="placeOrderBtn" data-id="${item.id}" data-price="${item.price}">Place Order</button>
            <button class="reserveItemBtn" data-id="${item.id}">Reserve Item</button>
            <button id="placeAllOrdersBtn">Place All Orders</button>
        `);

        // Scroll to the item details section
        $("html, body").animate({ scrollTop: $("#itemDetails").offset().top }, 1000);
    }

    // Event listener for item click
    $(document).on("click", ".item-container", function() {
        var itemId = $(this).find('a').data("id");
        var item = items.find(item => item.id === itemId);
        if (item) {
            displayItemDetails(item);
            // Navigate to itemPage
            $.mobile.changePage("#itemPage");
        }
    });

     // Event listener for reserve item button click
     $(document).on("click", ".reserveItemBtn", function() {
        var itemId = $(this).data("id");
        var item = items.find(item => item.id === itemId);
        if (item) {
            // Show a simple reservation form
            var name = prompt("Enter your name:");
            var email = prompt("Enter your email:");
            if (name && email) {
                alert(`Thank you, ${name}! Your reservation for ${item.name} has been confirmed. We will contact you at ${email}.`);
            } else {
                alert("Please provide valid name and email.");
            }
        }
    });

    // Event listener for place order button click
    $(document).on("click", ".placeOrderBtn", function() {
        var itemId = $(this).data("id");
        var itemPrice = $(this).data("price");
        var quantity = parseInt(prompt("Enter quantity for " + items.find(item => item.id === itemId).name + ":"));
        if (!isNaN(quantity) && quantity > 0) {
            selectedItems.push({ id: itemId, price: itemPrice, quantity: quantity });
            alert("Added " + quantity + " " + items.find(item => item.id === itemId).name + " to your cart.");
        } else {
            alert("Invalid quantity.");
        }
    });

    // Event listener for place all orders button click
    $(document).on("click", "#placeAllOrdersBtn", function() {
        if (selectedItems.length === 0) {
            alert("No items selected.");
        } else {
            // Calculate total cost and gather selected items
            var totalCost = 0;
            var selectedItemsText = "";
            selectedItems.forEach(function(item) {
                totalCost += item.price * item.quantity;
                selectedItemsText += item.quantity + " " + items.find(i => i.id === item.id).name + "(s)\n";
            });
            // Place orders
            if (confirm("Are you sure you want to place orders for the following items?\n\n" + selectedItemsText + "\nTotal Cost: $" + totalCost.toFixed(2))) {
                // Clear selected items after placing all orders
                selectedItems = [];
                alert("Orders placed successfully. Thank you!");
            }
        }
    });

// Event listener for search input
$("#search").on("keyup", function() {
    var query = $(this).val().toLowerCase();
    var filteredItems = items.filter(item => item.name.toLowerCase().includes(query));
    displayItems(filteredItems); // Update item list
});


   // Function to display items
function displayItems(items) {
    var itemList = $("#itemContainer"); // Changed selector to match your HTML
    itemList.empty();
    items.forEach(function(item) {
        var listItem = $("<div>").addClass("item-container").append($("<a>").attr("href", "#").data("id", item.id).html(`<img src="${item.images[0]}" class="item-image" alt="${item.name}"><div class="item-details"><h2 class="item-title">${item.name}</h2><p class="item-price">$${item.price.toFixed(2)}</p></div></a>`));
        itemList.append(listItem);
    });
}


    // Initial display of items
    displayItems(items);

    // Event listener for back button click
    $(document).on("click", ".ui-btn-back", function() {
        $("#itemDetails").empty();
    });

    // Event listener for back button click on itemPage
    $(document).on("pagehide", "#itemPage", function(){
        $("#itemDetails").empty(); // Clear the item details when navigating away from itemPage
    });    
});

