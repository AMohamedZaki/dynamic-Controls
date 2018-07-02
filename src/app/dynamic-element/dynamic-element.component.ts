import { Component, OnInit, Input } from '@angular/core';
import { BaseElement } from '../model/baseElement';
import { FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-element',
  templateUrl: './dynamic-element.component.html',
  styleUrls: ['./dynamic-element.component.css']
})
export class DynamicElementComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('elements') elements: BaseElement<any>;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
