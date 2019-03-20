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

  SetmaxYear(ev: string) {
    // if (ev && ((ev as Number) < 1900 && (ev as Number) > 2099)) {
    //   const CurrentYear = new Date().getFullYear();
    //   this.getDataControl('Year').setValue(CurrentYear);
    // }
  }

  // SetmaxMonth(ev: any) {
  //   if (ev && (ev) as Number > 12) {
  //     this.getDataControl('Month').setValue(12);
  //   }
  // }

  SetmaxMonth(ev: any) {
    if (ev && (ev) as Number > 12) {
      this.getDataControl('Month').setValue(12);
    }
  }

  private getDataControl(Key: string): AbstractControl {
    return this.form.get(`${this.GroupName}.${this.element.Key}.${Key}`);
  }
}
