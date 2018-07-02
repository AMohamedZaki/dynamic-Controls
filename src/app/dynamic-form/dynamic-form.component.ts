import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('form') form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
