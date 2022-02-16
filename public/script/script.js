
$(".hide-pass").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $(".password-hide");
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

function showUsers(){
    $.ajax({
        type: "get",
        url: "/auth/showUsers",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result){
            console.log(result);
        }
    });
}

