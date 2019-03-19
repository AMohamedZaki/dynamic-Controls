import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlContainer, FormGroupDirective, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from '../BasControl/BaseControl';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateTimePickerComponent),
    multi: true
  }]
})
export class DateTimePickerComponent implements OnInit {

  @Input() format = '';
  theDate = new Date();

  constructor() {
    // super();
  }

  ngOnInit() {
  }

}
