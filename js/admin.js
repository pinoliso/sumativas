document.addEventListener('DOMContentLoaded', function() {

    document.querySelector("#signout").addEventListener("click", function () {
        window.cerrarSesionAdmin();
        document.location.href = 'loginadmin.html';
    });

    
})