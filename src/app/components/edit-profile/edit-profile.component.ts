import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  amounts: Number[] = [20000, 50000, 100000]
  loginFailed: Boolean = false
  registerForm: FormGroup
  submitted = false
  registerFailed: string = ''
  registerApproved: string = ''

  constructor(private authService: AuthService, private fb: FormBuilder) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log('onsubmit')
      const { card, amount } = this.registerForm.value
      const user = this.authService.getUser()

      user.balance += parseInt(amount)
      user.transaccions.push({
        card: card,
        amount: parseInt(amount),
        date: new Date()
      })
      this.authService.setUser(user)
      // if (password !== repeatPassword) {
      //   this.registerFailed = 'Las contraseñas no coinciden.'
      //   return;
      // }
      // const registroExitoso = await this.registrarUsuario(email, name, password, birthdate)
      // if (registroExitoso) {
      //   this.registerForm.reset();
      //   this.submitted = false;
      // }
    }
  }

  formatCurrency(value: Number): String {
    return '$ ' + value.toLocaleString('es-ES', { minimumFractionDigits: 0 });
  }

  cardNumberValidator(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    let sum = 0;
    let shouldDouble = false;
    for (let i = value.length - 1; i >= 0; i--) {
      let digit = parseInt(value.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    if (sum % 10 !== 0) {
      return { 'invalidCardNumber': true };
    }
    return null;
  }

}
