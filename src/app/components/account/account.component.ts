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


  constructor(public authService: AuthService) {

    
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

}
