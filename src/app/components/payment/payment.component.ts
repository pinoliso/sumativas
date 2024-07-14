import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { JsonService } from '../../services/json.service'

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  providers: [JsonService]
})
export class PaymentComponent {
  
  amounts: Number[] = [20000, 50000, 100000]
  loginFailed: Boolean = false
  registerForm: FormGroup
  submitted = false
  registerFailed: string = ''
  registerApproved: string = ''

  constructor(private authService: AuthService, private fb: FormBuilder, private jsonService: JsonService) {

    this.registerForm = this.fb.group({
      card: ['', [Validators.required, this.cardNumberValidator]],
      amount: ['20000', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.registerApproved = ''
    this.registerFailed = ''
    if (this.registerForm.valid) {
      console.log('onsubmit')
      const { card, amount } = this.registerForm.value
      const user = this.authService.getUser()

      user.balance += parseInt(amount)
      user.payments.push({
        card: card,
        amount: parseInt(amount),
        date: new Date()
      })
      this.authService.setUser(user)
      this.jsonService.setUser(user)
      this.registerForm.reset({card: '', amount: 20000})
      this.submitted = false
      this.registerApproved = 'Se ha realizado el pago exitosamente'
      // if (password !== repeatPassword) {
      //   this.registerFailed = 'Las contraseñas no coinciden.'
      //   return;
      // }
      // const registroExitoso = await this.registrarUsuario(email, name, password, birthdate)
      // if (registroExitoso) {
      //   this.registerForm.reset();
      //   this.submitted = false;
      // }
    }else {
      this.registerFailed = 'Corregir los datos solicitados'
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
