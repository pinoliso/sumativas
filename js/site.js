document.addEventListener('DOMContentLoaded', function() {

    const usuario = window.estaLogueado()

    if (usuario) {
        document.getElementById("menuaccount").classList.remove("d-none")
        document.querySelector("#menuaccount .saldo").innerText = "$" + usuario.saldo
    } else {
        document.getElementById("menulogin").classList.remove("d-none")
    }

})