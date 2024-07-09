import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JsonService } from '../../services/json.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JsonService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  usuarios: any[] = [];
  registerFailed: string = ''
  submitted = false;

  constructor(private fb: FormBuilder, private jsonService: JsonService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required],
      birthdate: ['', Validators.required]
    });

    // if (typeof localStorage !== 'undefined') {
    //   const usuariosGuardados = localStorage.getItem('usuarios');
    //   this.usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
    // }
  }

  ngOnInit(): void {}

  

  async registrarUsuario(email: string, name: string, password: string, birthdate: string) {
    const users = await this.jsonService.getUsers();
    const user = users.find((u: any) => u.email === email);
    if (user) {
      this.registerFailed = 'El usuario ya existe.';
      return false;
    }

    const newUser = { email, name, password, birthdate, balance: 0 };
    users.push(newUser);
    this.jsonService.saveJsonData(users);
    alert('Usuario registrado exitosamente.');
    return true

    // this.jsonService.getJsonData().subscribe(users => {
    //   console.log(users)
    //   const user = users.find((u: any) => u.email === this.email);
    //   if (user) {
    //     console.log('Login successful');
    //     this.loginFailed = false;
    //     this.router.navigate(['/index']);
    //   } else {
    //     console.log('Login failed');
    //     this.loginFailed = true;
    //   }
    // })
    // const usuarioExistente = this.jsonService.getUserByEmail(email);
    
    // if (usuarioExistente) {
    //   this.registerFailed = 'El usuario ya existe.';
    //   return false;
    // }

    // const nuevoUsuario = { email, name, password, birthdate };
    // this.jsonService.registerUser(nuevoUsuario);
    // alert('Usuario registrado exitosamente.');
    return true;
  }

  async onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const { email, name, password, repeatPassword, birthdate } = this.registerForm.value;
      if (password !== repeatPassword) {
        this.registerFailed = 'Las contraseñas no coinciden.';
        return;
      }
      const registroExitoso = await this.registrarUsuario(email, name, password, birthdate);
      if (registroExitoso) {
        this.registerForm.reset();
        this.submitted = false;
      }
    }
  }
}