import { EventEmitter, Component, Input, Output, OnInit, ElementRef, Renderer, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BaseElement } from '../model/baseElement';
import { FormGroup, AbstractControl } from '@angular/forms';
import { IEvent } from '../model/IEvents';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamicElement',
  templateUrl: './dynamic-element.component.html'
})
export class DynamicElementComponent implements OnInit, AfterViewChecked {

  @Input() form: FormGroup;
  @Input() Service: any;
  // tslint:disable-next-line:no-input-rename
  @Input('elements') elements: BaseElement<any>;
  // tslint:disable-next-line:no-input-rename
  @Input('ShowCheck') ShowCheck: boolean;

  // custom two way binding
  @Input() DataBind: any;
  @Output() DataBindChanged = new EventEmitter<any>();

  constructor(private elementRef: ElementRef,
    private renderer: Renderer,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    if (this.elements && this.elements.events && this.elements.events.length > 0) {
      this.elements.events.forEach((element: IEvent) => {
        if (this.Service) {
          if (element.mainObject) {
            if (typeof this.Service[element.callBack] === 'function') {
              this.renderer.listen(this.elementRef.nativeElement, element.Name,
                (el: any) => this.Service[element.callBack](el.target.value));
            } else {
              if (element.callBack.indexOf('(') > -1 || element.callBack.indexOf(')') > -1) {
                throw new TypeError(`The Method Name Contain brackets !!`);
              }
              throw new TypeError(`Method ${element.callBack} Not Exist !!`);
            }
          } else {
            if (typeof this.Service[element.callBack] === 'function') {
              this.renderer.listen(this.elementRef.nativeElement, element.Name,
                () => this.Service[element.callBack]());
            } else {
              if (element.callBack.indexOf('(') > -1 || element.callBack.indexOf(')') > -1) {
                throw new TypeError(`The Method Name Contain brackets !!`);
              }
              throw new TypeError(`Method ${element.callBack} Not Exist !!`);
            }
          }
        }
      });
    }
  }


  changeValue() {
    this.DataBindChanged.emit(this.DataBind);
  }

  getElement(name: string): AbstractControl {
    return this.form.get(name);
  }

  // For The Validtion in Case the Validtion is Fire
  // and the Control Value Changed under the hode
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

}

