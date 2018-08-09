$(function () {
    $(".eat-burger").on("click", function (event) {
        var id = $(this).data("id");
        var eatBurger = {
            eaten: true
        };

        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: eatBurger
        }).then(
            function () {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
    $(".create-burger").on("submit", function (event) {
        event.preventDefault();
        var burgerName = $("#burger").val().trim();
        var newBurger = {
            name: burgerName,
            eaten: true
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});