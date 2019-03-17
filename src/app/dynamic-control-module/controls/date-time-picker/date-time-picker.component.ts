import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlContainer, FormGroupDirective, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class DateTimePickerComponent implements OnInit, ControlValueAccessor {

  @Input() format = '';
  @Input() formControlName = '';
  @Input() ngStyle: any;
  @Input() class: string;
  theDate = new Date();
  _value = new Date();

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
