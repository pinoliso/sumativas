import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AdminAuthService } from '../../services/admin.auth.service';
import { JsonService } from '../../services/json.service';
import { Admin } from '../../models/admin'

/**
 * @description
 * 
 * Componente que inicia la sesión de los administradores
 */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  providers: [JsonService]
})

export class AdminLoginComponent {

  registerForm: FormGroup
  submitted = false
  registerFailed: string = ''
  registerApproved: string = ''

  constructor(private adminAuthService: AdminAuthService, private router: Router, private fb: FormBuilder, private jsonService: JsonService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    })
  }
 
  async onSubmit() {

    this.submitted = true;
    if (this.registerForm.valid) {
      console.log('onsubmit')
      const { email, password } = this.registerForm.value
      const admins = await this.jsonService.getAdmins()
      if(this.adminAuthService.login(email, password, admins)) { 
        this.registerApproved = 'Login exitoso'
        this.router.navigate(['/admin-dashboard'])
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