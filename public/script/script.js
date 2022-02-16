
$(".hide-pass").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $(".password-hide");
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

$(".content-profile").hide()
$("#profile-content").show();

$("#profile-button").click(function () {
    $(".my-button").removeClass("button-active");
    $(this).addClass("button-active");

    $(".content-profile").hide();
    $("#profile-content").show();
});

$("#post-button").click(function () {
    $(".my-button").removeClass("button-active");
    $(this).addClass("button-active");
    $(".content-profile").hide();
    $("#post-content").show();
});

$("#manageUser-button").click(function () {
    $(".my-button").removeClass("button-active");
    $(this).addClass("button-active");
    $(".content-profile").hide();
    $("#manageUser-content").show();
});

$("#favorite-button").click(function () {
    $(".my-button").removeClass("button-active");
    $(this).addClass("button-active");
    $(".content-profile").hide();
    $("#favorite-content").show();

});



