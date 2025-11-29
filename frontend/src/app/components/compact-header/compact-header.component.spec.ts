import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CompactHeaderComponent } from './compact-header.component';

describe('CompactHeaderComponent', () => {
  let component: CompactHeaderComponent;
  let fixture: ComponentFixture<CompactHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CompactHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompactHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

