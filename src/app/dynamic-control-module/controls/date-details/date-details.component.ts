import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlContainer, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateDetailsModel } from '../../model/dateDetails';
import { BaseComponent } from '../BasControl/BaseControl';

@Component({
  selector: 'date-details',
  templateUrl: './date-details.component.html',
  styleUrls: ['./date-details.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateDetailsComponent),
    multi: true
  }]
})
export class DateDetailsComponent extends BaseComponent implements OnInit {

  @Input() DataValue: DateDetailsModel;
  constructor() {
    super();
   }

  ngOnInit() {
  }

}
