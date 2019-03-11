import {
  Component, Input, OnInit,
  ElementRef, Renderer, AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';
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
  @Input() GroupName = '';
  @Input() Service: any;
  @Input() elements: BaseElement<any>;


  constructor(private elementRef: ElementRef,
    private renderer: Renderer,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    if (this.elements && this.elements.events && this.elements.events.length > 0) {
      this.elements.events.forEach((element: IEvent) => {
        this.assaginMethodToControl(element);
      });
    }


  }

  getElement(name: string): AbstractControl {
    return this.form.get(`${this.GroupName}.${name}`);
  }

  HasRequiredValidation() {
    const Control = this.form.get(`${this.GroupName}.${this.elements.Key}`);
    return hasRequiredField(Control);
  }

  // For The Validtion in Case the Validtion is Fire
  // and the Control Value Changed under the hode
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }


  assaginMethodToControl(element: IEvent) {
    if (this.Service) {
      if (element.PassEventObject) {
        if (typeof this.Service[element.callBack] === 'function') {
          this.renderer.listen(this.elementRef.nativeElement, element.Name,
            (el: any) => this.Service[element.callBack](el));
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
  }
}

const hasRequiredField = (abstractControl: AbstractControl): boolean => {
  if (abstractControl.validator) {
      const validator = abstractControl.validator({}as AbstractControl);
      if (validator && validator.required) {
          return true;
      }
  }
  if (abstractControl['controls']) {
      for (const controlName in abstractControl['controls']) {
          if (abstractControl['controls'][controlName]) {
              if (hasRequiredField(abstractControl['controls'][controlName])) {
                  return true;
              }
          }
      }
  }
  return false;
};

