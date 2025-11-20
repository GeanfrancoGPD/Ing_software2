import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthFacade } from '../../services/auth-facade.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPayload } from '../../services/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // opcional si stubeas hijos

describe('LoginPageComponent', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let component: LoginPageComponent;
  let mockAuthFacade: jasmine.SpyObj<AuthFacade>;

  beforeEach(async () => {
    mockAuthFacade = jasmine.createSpyObj<AuthFacade>('AuthFacade', ['login']);

    await TestBed.configureTestingModule({
      imports: [
        LoginPageComponent,
        CommonModule,
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
      providers: [{ provide: AuthFacade, useValue: mockAuthFacade }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Nos ahorramos stubs de hijos y problemas
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener configurados los inputs y botones correctamente', () => {
    expect(component.inputs).toBeDefined();
    expect(component.inputs.length).toBe(2);
    expect(component.inputs[0].name).toBe('email');
    expect(component.inputs[1].name).toBe('password');

    expect(component.buttons).toBeDefined();
    expect(component.buttons.length).toBe(2);
    expect(component.buttons.some((b) => b.type === 'submit')).toBeTrue();
  });

  it('onSubmit debería llamar authFacade.login con un LoginPayload', () => {
    const formValue = { email: 'test@example.com', password: '123456' };

    const payloadEsperado: LoginPayload = {
      email: formValue.email,
      password: formValue.password,
    };

    component.onSubmit(formValue);

    expect(mockAuthFacade.login).toHaveBeenCalledTimes(1);
    expect(mockAuthFacade.login).toHaveBeenCalledWith(payloadEsperado);
  });

  it('onSubmit debería ignorar campos adicionales (solo usa email y password)', () => {
    const formValue = { email: 'x@y.com', password: 'pw', extra: 'ignorado' };
    component.onSubmit(formValue);
    expect(mockAuthFacade.login).toHaveBeenCalledWith({
      email: 'x@y.com',
      password: 'pw',
    });
  });
});
