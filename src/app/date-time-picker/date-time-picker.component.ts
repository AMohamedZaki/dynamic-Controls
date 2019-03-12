import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'date-time-picker',
  styleUrls: ['./date-time-picker.component.css'],
  template: `
  <kendo-datepicker #kendoDatepickerInstance="kendo-datepicker"
  [format]="'dd-MMM-yyyy hh:mm:ss a'" [(ngModel)]="Value">
  </kendo-datepicker>

  <kendo-timepicker class="test" style="width: calc(6.1px + 1.4285714286em);
  margin-top: 0px;" [(ngModel)]="Value"></kendo-timepicker>`
})
export class DateTimePickerComponent implements OnInit {

  @Input() Value: Date;
  constructor() { }

  ngOnInit() {
    if (this.Value) {
      this.Value = (this.Value) ? this.Value : new Date();
    }
  }

}
