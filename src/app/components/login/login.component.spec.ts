import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Solo el correo', () => {
    const email = component.registerForm.controls['email'];
    email.setValue('JGQpR@example.com');
    expect(component.registerForm.invalid).toBeTrue();
  });

  it('Correo y contraseña', () => {
    component.registerForm.controls['email'].setValue('JGQpR@example.com');
    component.registerForm.controls['password'].setValue('fe23$23eEafea');
    expect(component.registerForm.valid).toBeTrue();
  });
});
