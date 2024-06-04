document.addEventListener("DOMContentLoaded", function () {
  
  const formLogin = document.querySelector(".needs-validation");

  formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();


    if (formLogin.checkValidity()) {

      if(!validarPassword()) {
        return false
      }

      if(!validarConfirmacion()) {
        return false
      }

      const newUser = {
        email: document.querySelector("#email").value,  
        fullname: document.querySelector("#fullName").value,
        password: document.querySelector("#password").value
      }

      const response = window.registrarUsuario(newUser)
      
      if(response.ok) {
        alert(response.msg, 'alert-success')
      }else {
        alert(response.msg, 'alert-danger')
      }
      
      formLogin.reset();
      if(formLogin.classList.contains("was-validated"))
        formLogin.classList.remove("was-validated")
    }else {
      event.preventDefault();
      event.stopPropagation();
      formLogin.classList.add("was-validated");
    }
    
  });

  function validarPassword() {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if(!passwordRegex.test(document.querySelector("#password").value)) {
      alert("La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un caracter especial", 'alert-danger')
      return false
    }else {
      return true
    }
  }

  function validarConfirmacion() {
    if(document.querySelector("#password").value !== document.querySelector("#confirmPassword").value) {
      alert("Las contraseñas no coinciden", 'alert-danger')
      return false
    }else {
      return true
    }
  }

  function alert(msg, type) {
    const div = document.createElement("div");
    div.classList.add("alert", type, "d-flex", "justify-content-between", "align-items-center");
    div.innerHTML = `${msg} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    document.querySelector(".alert").after(div);
  }

  document.getElementById("form-reset").addEventListener("click", function () {
    formLogin.reset();
  });
});
