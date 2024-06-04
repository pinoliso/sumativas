document.addEventListener('DOMContentLoaded', function() {

    const usuario = window.estaLogueado()

    if (!usuario) 
        document.location.href = 'login.html'

    const formSaldo = document.querySelector("#form-saldo");

    formSaldo.addEventListener('submit', function(event) {
        
        event.preventDefault();
        event.stopPropagation();

        if (formSaldo.checkValidity()) {
            const cargo = { 
                creditCard: document.querySelector('#creditCard').value,
                amount: document.querySelector('#amount').value
            }
        
            if (window.cargarSaldo(cargo)) {
                const usuarioCargado = window.estaLogueado()
                document.querySelector("#menuaccount .saldo").innerText = "$" + usuarioCargado.saldo
                alert('Se ha cargado correctamente su saldo de $' + cargo.amount + '.', 'alert-success', '#alert-saldo')
            } else {
                alert('Hubo un problema al cargar su saldo.', 'alert-danger', '#alert-saldo')
            }
            formSaldo.classList.remove("was-validated")
        }else {
            event.preventDefault();
            event.stopPropagation();
            formSaldo.classList.add("was-validated");
        }
    });

    const formPassword = document.querySelector("#form-password");

    formPassword.addEventListener('submit', function(event) {
        
        event.preventDefault();
        event.stopPropagation();

        if (formPassword.checkValidity()) {

            if(!validarPassword()) {
                return false
              }
        
              if(!validarConfirmacion()) {
                return false
              }

            const passwords = { 
                currentPassword: document.querySelector('#currentPassword').value,
                newPassword: document.querySelector('#newPassword').value,
                confirmNewPassword: document.querySelector('#confirmNewPassword').value
            }
        
            if (window.cambiarPassword(passwords)) {
                alert('Se ha cambiado correctamente su password.', 'alert-success', '#alert-password')
            } else {
                alert('Hubo un problema al cambiar su password.', 'alert-danger', '#alert-password')
            }
            formPassword.classList.remove("was-validated")
        }else {
            event.preventDefault();
            event.stopPropagation();
            formPassword.classList.add("was-validated");
        }
    });

    document.querySelector("#signout").addEventListener("click", function () {
        window.cerrarSesion();
        document.location.href = 'login.html';
    });

    function validarPassword() {

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    
        if(!passwordRegex.test(document.querySelector("#newPassword").value)) {
          alert("La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un caracter especial", 'alert-danger', '#alert-password')
          return false
        }else {
          return true
        }
      }
    
      function validarConfirmacion() {
        if(document.querySelector("#newPassword").value !== document.querySelector("#confirmNewPassword").value) {
          alert("Las contraseñas no coinciden", 'alert-danger', '#alert-password')
          return false
        }else {
          return true
        }
      }

    function alert(msg, type, id) {
        const div = document.createElement("div");
        div.classList.add("alert", type, "d-flex", "justify-content-between", "align-items-center");
        div.innerHTML = `${msg} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
        document.querySelector(id).after(div);
    }

})