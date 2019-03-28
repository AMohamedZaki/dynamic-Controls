import { Component, OnInit, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../BasControl/BaseControl';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dynamic-telephone-text',
  templateUrl: './dynamic-telephone-text.component.html',
  styleUrls: ['./dynamic-telephone-text.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class DynamicTelephoneTextComponent extends BaseComponent implements OnInit {

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
  // there are no Key equal zero but for safety :)
  keybeard(ev: any) {
    if (ev.keyCode !== 8 &&
      ev.keyCode > 57 ||
      (ev.keyCode < 48 && !(ev.keyCode === 43 || ev.keyCode === 32))) {
      ev.preventDefault();
    }
  }

}
