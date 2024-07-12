import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})

export class RecoveryComponent {

  registerForm: FormGroup
  submitted = false
  registerFailed: string = ''
  registerApproved: string = ''

  constructor(private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }
 
  async onSubmit() {
    // const users = await this.jsonService.getUsers()
    // const user = users.find((u: any) => u.email === this.email && u.password === this.password);
    //   if (user) {
    //     console.log('Login successful');
    //     this.loginFailed = false;
    //     this.router.navigate(['/index']);
    //   } else {
    //     console.log('Login failed');
    //     this.loginFailed = true;
    //   }

  }
}