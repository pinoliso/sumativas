import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { Modal } from 'bootstrap'
import { PaymentComponent } from '../payment/payment.component'
import { EditProfileComponent } from '../edit-profile/edit-profile.component'

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterLink, ReactiveFormsModule, PaymentComponent, EditProfileComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  amounts: Number[] = [20000, 50000, 100000]
  loginFailed: Boolean = false
  registerForm: FormGroup
  submitted = false
  registerFailed: string = ''

  constructor(private authService: AuthService, private fb: FormBuilder) {

    this.registerForm = this.fb.group({
      card: ['', [Validators.required, this.cardNumberValidator]],
      amount: ['20000', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log('onsubmit')
      const { card, amount } = this.registerForm.value
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

  openDialog(id: string): void {
    const dialogElement = document.getElementById(id)
    if (dialogElement) {
      const modal = new Modal(dialogElement)
      modal.show()
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

    // Luhn Algorithm for card number validation
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
