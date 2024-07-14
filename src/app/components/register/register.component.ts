import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JsonService } from '../../services/json.service';
import { User } from '../../models/user'

/**
 * @description
 * 
 * Componente que registra un nuevo usuario
 */

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
  registerApproved: string = ''
  submitted = false;

  constructor(private fb: FormBuilder, private jsonService: JsonService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, this.passwordValidator]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      birthdate: ['', [Validators.required, this.minimumAgeValidator]]
    });
  }

  ngOnInit(): void {}

  

  async registrarUsuario(email: string, name: string, password: string, birthdate: Date) {

    let users = await this.jsonService.getUsers()
    const user = users.find((u: any) => u.email === email)
    if (user) {
      this.registerFailed = 'El usuario ya existe.'
      return false
    }
    const newUser: User = { email, name, password, birthdate, balance: 0, transactions: [], payments: [] }
    users.push(newUser)
    await this.jsonService.setUsers(users)
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
    this.registerFailed = '';
    this.submitted = true;
    if (this.registerForm.valid) {
      const { email, name, password, repeatPassword, birthdate } = this.registerForm.value;
      if (password !== repeatPassword) {
        this.registerFailed = 'Las contraseñas no coinciden.';
        return;
      }
      const registroExitoso = await this.registrarUsuario(email, name, password, birthdate);
      if (registroExitoso) {
        this.registerApproved = 'Se ha registrado exitosamente.'
        this.registerForm.reset();
        this.submitted = false;
      }
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    if (!value) {
      return null
    }

    const hasMinimumLength = value.length >= 8
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasDigit = /\d/.test(value)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)

    const isValid = hasMinimumLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar

    return isValid ? null : {
      passwordStrength: {
        hasMinimumLength,
        hasUpperCase,
        hasLowerCase,
        hasDigit,
        hasSpecialChar
      }
    }
  }

  minimumAgeValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const currentDate = new Date();
    const minDate = new Date();
    const minAge = 16;
    minDate.setFullYear(currentDate.getFullYear() - minAge);

    if (inputDate > minDate) {
      return { minimumAge: { requiredAge: minAge, actualAge: inputDate } };
    }
    return null;
  }
}