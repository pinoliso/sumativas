document.addEventListener('DOMContentLoaded', function() {

    const formLogin = document.querySelector(".needs-validation");
  
    formLogin.addEventListener('submit', function(event) {
        
        event.preventDefault();
        event.stopPropagation();
  
        if (formLogin.checkValidity()) {
          const loginAdmin = { 
              email: document.querySelector('#email').value,
              password: document.querySelector('#password').value
          };
      
          if (window.iniciarSesionAdmin(loginAdmin)) {
            console.log('Inicio de sesión exitoso:');
            document.location.href = 'admin.html';
          } else {
            console.log('Error en el inicio de sesión.');
            alert('Correo y contraseñas no válidos.', 'alert-danger')
          }
          formLogin.classList.remove("was-validated")
        }else {
          event.preventDefault();
          event.stopPropagation();
          formLogin.classList.add("was-validated");
        }
    });
  
    function alert(msg, type) {
      const div = document.createElement("div");
      div.classList.add("alert", type, "d-flex", "justify-content-between", "align-items-center");
      div.innerHTML = `${msg} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
      document.querySelector(".alert").replaceWith(div);
    }
  
  })