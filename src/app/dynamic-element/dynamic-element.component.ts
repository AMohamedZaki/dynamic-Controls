import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';
import { BaseElement } from '../model/baseElement';
import { FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamicElement',
  templateUrl: './dynamic-element.component.html',
  styleUrls: ['./dynamic-element.component.css']
})
export class DynamicElementComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('elements') elements: BaseElement<any>;
  @Input() form: FormGroup;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    if (this.elements.events.length) {
      this.elements.events.forEach(element => {
        this.renderer.listen(this.elementRef.nativeElement, element.Name,
          element.callBack);
      });
    }
  }

}
