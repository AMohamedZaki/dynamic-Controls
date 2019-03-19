import { Component, OnInit, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../BasControl/BaseControl';

@Component({
  selector: 'app-dynamic-date-details',
  templateUrl: './dynamic-date-details.component.html',
  styleUrls: ['./dynamic-date-details.component.css']
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
}
