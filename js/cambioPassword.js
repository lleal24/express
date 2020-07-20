$(document).ready(function () {
    $('.ojo').append('<span class="ptxt">Mostrar</span>');
});

$(document).on('click', '.ojo .ptxt', function () {
    debugger;

    $(this).text($(this).text() == "Ocultar" ? "Mostrar" : "Ocultar");

    $(this).prev().attr('type', function (index, attr) {
        return attr == 'password' ? 'text' : 'password';
    });

});

function cambioPass() {
    $('form[id="cambioContrasena"]').validate({

        rules: {
            OldPassword: {
                required: true,
                maxlength: 50,
            },
            NewPassword: {
                required: true
            },
            ConfirmPassword: {
                required: true,
                maxlength: 50,
                equalTo: "#NewPassword",
            }
        },
        messages: {
            OldPassword: 'El campo es requerido',
            //NewPassword: 'Contraseña minimo 6 caracteres',
        },
        submitHandler: function (form) {

            var datos = {
                OldPassword: $("#OldPassword").val(),
                NewPassword: $("#NewPassword").val(),
                ConfirmPassword: $("#ConfirmPassword").val(),
            }
            fivepaq.changePass(datos.OldPassword, datos.NewPassword);

        }
    });
    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "La contraseña no cumple con los requerimientos minimos"
    );
    $("#NewPassword").rules("add", { regex: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,16}$/})


}