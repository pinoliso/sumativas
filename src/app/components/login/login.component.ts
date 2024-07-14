import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JsonService } from '../../services/json.service';
import { User } from '../../models/user'
import { Modal } from 'bootstrap'
import { RecoveryComponent } from '../recovery/recovery.component';

/**
 * @description
 * 
 * Componente que inicia la sesión y recupera las contraseñas
 */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RecoveryComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [JsonService]
})

export class LoginComponent {

  registerForm: FormGroup
  submitted = false
  registerFailed: string = ''
  registerApproved: string = ''

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private jsonService: JsonService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    })
  }

  openDialog(id: string): void {
    const dialogElement = document.getElementById(id)
    if (dialogElement) {
      const modal = new Modal(dialogElement)
      modal.show()
    }
  }
 
  async onSubmit() {

    this.submitted = true;
    if (this.registerForm.valid) {
      console.log('onsubmit')
      const { email, password } = this.registerForm.value
      const users = await this.jsonService.getUsers()
      if(this.authService.login(email, password, users)) { 
        this.registerApproved = 'Login exitoso'
        this.router.navigate(['/index'])
      }else {
        this.registerFailed = 'Credenciales incorrectas'
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
}