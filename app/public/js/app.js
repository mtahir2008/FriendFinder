$(document).ready(function () {

    // event listener for clicking close button on modal
    document.querySelector(".close").addEventListener("click", function () {
        document.querySelector(".bg-modal").style.display = "none";
    });

    // event listener for submit button on survey page
    $("#add-btn").on("click", function (event) {
        // console.log("button clicked");
        event.preventDefault();

        // validate if all qions have been answered
        var valid = true;

        if ($("#name").val() === "" || $("#photo").val === "") {
            valid = false;
        } else if ($("#q1").val() === "" || $("q2").val() === "" ||
            $("q3").val() === "" || $("q4").val() === "" ||
            $("q5").val() === "" || $("q6").val() === "" ||
            $("q7").val() === "" || $("q8").val() === "" ||
            $("q9").val() === "" || $("q10").val() === "") {
            valid = false;
        };

        if (valid === true) {
            var newUser = {
                name: $("#name").val().trim(),
                photo: $("#photo").val().trim(),
                scores: [
                    $("#q1").val(),
                    $("#q2").val(),
                    $("#q3").val(),
                    $("#q4").val(),
                    $("#q5").val(),
                    $("#q6").val(),
                    $("#q7").val(),
                    $("#q8").val(),
                    $("#q9").val(),
                    $("#q10").val()
                ]
            };
            console.log(newUser.name);

            var currentURL = window.location.origin;
            //AJAX posts the data to friends API.
            $.post(currentURL + "/api/friends", newUser, function(data) {
                //Grab the result from the AJAX post so that the best match's name and photo are displayed.
                $("#friendName").text(data.name);
                $("#friendPhoto").attr("src", data.photo);
            });
            // Show the modal with the best match
                $('.frinedModal').modal();
        } else {
            alert("Please enter missing information before submitting survey.")
        }
        return false;
    });

})