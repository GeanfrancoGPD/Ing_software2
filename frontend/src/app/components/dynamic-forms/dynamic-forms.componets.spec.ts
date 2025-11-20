import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormsComponent } from './dynamic-forms.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('DynamicFormsComponent', () => {
  let fixture: ComponentFixture<DynamicFormsComponent>;
  let component: DynamicFormsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DynamicFormsComponent,
        CommonModule,
        IonicModule.forRoot(),
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormsComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse', () => {
    component.inputs = [{ name: 'email', label: 'Correo', type: 'email' }];
    component.buttons = [{ label: 'Enviar', type: 'submit' }];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('ngOnInit debería crear form controls según inputs', () => {
    component.inputs = [
      { name: 'email', label: 'Correo', type: 'email' },
      { name: 'password', label: 'Contraseña', type: 'password' },
    ];
    fixture.detectChanges(); // dispara ngOnInit
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
  });

  it('submitForm debería emitir el valor del formulario', () => {
    component.inputs = [{ name: 'email', label: 'Correo', type: 'email' }];
    fixture.detectChanges(); // ngOnInit => crea form
    component.form.get('email')!.setValue('test@x.com');

    const spy = spyOn(component.formSubmit, 'emit');
    component.submitForm();

    expect(spy).toHaveBeenCalledWith({ email: 'test@x.com' });
  });

  it('handleButtonClick debería ejecutar la acción si existe', () => {
    const btn: any = { action: jasmine.createSpy('actionSpy') };
    component.handleButtonClick(btn);
    expect(btn.action).toHaveBeenCalled();
  });
});
