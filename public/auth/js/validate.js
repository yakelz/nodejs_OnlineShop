$('.validate-form').validate({
    rules: {
        name:{
            required:true,
        },
        email: {
            required:true,
            email:true
        },
        password: {
            required:true,
            minlength:6
        }
    },
    massages: {
        name:{
            required: 'Имя обязательно для заполнения',
        },
        email:{
            required: 'Email обязателен для заполнения',
            email: 'Неверно введен Email'
        },
        password: {
            required:'Пароль обязателен для заполнения',
            minlength: 'Длина пароля не менее 6 символов'
        }
    } ,
    errorPlacement: function (error, element) {
        console.log(error.text());
        element.parent().attr('class','alert-validate');
        element.parent().attr('data-validate', `${error.text()}`);
        // .atrr("data-validate", `${error.text()}`);
    }
})