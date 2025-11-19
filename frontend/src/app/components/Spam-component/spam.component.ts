import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-spam',
  templateUrl: './spam.component.html'
})
export class SpamComponent {

  @Input() form!: FormGroup;

  get controls() {
    return Object.keys(this.form.controls);
  }

  getControl(field: string): AbstractControl {
    return this.form.get(field)!;
  }
}
