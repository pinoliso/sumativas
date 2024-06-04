document.addEventListener('DOMContentLoaded', function() {

    const admin = window.estaLogueadoAdmin()

    if (admin) {
        document.getElementById("menuaccount").classList.remove("d-none")
        document.querySelector("#menuaccount .saldo").innerText = "" + admin.email
    } else {
        document.getElementById("menulogin").classList.remove("d-none")
    }

})