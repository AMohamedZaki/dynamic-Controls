import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';
import { BaseElement } from '../model/baseElement';
import { FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamicElement',
  templateUrl: './dynamic-element.component.html'
})
export class DynamicElementComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('elements') elements: BaseElement<any>;
  @Input() form: FormGroup;
  // tslint:disable-next-line:no-input-rename
  @Input('ShowCheck') ShowCheck: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    if (this.elements && this.elements.events && this.elements.events.length > 0) {
      this.elements.events.forEach(element => {
        if (element.Name) {
          this.renderer.listen(this.elementRef.nativeElement, element.Name,
            element.callBack);
        }
      });

    }
  }
}
