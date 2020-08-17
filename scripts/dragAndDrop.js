﻿function addDnDHandlers() {

    var coffeeimages = document.getElementsByClassName("productarticlewide");
    var shoppingCartDropzone = document.getElementById("shoppingcart");

    //initialize the cart
    var shoppingcart = document.querySelectorAll("#shoppingcart ul")[0];

    for (var i = 0; i < coffeeimages.length; i++) {
        coffeeimages[i].addEventListener("dragstart", function (ev) {
            /** Add dragstart event**/
            ev.dataTransfer.effectAllowed = 'copy';
            ev.dataTransfer.setData("Text", this.getAttribute("id"));
        }, false);
    }

    shoppingCartDropzone.addEventListener("dragover", function (ev) {
        /** add dragover event **/
        if (ev.preventDefault)
            ev.preventDefault();
        ev.dataTransfer.dropEffect = "copy";
        return false;
    }, false);

    shoppingCartDropzone.addEventListener("drop", function (ev) {
        /** add drop event **/

        if (ev.stopPropagation)
            ev.stopPropagation();

        var coffeeId = ev.dataTransfer.getData("Text");
        var element = document.getElementById(coffeeId);

        addCoffeeToShoppingCart(element, coffeeId);
        ev.stopPropagation();

        return false;
    }, false);

    function addCoffeeToShoppingCart(item, id) {
        var html = id + " " + item.getAttribute("data-price");

        var liElement = document.createElement('li');
        liElement.innerHTML = html;
        shoppingcart.appendChild(liElement);
    }
}