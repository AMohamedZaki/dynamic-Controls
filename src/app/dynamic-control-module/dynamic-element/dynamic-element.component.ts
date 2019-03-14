import {
  Component, OnInit, ElementRef, Renderer, AfterViewChecked,
  ChangeDetectorRef,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormGroupDirective, ControlContainer, FormGroup, AbstractControl } from '@angular/forms';
import { BaseElement } from '../../model/baseElement';
import { IEvent } from '../../model/IEvents';
import { hasRequiredField } from '../validation/hasRequiredField';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

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
    private renderer: Renderer,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.elements && this.elements.events && this.elements.events.length > 0) {
      this.elements.events.forEach((element: IEvent) => {
        this.assaginMethodToControl(element);
      });
    }

    this.detectControlValueChange();
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

  showTooltip(e: any): void {
    // if (this.getElement(this.elements.Key) && this.getElement(this.elements.Key).invalid && this.getElement(this.elements.Key).touched) {
    //   this.tooltipDir.show(e);
    // } else {
    //   this.tooltipDir.hide();
    // }
  }


  detectControlValueChange() {
    // const ElementKey = this.elements.Key;
    // const control = this.getElement(ElementKey);
    // control.valueChanges.subscribe(() => {
    //   console.log(control['errors']);
    //   // tslint:disable-next-line:no-debugger
    //   debugger;
    //   if (control && control.invalid) {
    //     if (control['errors'].required ||
    //       control['errors'].maxLength ||
    //       control['errors'].minLength ||
    //       control['errors'].pattern) {
    //         console.log(this.tooltipDir);
    //       this.tooltipDir.show(this.template);
    //       console.log('asdas');
    //     } }
    // });
}


}
