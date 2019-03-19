import { Component, OnInit, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../BasControl/BaseControl';

@Component({
  selector: 'app-dynamic-radiobuttons',
  templateUrl: './dynamic-radiobuttons.component.html',
  styleUrls: ['./dynamic-radiobuttons.component.css']
})
export class DynamicRadiobuttonsComponent extends BaseComponent implements OnInit {

  constructor(elementRef: ElementRef,
    renderer: Renderer2,
    cdRef: ChangeDetectorRef) {
    super(elementRef, renderer, cdRef);
  }

  ngOnInit() {
    this.assaginMethod();
  }
}
