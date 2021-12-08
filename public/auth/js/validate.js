$('.validate-form').validate({
    onfocusout: false,
    rules: {
        name: {
            required: true,
        },
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6
        }
    },
    messages: {
        name: {
            required: "Имя обязательно для заполнения",
        },
        email: {
            required: "Email обязателен для заполнения",
            email: "Неверно введен Email"
        },
        password: {
            required: "Пароль обязателен для заполнения",
            minlength: "Длина пароля не менее 6 символов"
        }
    },
    errorPlacement: function (error, element) {
        console.log(error.text());
        element.parent().addClass('alert-validate');
        element.parent().attr('data-validate', `${error.text()}`);
        setTimeout(
            function () {
                element.parent().removeClass('alert-validate');
            }, 8000);
    }
});
