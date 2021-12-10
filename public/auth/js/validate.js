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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector(".validate-form");
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
    }

    function formValidate (form) {
        var checkbox = document.getElementById("formAgreement");
        formRemoveError(checkbox);
        if (checkbox.getAttribute("type") === "checkbox" && checkbox.checked === false) {
            formAddError(checkbox);
        }
    }

    function formAddError(input) {
        input.parentElement.classList.add('alert-validate');
        input.parentElement.setAttribute("data-validate", "галочку поставь гнида");
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('alert-validate');
    }
})