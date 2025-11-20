import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificationCodePage } from './verification-code-page.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('VerificationCodePage', () => {
  let fixture: ComponentFixture<VerificationCodePage>;
  let component: VerificationCodePage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VerificationCodePage,
        CommonModule,
        FormsModule,
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener la propiedad code vacía inicialmente', () => {
    expect(component.code).toBe('');
  });

  it('onVerify debería llamar a console.log con el código actual', () => {
    const spy = spyOn(console, 'log');
    component.code = '123456';
    component.onVerify();
    expect(spy).toHaveBeenCalledWith('Verifying code', '123456');
    spy.calls.reset();
  });

  it('al cambiar code y ejecutar onVerify se loggea el nuevo valor', () => {
    const spy = spyOn(console, 'log');
    component.code = 'ABCDEF';
    component.onVerify();
    expect(spy).toHaveBeenCalledWith('Verifying code', 'ABCDEF');
  });
});
