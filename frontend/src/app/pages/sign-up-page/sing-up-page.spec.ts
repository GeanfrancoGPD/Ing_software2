import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SignUpPage } from './sign-up-page.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthFacade } from '../../services/auth-facade.service';
import { RegisterPayload } from '../../services/auth.service';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-dynamic-forms',
  template: '',
  standalone: true,
})
class StubDynamicFormsComponent {
  @Input() inputs: any;
  @Input() buttons: any;
  @Output() formSubmit = new EventEmitter<any>();
}

@Component({
  selector: 'app-dynamic-header',
  template: '',
  standalone: true,
})
class StubDynamicHeaderComponent {
  @Input() title: string = '';
}

describe('SignUpPage', () => {
  let fixture: ComponentFixture<SignUpPage>;
  let component: SignUpPage;
  let mockAuthFacade: jasmine.SpyObj<AuthFacade>;

  beforeEach(async () => {
    mockAuthFacade = jasmine.createSpyObj<AuthFacade>('AuthFacade', [
      'register',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        SignUpPage,
        CommonModule,
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
      providers: [{ provide: AuthFacade, useValue: mockAuthFacade }],
    });

    // sustituimos las imports del componente por las que contienen nuestros STUBs
    TestBed.overrideComponent(SignUpPage, {
      set: {
        imports: [
          CommonModule,
          IonicModule,
          RouterTestingModule,
          StubDynamicFormsComponent,
          StubDynamicHeaderComponent,
        ],
      },
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener configurados los inputs y botones correctamente', () => {
    expect(component.inputs).toBeDefined();
    expect(component.inputs.length).toBe(3);
    expect(component.inputs[0].name).toBe('nombre');
    expect(component.inputs[1].name).toBe('email');
    expect(component.inputs[2].name).toBe('password');

    expect(component.buttons).toBeDefined();
    expect(component.buttons.length).toBe(2);
    expect(component.buttons.some((b) => b.type === 'submit')).toBeTrue();
    expect(component.buttons.some((b) => b.type === 'link')).toBeTrue();
  });

  it('onSubmit debería llamar authFacade.register con un RegisterPayload', () => {
    const formValue = {
      nombre: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      password: '123456',
    };
    const payloadEsperado: RegisterPayload = {
      nombre: formValue.nombre,
      email: formValue.email,
      password: formValue.password,
      tipo_usuario: 2,
    };

    component.onSubmit(formValue);

    expect(mockAuthFacade.register).toHaveBeenCalledTimes(1);
    expect(mockAuthFacade.register).toHaveBeenCalledWith(payloadEsperado);
  });

  it('cuando el hijo app-dynamic-forms emite formSubmit, se debe invocar register', () => {
    const debugEl = fixture.debugElement.query(
      By.directive(StubDynamicFormsComponent)
    );
    expect(debugEl).toBeTruthy(
      'No se encontró app-dynamic-forms stub en el template'
    );

    const stubInstance = debugEl.componentInstance as StubDynamicFormsComponent;
    stubInstance.formSubmit.emit({
      nombre: 'Emitido',
      email: 'emit@ej.com',
      password: 'emitpw',
    });

    fixture.detectChanges();

    expect(mockAuthFacade.register).toHaveBeenCalledWith({
      nombre: 'Emitido',
      email: 'emit@ej.com',
      password: 'emitpw',
      tipo_usuario: 2,
    });
  });
});
