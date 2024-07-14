import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { JsonService } from '../../services/json.service';

/**
 * @description
 * 
 * Componente que permite recuperar la contraseña de un usuario
 */

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css'],
  providers: [JsonService]
})

export class RecoveryComponent {

  registerForm: FormGroup
  submitted = false
  registerFailed: string = ''
  registerApproved: string = ''

  constructor(private router: Router, private fb: FormBuilder, private jsonService: JsonService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }
 
  async onSubmit() {
    this.submitted = true;
    this.registerApproved = ''
    this.registerFailed = ''
    if (this.registerForm.valid) {
      console.log('onsubmit')
      const { email } = this.registerForm.value
      const users = await this.jsonService.getUsers()
      if(users.find((user: any) => user.email === email)) {
        this.registerApproved = 'Se ha enviado un correo electronico a ' + email
        this.submitted = false
        this.registerForm.reset();
      }else {
        this.registerFailed = 'El correo electronico no se encuentra registrado'
      }
    }else {
      this.registerFailed = 'Corregir los datos solicitados'
    }
  }
}