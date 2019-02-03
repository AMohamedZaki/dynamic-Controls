import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';
import { BaseElement } from '../model/baseElement';
import { FormGroup } from '@angular/forms';
import { HelperService } from '../Services/helper/helper.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamicElement',
  templateUrl: './dynamic-element.component.html'
})
export class DynamicElementComponent implements OnInit {

  @Input() form: FormGroup;
  // tslint:disable-next-line:no-input-rename
  @Input('elements') elements: BaseElement<any>;
  // tslint:disable-next-line:no-input-rename
  @Input('ShowCheck') ShowCheck: boolean;
  @Input() Service: any;
  @Input() ObjectMapper: any;
 // @Input() DataBind: string;

  constructor(private elementRef: ElementRef,
    private renderer: Renderer) {
  }

  ngOnInit() {
    // beasuce the referance value
    const service = Object.create(this.Service);
    if (this.elements && this.elements.events && this.elements.events.length > 0) {
      this.elements.events.forEach(element => {
        const MethodDetails = HelperService.getMethodName(element.callBack);
        if (service) {
          // debugger;

          if (MethodDetails.Parameters) {
            MethodDetails.Parameters.forEach((it) => {
              console.log(it);
            });
          }

          this.renderer.listen(this.elementRef.nativeElement, element.Name,
            () => service[MethodDetails.Name](...MethodDetails.Parameters)
          );
        }

      });
    }
  }

}
