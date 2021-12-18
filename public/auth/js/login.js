var input = $('.validate-input .input100');

$('.login-button').on('click', function () {
    var check = true;
    for (var i = 0; i < input.length; i++) {
        if (validate(input[i]) == false) {
            check = false;
        }
    }
    if (check == false) {
        return;
    } else {
        var data = {
            email: $('#login-email').val(),
            password: $('#login-password').val()
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/user/login',
            statusCode: {
                200: function() {
                    window.location.href = "/";
                },
                400: function(jqXHR) {
                    var error = JSON.parse(jqXHR.responseText);
                    console.log(error.message);
                    $('.error',form).html(error.message);
                }
            }
        });
        return;
    }
});


$('.validate-form .input100').each(function () {
    $(this).focus(function () {
        hideValidate(this);
    });
});

function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if ($(input).val().trim() == "") {
            showValidate(input, "Введите Email");
            return false;
        }
        if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(input, "Неверный Email");
            return false;
        }
    } else {
        if ($(input).attr('type') == 'password' || $(input).attr('name') == 'password') {
            if ($(input).val().trim() == "") {
                showValidate(input, "Введите пароль");
                return false;
            }
        }
    }
}

function showValidate(input, message) {
    var thisAlert = $(input).parent();
    $(thisAlert).addClass('alert-validate');
    $(thisAlert).attr("data-validate",message);
}

function hideValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass('alert-validate');
}
