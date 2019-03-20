import { Component, OnInit, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../BasControl/BaseControl';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'dynamic-date-picker',
  templateUrl: './dynamic-date-picker.component.html',
  styleUrls: ['./dynamic-date-picker.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DynamicDatePickerComponent extends BaseComponent implements OnInit {

  theDate: Date;
  constructor(elementRef: ElementRef,
    renderer: Renderer2,
    cdRef: ChangeDetectorRef) {
    super(elementRef, renderer, cdRef);
  }

  ngOnInit() {
    this.assaginMethod();
  }

  setDateValue() {
    this.getElement(this.element.Key).setValue(this.theDate);
  }


}
