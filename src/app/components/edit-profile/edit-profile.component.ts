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

  registerForm: FormGroup
  submitted = false
  registerFailed: string = ''
  registerApproved: string = ''

  constructor(private authService: AuthService, private fb: FormBuilder) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log('onsubmit')
      const { email, name, birthdate } = this.registerForm.value
      const user = this.authService.getUser()

      user.email = email
      user.name = name
      user.birthdate = birthdate
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

}
