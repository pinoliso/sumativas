document.addEventListener('DOMContentLoaded', function() {

  // window.registrarUsuario = registrarUsuario;

    function registrarUsuario(newUser) {

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        if (usuarios.find(user => user.email === newUser.email)) {
          console.log('El correo ya existe.')
          return {
            ok: false,
            msg: 'El correo ya existe.'
          }
        }

        newUser.saldo = 0

        usuarios.push(newUser)
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        console.log('Usuario registrado exitosamente.')
        return {
          ok: true,
          msg: 'Usuario registrado exitosamente.'
        }
    }
    function iniciarSesion(loginUser) {

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuario = usuarios.find(user => user.email === loginUser.email && user.password === loginUser.password)
        if (usuario) {
          console.log('Inicio de sesión exitoso:', usuario)
          localStorage.setItem('usuario', JSON.stringify(usuario))
          return true
        } else {
          console.log('Email/Usuario o contraseña incorrectos.')
          return false
        }
    }

    function iniciarSesionAdmin(loginUser) {

      const admins = [
        {email: 'admin@gmail.com', password: 'asDF12$$'},
      ]

      const admin = admins.find(user => user.email === loginUser.email && user.password === loginUser.password)
      if (admin) {
        console.log('Inicio de sesión exitoso:', admin)
        localStorage.setItem('admin', JSON.stringify(admin))
        return true
      } else {
        console.log('Email/Admin o contraseña incorrectos.')
        return false
      }
  }

    function cargarSaldo(cargo) {
      const usuario = estaLogueado()
      if (usuario) {
        usuario.saldo += parseInt(cargo.amount)
        localStorage.setItem('usuario', JSON.stringify(usuario))
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
        usuarios.forEach((usuarioi, i) => {
          if(usuarioi.email === usuario.email)
            usuarios[i].saldo += usuario.saldo
        });
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        return true
      } else {
        return false
      }
    }

    function cobroJuego(idJuego) {
      const juegos = getJuegos()
      const usuario = estaLogueado()
      const juego = juegos.find(juego => juego.id === idJuego)
      if (usuario && juego) {
        usuario.saldo -= parseInt(juego.precio)
        localStorage.setItem('usuario', JSON.stringify(usuario))
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
        usuarios.forEach((usuarioi, i) => {
          if(usuarioi.email === usuario.email)
            usuarios[i].saldo -= usuario.saldo
        });
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        return true
      } else {
        return false
      }
    }

    function cambiarPassword(passwords) {
      const usuario = estaLogueado()
      if (usuario) {
        if (passwords.newPassword === passwords.confirmNewPassword) {
          usuario.password = passwords.newPassword
          localStorage.setItem('usuario', JSON.stringify(usuario))
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }

    function cerrarSesion() {
      localStorage.removeItem('usuario')
    }

    function cerrarSesionAdmin() {
      localStorage.removeItem('admin')
    }

    function estaLogueado() {
      return JSON.parse(localStorage.getItem('usuario')) || false
    }

    function estaLogueadoAdmin() {
      return JSON.parse(localStorage.getItem('admin')) || false
    }

    function getJuegos() {
        return [
          {
              id: 1,  
              nombre: "Poker",   
              imagen: "assets/poker.webp",
              precio: 1200
          },
          {
              id: 2,  
              nombre: "Black Jack",   
              imagen: "assets/blackjack.webp",
              precio: 1000
          },
          {
              id: 3,  
              nombre: "Baccarat",   
              imagen: "assets/baccarat.webp",
              precio: 1100
          }
      ]
    }

    window.cobroJuego = cobroJuego
    window.cerrarSesionAdmin = cerrarSesionAdmin
    window.estaLogueadoAdmin = estaLogueadoAdmin
    window.iniciarSesionAdmin = iniciarSesionAdmin
    window.cerrarSesion = cerrarSesion
    window.cambiarPassword = cambiarPassword
    window.cargarSaldo = cargarSaldo
    window.registrarUsuario = registrarUsuario
    window.iniciarSesion = iniciarSesion
    window.estaLogueado = estaLogueado
    window.getJuegos = getJuegos

})