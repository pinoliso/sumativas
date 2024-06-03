document.addEventListener('DOMContentLoaded', function() {

    const formLogin = document.querySelector('.login-form form')

    formLogin.addEventListener('submit', function(event) {
        
        event.preventDefault();
        event.stopPropagation();

        const loginUser = { 
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        };
    
        if (window.iniciarSesion(loginUser)) {
          console.log('Inicio de sesión exitoso:', { emailOrUsername });
          formLogin.reset();
        } else {
          console.log('Error en el inicio de sesión.');
        }
    });

})