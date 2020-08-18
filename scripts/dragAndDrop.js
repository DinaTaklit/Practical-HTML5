function addDnDHandlers() {

    var coffeeimages = document.getElementsByClassName("productarticlewide");
    var shoppingCartDropzone = document.getElementById("shoppingcart");
    var shoppingcart = document.querySelectorAll("#shoppingcart ul")[0];

    // Crate a Cart array that will hold all the carts
    var Cart = (function () {
        this.coffees = new Array();
    });
    // Create a coffe object that will hold the coffee
    var Coffee = (function (id, price) {
        this.coffeeId = id;
        this.price = price;
    });

    // Get the current Cart 
    var currentCart = null;

    currentCart = JSON.parse(localStorage.getItem('cart'));
    if (!currentCart) {
        createEmptyCart();
    }

    UpdateShoppingCartUI(); // Update Shopping Cart UI 
    currentCart.addCoffee = function (coffee) {
        currentCart.coffees.push(coffee); // add the new coffee to the currentCart array

        // insert the new cart into the storage as string
        localStorage.setItem('cart', JSON.stringify(currentCart));

    }

    for (var i = 0; i < coffeeimages.length; i++) {
        coffeeimages[i].addEventListener("dragstart", function (ev) {
            ev.dataTransfer.effectAllowed = 'copy';
            ev.dataTransfer.setData("Text", this.getAttribute("id"));
        }, false);
    }

    shoppingCartDropzone.addEventListener("dragover", function (ev) {
        if (ev.preventDefault)
            ev.preventDefault();
        ev.dataTransfer.dropEffect = "copy";
        return false;
    }, false);

    shoppingCartDropzone.addEventListener("drop", function (ev) {
        if (ev.stopPropagation)
            ev.stopPropagation();

        var coffeeId = ev.dataTransfer.getData("Text");
        var element = document.getElementById(coffeeId);

        addCoffeeToShoppingCart(element, coffeeId);
        ev.stopPropagation();

        return false;
    }, false);

    // Add the coffee to the shopping Cart array
    function addCoffeeToShoppingCart(item, id) {
        var price = item.getAttribute("data-price");

        var coffee = new Coffee(id, price); // Create new coffee
        currentCart.addCoffee(coffee); // add it to the current Cart array

        UpdateShoppingCartUI(); // update the Shopping Cart UI
    }

    // Create and empty card object
    function createEmptyCart() {
        localStorage.clear();
        localStorage.setItem("cart", JSON.stringify(new Cart()));
        currentCart = JSON.parse(localStorage.getItem("cart"));
    }
    // Update Shopping Cart UI function
    function UpdateShoppingCartUI() {

        shoppingcart.innerHTML = ""; // create new html element
        for (var i = 0; i < currentCart.coffees.length; i++) { // Create list of element andd add them to the chopping cart element
            var liElement = document.createElement('li');
            liElement.innerHTML = currentCart.coffees[i].coffeeId + " " + currentCart.coffees[i].price;
            shoppingcart.appendChild(liElement);
        }
    };
}