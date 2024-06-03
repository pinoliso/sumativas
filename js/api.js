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

    function estaLogueado() {
      // localStorage.setItem('usuario', JSON.stringify({saldo: 25500}))
      return JSON.parse(localStorage.getItem('usuario')) || false
    }

    function getJuegos() {
        return [
          {
              id: 1,  
              nombre: "Black Jack",   
              imagen: "assets/blackjack.webp",
              precio: 1000
          },
          {
              id: 2,  
              nombre: "Poker",   
              imagen: "assets/poker.webp",
              precio: 1200
          },
          {
              id: 3,  
              nombre: "Baccarat",   
              imagen: "assets/baccarat.webp",
              precio: 1500
          }
      ]
    }

    // window.registrarUsuario = registrarUsuario;
    window.iniciarSesion = iniciarSesion
    window.estaLogueado = estaLogueado
    window.getJuegos = getJuegos

})