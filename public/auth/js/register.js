var input = $('.validate-input .input100');

$('.register-button').on('click', function ( event ) {
    event.preventDefault();
    var check = true;
    for (var i = 0; i < input.length; i++) {
        if (register(input[i]) == false) {
            check = false;
        }
    }
    var checkbox = document.getElementById("formAgreement");
    hideValidate(checkbox);
    if (checkbox.getAttribute("type") === "checkbox" && checkbox.checked === false) {
        showValidate(checkbox, "Галочку поставь, гнида");
        check = false;
    }
    if (check == false) {
        return;
    }
    else {
        var data = {
            username: $('#register-username').val(),
            email: $('#register-email').val(),
            password: $('#register-password').val()
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/user/register',
            statusCode: {
                200: function() {
                    // console.log(jqXHR)
                    // const error = JSON.parse(jqXHR);
                    $('.error').remove();
                    $('.container-login100-form-btn').before($('<div>', {class: 'success', 'text':'Регистрация прошла успешно!'}));
                    setTimeout(() => {
                        $('.success').remove();
                        window.location.href = "/user/login";
                    }, 2500);
                },
                400: function(jqXHR) {
                    const error = JSON.parse(jqXHR.responseText);
                    console.log(error);
                    $('.error').remove();
                    $('.container-login100-form-btn').before($('<div>', {class: 'error', 'text':error.message}));
                    // $('.login100-form-title').parent().append($('<div>', {'text':error.message}));
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

function register(input) {
    if ($(input).attr('name') == 'name') {
        if ($(input).val().trim() == "") {
            showValidate(input, "Введите имя");
            return false;
        }
    }
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if ($(input).val().trim() == "") {
            showValidate(input, "Введите Email");
            return false;
        }
        if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(input, "Неверный Email");
            return false;
        }
    }
    if ($(input).attr('type') == 'password' || $(input).attr('name') == 'password') {
        if ($(input).val().trim() == "") {
            showValidate(input, "Введите пароль");
            return false;
        }
        if ($(input).val().trim().length < 6) {
            showValidate(input, "Длина пароля не менее 6 символов");
            return false;
        }
    }
}

function showValidate(input, message) {
    var thisAlert = $(input).parent();
    $(thisAlert).addClass('alert-validate');
    $(thisAlert).attr("data-validate", message);
}

function hideValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass('alert-validate');
}
