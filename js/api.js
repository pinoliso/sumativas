document.addEventListener('DOMContentLoaded', function() {

    function iniciarSesion(loginUser) {

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuario = usuarios.find(user => user.email === loginUser.email && user.password === loginUser.password)
        if (usuario) {
          console.log('Inicio de sesión exitoso:', usuario)
          return true
        } else {
          console.log('Email/Usuario o contraseña incorrectos.')
          return false
        }
    }

    // window.registrarUsuario = registrarUsuario;
    window.iniciarSesion = iniciarSesion;

})