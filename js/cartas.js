document.addEventListener('DOMContentLoaded', function() {

    const juegos = window.getJuegos()

    function jugar() {

        const usuario = window.estaLogueado()

        if (usuario) {
            document.querySelector("[juego=1]")
        } else {
            
        }
    }

    document.querySelectorAll("[juego]").forEach(link => {
        link.addEventListener('click', e => {
            console.log(e.target.getAttribute('juego'))
        })
    })

})