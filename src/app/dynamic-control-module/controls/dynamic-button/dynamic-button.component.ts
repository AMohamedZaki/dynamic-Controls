import { Component, OnInit, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../BasControl/BaseControl';

@Component({
  selector: 'app-dynamic-button',
  templateUrl: './dynamic-button.component.html',
  styleUrls: ['./dynamic-button.component.css']
})
export class DynamicButtonComponent extends BaseComponent implements OnInit {

  constructor(elementRef: ElementRef,
    renderer: Renderer2,
    cdRef: ChangeDetectorRef) {
    super(elementRef, renderer, cdRef);
  }

  ngOnInit() {
    this.assaginMethod();
  }

}
