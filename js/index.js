
// =======================  MOSTRAR CONTRASEÑA ====================================================
function mostrarContrasena() {
    var tipo = document.getElementById("passwordRegistro");
    if (tipo.type == "password") {
        tipo.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        tipo.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}
function mostrarContrasenaConfirm() {
    var tipo = document.getElementById("passwordRegistroConfirm");
    if (tipo.type == "password") {
        tipo.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        tipo.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}
// ======================= FIN MOSTRAR CONTRASEÑA ====================================================

// ====================== CREACION DE CUENTA =========================================================
function grabarClick() {
    $('form[id="registro"]').validate({
        rules: {
            convenioRegistro: {
                required: true,
            },
            nombre: {
                required: true,
                maxlength: 20,
            },
            apellidos: {
                required: true,
                maxlength: 20,
            },
            emailRegistro: {
                required: true,
                email: true,
            },
            emailRegistroConfirm: {
                required: true,
                email: true,
                equalTo: "#emailRegistro"
            },
            telefono: {
                required: true,
                regex: true,
                maxlength: 20,
            },
            ciudadNombreRegistro: {
                required: true,
            },
            direccion: {
                required: true,
                maxlength: 100,
            },
            AsesorID: {
                required: true,
            },
            tipoDoc: {
                required: true,
            },
            paisRegistro: {
                required: true,
            },
            estadoRegistro: {
                required: true,
            },
            ciudadRegistro: {
                required: true,
            },
            documento: {
                required: true,
            },
            cpostal: {
                required: true,
            },
            passwordRegistro: {
                required: true,
                maxlength: 50,
                minlength: 5
            },
            accountTipoIdentificacion: {
                required: true,
            },
            passwordRegistroConfirm: {
                required: true,
                maxlength: 50,
                equalTo: "#passwordRegistro",
                minlength: 5
            },
            "checkbox[]": {
                required: true,
                minlength: 1
            }

        },
        messages: {
            nombre: 'El campo es requerido',
            apellidos: 'El campo es requerido',
            emailRegistro: 'Ingrese un email valido',
            emailRegistroConfirm: 'El correo no coincide',
            telefono: 'Ingrese un teléfono valido',
            ciudadNombreRegistro: 'El campo es requerido',
            direccion: 'El campo es requerido',
            AsesorID: 'El campo es requerido',
            tipoDoc: 'El campo es requerido',
            documento: 'El campo es requerido',
            cpostal: 'El campo es requerido',
            passwordRegistro: 'Contraseña minimo 6 caracteres',
            "checkbox[]": 'Valide las condiciones'

        },
        submitHandler: function (form) {
            var datos = {
                ConvenioCta: $("#convenioRegistro").val(),
                Documento: $("#documento").val(),
                Empresa: $("#empresa").val(),
                Nombre: $("#nombre").val() + " " + $("#apellidos").val(),
                Direccion: $("#direccion").val(),
                CiudadId: $("#ciudadIdRegistro").val(),
                CodigoPostal: $("#cpostal").val(),
                Telefono: $("#telefono").val(),
                Password: $("#passwordRegistro").val(),
                EMail: $("#emailRegistro").val(),
                Asesor: $("#AsesorID").val(),
                TicketId: $("#ticketId").val()
            };
            fivepaq.CuentaAdd(datos.ConvenioCta, datos.Documento, datos.Empresa, datos.Nombre, datos.Direccion, datos.CiudadId, datos.CodigoPostal, datos.Telefono, datos.Password, datos.EMail, datos.Asesor, datos.TicketId);
        }
    });

    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );
    $("#telefono").rules("add", { regex: "^\\d{1,20}$" })
    $("#cpostal").rules("add", { regex: "^\\d{1,10}$" })
}

function getUrlTicket() {
    var url = "https://fpaq.azurewebsites.net/api/Tickets/";
    url += $("#ticket").val();
    debugger;
    return url;
}

function getTicket() {
    $.ajax({
        url: getUrlTicket(),
        type: 'GET',
        success: function (resultado) {
            if (resultado != null) {
                console.log(resultado.TicketId);
                debugger;
                $('#ticketId').val(resultado.TicketId);
                $("#ticketLabel").val("");
                $("#ticketLabel").hide();
            } else {
                debugger;
                $("#ticketLabel").text("No existe este Código");
                $("#ticketLabel").show();
                $("#ticketId").val("");
            }
        },
        error: function (request, message, error) {
            debugger;
            handleException(request, message, error);
        }
    });
}

function limpiarRegistro() {
    $("#convenioRegistro").val('');
    $("#nombre").val('');
    $("#apellidos").val('');
    $("#emailRegistro").val('');
    $("#telefono").val('');
    $("#ciudadIdRegistro").val('');
    $("#pais").val('');
    $("#estado").val('');
    $("#ciudad").val('');
    $("#direccion").val('');
    $("#AsesorID").val('');
    $("#tipoDoc").val('');
    $("#documento").val('');
    $("#empresa").val('');
    $("#cpostal").val('');
    $("#passwordRegistro").val('');
    $("#ticket").val('');
    $("#ticketLabel").val('');
    $("#ticketId").val('');
}

function CuentaSuccess(noCuenta) {
    if (noCuenta.Error != null) {
        swal("¡ha ocurrido un error! ", noCuenta.Error.ErrorMessage, "error");
        obtenerPaises();
    } else {
        limpiarRegistro();
        swal("¡Ya eres un CurrierExpress! ", "Tu casillero es: " + noCuenta.noCuenta, "success").then((value) => {
            if (value) {
                debugger;
                location.href = "index.html";
            }
        });;
        obtenerPaises();
    }

}

function handleException(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message" + request.responseJSON.Message + "\n";
    }
    swal("¡ha ocurrido un error! ", "por favor comunique con nosotros al Email: soporte@Fivepaq.com ", "error");
}
// ====================== FIN CREACION DE CUENTA =========================================================