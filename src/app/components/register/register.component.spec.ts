import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validar contraseña erronea', () => {
    component.registerForm.controls['password'].setValue('23412434d')
    expect(component.registerForm.controls['password'].valid).toBeFalse();
  });

  it('Validar contraseña correcta', () => {
    component.registerForm.controls['password'].setValue('fe23$23eEafea')
    expect(component.registerForm.controls['password'].valid).toBeTrue();
  });

  it('Validar fecha mímina correcta', () => {
    component.registerForm.controls['birthdate'].setValue(new Date('2005-01-01'))
    expect(component.registerForm.controls['birthdate'].valid).toBeTrue();
  });

  it('Validar fecha mímina erronea', () => {
    component.registerForm.controls['birthdate'].setValue(new Date('2015-01-01'))
    expect(component.registerForm.controls['birthdate'].valid).toBeFalse();
  });
});
