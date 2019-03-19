import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BaseElement } from '../../model/baseElement';

@Component({
  selector: 'app-validation-alert',
  templateUrl: './validation-alert.component.html',
  styleUrls: ['./validation-alert.component.css']
})
export class ValidationAlertComponent implements OnInit {

  GroupName = '';
  form: FormGroup;
  controlName = '';
  element: any;
  constructor() { }

  ngOnInit() {
  }

  // get form control item by send control name
  getElement(name: string): AbstractControl {
    return this.form.get(`${this.GroupName}.${name}`);
  }
}
