import {
  Component, OnInit, ElementRef, Renderer2, AfterViewChecked,
  ChangeDetectorRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { FormGroupDirective, ControlContainer, FormGroup, AbstractControl } from '@angular/forms';
import { hasRequiredField } from '../validation/hasRequiredField';
import { BaseElement } from '../model/baseElement';
import { IEvent } from '../model/IEvents';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamicElement',
  templateUrl: './dynamic-element.component.html',
  styleUrls: ['./dynamic-element.component.css'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DynamicElementComponent implements OnInit, AfterViewChecked {

  value: Date = new Date();
  @Input() form: FormGroup;
  @Input() GroupName = '';
  @Input() Service: any;
  @Input() elements: BaseElement<any>;
  // @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
  // @ViewChild('templateMessage') public template: HTMLElement;


  constructor(private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.elements && this.elements.events && this.elements.events.length > 0) {
      this.elements.events.forEach((element: IEvent) => {
        this.assaginMethodToControl(element);
      });
    }
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

  HasRequiredValidation() {
    const Control = this.form.get(`${this.GroupName}.${this.elements.Key}`);
    return hasRequiredField(Control);
  }


  getElement(name: string): AbstractControl {
    return this.form.get(`${this.GroupName}.${name}`);
  }

  fullControlname() {
    return `${this.GroupName}.${this.elements.Key}`;
  }

}
