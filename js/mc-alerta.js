function DireccionesOk(data) {
    //$('#direcciones').append('<option value='' selected>Selecciona la Dirección de Destino</option>')
    $.each(data, function (i, item) {
        $('#direcciones').append(

            '<option value="' + data[i].idLocation + '">' + data[i].direccion + '</option>'
        )

    });
}

function validarTrack() {
    debugger;
    var tracking = $('#trackingNumber').val();
    if (tracking.length < 6) {

        $('#trackingNumber').focus();

        return false;
    }
    else
        if (tracking.length > 100) {

            $('#trackingNumber').focus();
            return false;
        }
        else {
            return true;
        }
}

function validarAlerta() {
    if ($('#idCarrier').val() == "") {
        $('#idCarrier').focus();

        return false;
    }
    else
        if (!validarTrack()) {

            $('#trackingNumber').focus();
            swal(
                'el Tracking!',
                'Debe estar entre 6 a 100 digitos',
                'error'
            )

            return false;
        }
        else
            if ($('#direcciones').val() == "") {
                $('#direcciones').focus();

                return false;
            }
            else
                if ($('#destinatario').val() == "") {
                    $('#destinatario').focus();

                    return false;
                }
                else
                    if ($('#posicionArancelaria').val() == "") {
                        $('#posicionArancelaria').focus();

                        return false;
                    }
                    else
                        if ($('#descripcion').val() == "") {
                            $('#descripcion').focus();

                            return false;
                        }
                        else
                            if ($('#Valor').val() < 0.01) {
                                $('#Valor').focus();
                                return false;
                            }
    return true;
}

function limpiarAlerta() {
    $('#idCarrier').val('');
    $('#trackingNumber').val('');
    $('#direcciones').val('');
    $('#destinatario').val('');
    $('#posicionArancelaria').val('');
    $('#descripcion').val('');
    $('#Valor').val('');
    $('#fileName').attr("placeholder", "Choose a file... ")
}

function getFile() {
    document.getElementById("ImageUrl").click();
}
function quitarArchivo() {
    $('#ImageUrl').val('');
    document.getElementById("fileName").setAttribute("placeholder", "Choose a file...");
}
function validarExtencion() {
    var fileInput = (document.getElementById('ImageUrl')).value;
    var fileName = document.getElementById('ImageUrl').files[0].name;
    var extPermitidas = /(.jpg|.png|.jpeg|.gif|.pdf)$/i;
    if (!extPermitidas.exec(fileInput)) {
        console.log('Extension invalida')
        swal({
            title: 'Extension invalida!',
            text: 'Valida que el archivo sea extension .jpg, .png, .gif, .pdf',
            icon: 'error',
            confirmButtonText: 'Ok',
            type: 'error'
        })
    } else {

    }
    document.getElementById("fileName").setAttribute("placeholder", fileName);
}
function grabarAlerta() {
    debugger;
    $('form[id="formAlerta"]').validate({
        rules: {
            idCarrier: {
                required: true,
            },
            trackingNumber: {
                required: true,
                minlength: 6
            },
            direcciones: {
                required: true,
            },
            posicionArancelaria: {
                required: true,
            },
            descripcion: {
                required: true,
            },
            Valor: {
                required: true,
            }
        },
        messages: {
            idCarrier: 'El campo es requerido',
            trackingNumber: 'Campo requerido minimo 6 caracteres',
            direcciones: 'Selecciona una direccion',
            posicionArancelaria: 'Ingrese un teléfono valido',
            descripcion: 'Ingresa una pequeña descripción',
            Valor: 'El campo es requerido',

        },
        submitHandler: function (form) {
            var dataout = JSON.parse(sessionStorage.getItem('appData'));
            var fil = JSON.parse(sessionStorage.getItem('file'));
            console.log(fil);
            var datos = {
                clientID: dataout.C,
                trackingNumber: $("#trackingNumber").val(),
                idCarrier: $("#idCarrier").val(),
                idLocation: $("#direcciones").val(),
                destinatario: $("#destinatario").val(),
                TariffCode: $("#posicionArancelaria").val(),
                description: $("#descripcion").val(),
                value: $("#Valor").val().replace(",", ".")

            };

            if (document.getElementById('ImageUrl').value == "") {
                fivepaq.prealertaValue(datos.clientID,
                    datos.trackingNumber, datos.idCarrier, datos.idLocation, datos.TariffCode, datos.description, datos.value);

            } else {

                fivepaq.prealertaImage(datos.clientID,
                    datos.trackingNumber, datos.idCarrier, datos.idLocation, datos.TariffCode, datos.description);
            }
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
}
function AlertSuccessImage(response) { /* AlertSuccessValue */
    limpiarAlerta();
    swal(
        '¡Se Alerto tu paquete! \n Con el Numero: ' + response.PreAlertId + ' ¡Guardalo!',
        '¡Nosotros nos encargamos!',
        'success'
    ).then(() => {
        location.reload();
    });
}
function AlertSuccessValue(response) {
    limpiarAlerta();
    swal(
        '¡Se Alerto tu paquete! \n Con el Numero: ' + response.PreAlertId + ' ¡Guardalo!',
        '¡Nosotros nos encargamos!',
        'success'
    ).then(() => {
        location.reload();
    });
}