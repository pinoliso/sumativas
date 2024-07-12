import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  registerForm: FormGroup
  submitted = false
  registerFailed: string = ''
  registerApproved: string = ''

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
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

      this.authService.login(email, password)
      this.router.navigate(['/index'])
    }

    // const ok: boolean = await this.authService.login(this.email, this.password)
    // const user = users.find((u: any) => u.email === this.email && u.password === this.password);
      // if (await this.authService.login(this.email, this.password)) {
      //   console.log('Login successful');
      //   this.loginFailed = false;
      //   this.router.navigate(['/index']);
      // } else {
      //   console.log('Login failed');
      //   this.loginFailed = true;
      // }

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