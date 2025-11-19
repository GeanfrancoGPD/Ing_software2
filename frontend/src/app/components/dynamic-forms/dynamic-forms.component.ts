import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
})
export class DynamicFormsComponent implements OnInit {
  @Input() inputs: any[] = [];
  @Output() formSubmit = new EventEmitter<any>();
  @Input() buttons: any[] = [];

  private fb = inject(FormBuilder);
  form!: FormGroup;

  ngOnInit() {
    const group: any = {};
    this.inputs.forEach((input) => {
      group[input.name] = ['']; // valor inicial vacío
    });
    this.form = this.fb.group(group);
  }

  submitForm() {
    this.formSubmit.emit(this.form.value);
  }

  handleButtonClick(btn: any) {
    if (btn.action) {
      btn.action();
    }
  }
}
