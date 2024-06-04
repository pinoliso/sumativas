document.addEventListener('DOMContentLoaded', function() {

    const juegos = window.getJuegos()

    document.querySelector("#juego1").addEventListener('click', () => {
        cobrarJuego(1)
    })

    document.querySelector("#juego2").addEventListener('click', () => {
        cobrarJuego(2)
    })

    document.querySelector("#juego3").addEventListener('click', () => {
        cobrarJuego(3)
    })

    function cobrarJuego(idJuego) {
        if (window.cobroJuego(idJuego)) {
            const usuarioCargado = window.estaLogueado()
            document.querySelector("#menuaccount .saldo").innerText = "$" + usuarioCargado.saldo
            alert('Se ha habilitado para jugar', 'alert-success')
            setTimeout(() => {
                document.location.href = 'blackjack.html'
            }, 2000)
        } else {
            alert('Hubo un problema al cargar su saldo.', 'alert-danger')
        }
    }

    function alert(msg, type) {
        const div = document.createElement("div");
        div.classList.add("alert", type, "d-flex", "justify-content-between", "align-items-center");
        div.innerHTML = `${msg} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
        document.querySelector(".alert").after(div);
      }

})