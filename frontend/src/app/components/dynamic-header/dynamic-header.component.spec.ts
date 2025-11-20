import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicHeaderComponent } from './dynamic-header.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';

describe('DynamicHeaderComponent', () => {
  let fixture: ComponentFixture<DynamicHeaderComponent>;
  let component: DynamicHeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DynamicHeaderComponent, // componente standalone
        CommonModule,
        IonicModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el título pasado por @Input() en el h2.subtitle-header', () => {
    const testTitle = 'Título de prueba';
    component.title = testTitle;
    fixture.detectChanges();

    const h2 = fixture.debugElement.query(By.css('h2.subtitle-header'));
    expect(h2).toBeTruthy('No se encontró h2.subtitle-header en el template');
    expect(h2.nativeElement.textContent.trim()).toBe(testTitle);
  });

  it('si title está vacío, el h2 debería existir pero vacío (según plantilla actual)', () => {
    component.title = '';
    fixture.detectChanges();
    const h2 = fixture.debugElement.query(By.css('h2.subtitle-header'));
    expect(h2).toBeTruthy();
    expect(h2.nativeElement.textContent.trim()).toBe('');
  });
});
