$(document).ready(function() {
    $('form').submit(function(event) {
        
        // Valdiacion Email
        var email = $('#email').val();
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test(email)) {
            alert('Correo electrónico no válido.');
            event.preventDefault();
        }

        // Valdacion Password

        var password = $('#password').val();
        var passwordRegex = /^[A-Z]{1}[a-zA-Z0-9]{2,14}$/;

        if (!passwordRegex.test(password)) {
            alert('Contraseña no válida');
            event.preventDefault();
        }

        //Validacion Nombre

        var nombre = $('#nombre').val();
        var nombreRegex = /^[A-Z]{1}[a-zA-Z]{2,30}$/;

        if (!nombreRegex.test(nombre)) {
            alert('Por favor entre un nombre de usuario válido');
            event.preventDefault();
        }

        // Validacion Primer Apellido

        var apellido = $('#primerapellido').val();
        var apellidoRegex = /^[A-Z]{1}[a-zA-Z]{2,30}$/;

        if (!apellidoRegex.test(apellido)) {
            alert('Por favor entre un nombre de usuario válido');
            event.preventDefault();
        }

    });
});

