import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dinamic-forms',
  templateUrl: './dinamic-forms.component.html',
  styleUrls: ['./dinamic-forms.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterLink]
})
export class DinamicFormsComponent  implements OnInit {
  @Input() inputs: any[] = [];
  @Output() formSubmit = new EventEmitter<any>();
  @Input() buttons: any[] = [];

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group: any = {};
    this.inputs.forEach(input => {
      group[input.name] = ['']; // valor inicial vacío
    });
    this.form = this.fb.group(group);
  }

  submitForm() {
    this.formSubmit.emit(this.form.value);
  }

  handleButtonClick(btn: any) {
    if (btn.action) {
      btn.action(); // ejecuta la función pasada desde el padre
    }
  }


}
