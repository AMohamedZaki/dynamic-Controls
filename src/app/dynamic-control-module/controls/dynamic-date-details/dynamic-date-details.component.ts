import { Component, OnInit, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../BasControl/BaseControl';
import { ControlContainer, FormGroupDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-date-details',
  templateUrl: './dynamic-date-details.component.html',
  styleUrls: ['./dynamic-date-details.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class DynamicDateDetailsComponent extends BaseComponent implements OnInit {

  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1;
  day: number = new Date().getDay();

  constructor(elementRef: ElementRef,
    renderer: Renderer2,
    cdRef: ChangeDetectorRef) {
    super(elementRef, renderer, cdRef);
  }

  ngOnInit() {
    this.assaginMethod();
  }


  // number input => prevent e,+,- in the phone number textbox
  // + => 43, - => 45, e => 101, 8 => backSpace, spacebar => 32
  keybeard(ev: any) {
    if (ev.keyCode !== 0 &&
      ev.keyCode !== 8 &&
      ev.keyCode > 57 ||
      (ev.keyCode < 48 && (ev.keyCode === 32))) {
      ev.preventDefault();
    }
  }

  SetmaxYear(ev: any) {
    const setMaxYear = new Date().getFullYear() + 80;
    const input = ev as Number;
    if (input && input < setMaxYear && input > 1900) {
      const CurrentYear = new Date().getFullYear();
      const yearElement = this.element.nestedControls['Year'];
      this.getDataControl(yearElement).setValue(CurrentYear);
    }
  }

  SetmaxDay(ev: any) {
    this.day = this.MaxDayValueOfMonth(ev);
  }

  SetmaxMonth(ev: any) {
    // debugger;
    const MonthElement = this.element.nestedControls['Month'];
    const dayElement = this.element.nestedControls['Day'];
    if (ev && (ev) as Number > 12) {
      this.getDataControl(MonthElement).setValue(12);
      ev = 12;
    }
    this.month = ev;
    const dayValue = (this.getDataControl(dayElement)) ? this.getDataControl(dayElement).value : null;
    if (dayValue) { this.day = this.MaxDayValueOfMonth(dayValue); }
  }

  private getDataControl(Key: string): AbstractControl {
    return this.form.get(`${this.GroupName}.${this.element.Key}.${Key}`);
  }

  /**
   * get number of days in the month
   */
  getDays(year: number, month: number) {
    const d = new Date(year, month, 0);
    return d.getDate();
  }

  digitalCount(n: number) {
    for (let i = 0; i < n; i++) {

    }
  }

  private MaxDayValueOfMonth(ev: number): number {
    const maxDayNumber = this.getDays(this.year, this.month);
    if (ev && (ev) as Number > maxDayNumber) {
      const dayElement = this.element.nestedControls['Day'];
      this.getDataControl(dayElement).setValue(maxDayNumber);
      ev = maxDayNumber;
    }
    return ev;
  }

}
