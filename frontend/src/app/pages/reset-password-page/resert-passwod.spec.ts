import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResetPasswordPage } from './reset-password-page.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AuthFacade } from '../../services/auth-facade.service';
import { RecoverPayload } from '../../services/auth.service';
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

describe('ResetPasswordPage', () => {
  let fixture: ComponentFixture<ResetPasswordPage>;
  let component: ResetPasswordPage;
  let mockAuthFacade: jasmine.SpyObj<AuthFacade>;

  beforeEach(async () => {
    mockAuthFacade = jasmine.createSpyObj<AuthFacade>('AuthFacade', [
      'requestPasswordReset',
    ]);

    // Configuramos TestBed
    await TestBed.configureTestingModule({
      imports: [
        ResetPasswordPage,
        CommonModule,
        IonicModule.forRoot(),
        FormsModule,
        RouterTestingModule,
      ],
      providers: [{ provide: AuthFacade, useValue: mockAuthFacade }],
    });

    // sobrescribimos las imports del componente para que use nuestros STUBs
    TestBed.overrideComponent(ResetPasswordPage, {
      set: {
        imports: [
          CommonModule,
          IonicModule,
          FormsModule,
          RouterTestingModule,
          StubDynamicFormsComponent,
          StubDynamicHeaderComponent,
        ],
      },
    });

    //Ahora compileComponents()
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(ResetPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener configurados los inputs y botones correctamente', () => {
    expect(component.inputs).toBeDefined();
    expect(component.inputs.length).toBe(1);
    expect(component.inputs[0].name).toBe('email');

    expect(component.buttons).toBeDefined();
    expect(component.buttons.length).toBe(1);
    expect(component.buttons[0].type).toBe('submit');
  });

  it('onSubmit debería llamar authFacade.requestPasswordReset con un RecoverPayload', () => {
    const formValue = { email: 'test@example.com' };
    const payloadEsperado: RecoverPayload = { email: formValue.email };

    component.onSubmit(formValue);

    expect(mockAuthFacade.requestPasswordReset).toHaveBeenCalledTimes(1);
    expect(mockAuthFacade.requestPasswordReset).toHaveBeenCalledWith(
      payloadEsperado
    );
  });

  it('cuando el hijo app-dynamic-forms emite formSubmit, se debe invocar requestPasswordReset', () => {
    const debugEl = fixture.debugElement.query(
      By.directive(StubDynamicFormsComponent)
    );
    expect(debugEl).toBeTruthy(
      'No se encontró app-dynamic-forms stub en el template'
    );

    const stubInstance = debugEl.componentInstance as StubDynamicFormsComponent;
    stubInstance.formSubmit.emit({ email: 'emit@example.com' });

    fixture.detectChanges();

    expect(mockAuthFacade.requestPasswordReset).toHaveBeenCalledWith({
      email: 'emit@example.com',
    });
  });
});
