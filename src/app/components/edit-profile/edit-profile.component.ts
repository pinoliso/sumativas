import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { JsonService } from '../../services/json.service'

/**
 * @description
 * 
 * Componente encargado de cambiar la información del usuario
 */

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
  providers: [JsonService]
})
export class EditProfileComponent {

  registerForm: FormGroup
  submitted = false
  registerFailed: string = ''
  registerApproved: string = ''

  constructor(private authService: AuthService, private fb: FormBuilder, private jsonService: JsonService) {
    const user = this.authService.getUser()
    this.registerForm = this.fb.group({
      email: [user?.email, [Validators.required, Validators.email]],
      name: [user?.name, Validators.required],
      birthdate: [user?.birthdate, [Validators.required, this.minimumAgeValidator]],
    })
  }

  onSubmit() {
    this.submitted = true;
    this.registerFailed = ''
    this.registerApproved = ''
    if (this.registerForm.valid) {
      console.log('onsubmit')
      const { email, name, birthdate } = this.registerForm.value
      const user = this.authService.getUser()

      user.email = email
      user.name = name
      user.birthdate = birthdate
      this.authService.setUser(user)
      this.jsonService.setUser(user)
      this.registerApproved = 'Se ha actualizado el perfil exitosamente'
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
