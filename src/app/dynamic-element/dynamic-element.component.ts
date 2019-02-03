import { EventEmitter, Component, OnInit, Input, ElementRef, Renderer, Output } from '@angular/core';
import { BaseElement } from '../model/baseElement';
import { FormGroup } from '@angular/forms';
import { HelperService } from '../Services/helper/helper.service';
import { IEvent } from '../model/IEvents';

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
  @Input() DataBind: any;
  @Output() DataBindChanged = new EventEmitter<any>();
  constructor(private elementRef: ElementRef,
    private renderer: Renderer) {
  }

  ngOnInit() {
    // beasuce the referance value
    const service = Object.create(this.Service);
    if (this.elements && this.elements.events && this.elements.events.length > 0) {
      this.elements.events.forEach((element: IEvent) => {
        const MethodDetails = HelperService.getMethodDetails(element.callBack);
        if (service) {
          if (element.mainObject) {
            this.renderer.listen(this.elementRef.nativeElement, element.Name,
              (el: any) => service[element.callBack](el.target.value)
            );
          } else {
            this.renderer.listen(this.elementRef.nativeElement, element.Name,
              () => service[element.callBack]());
          }

        }

      });
    }
  }


  changeValue() {
    this.DataBindChanged.emit(this.DataBind);
  }

}
