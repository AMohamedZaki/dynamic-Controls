
import {
  Directive, Input, OnInit, OnChanges, ComponentRef,
  ComponentFactoryResolver, ViewContainerRef, Type
} from '@angular/core';
import { BaseElement } from '../model/baseElement';
import { FormGroup } from '@angular/forms';
import { Controls } from '../model/ControlsDatasource';
import { BaseComponent } from '../controls/BasControl/BaseControl';
import { ValidationAlertComponent } from '../controls/validation-alert/validation-alert.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[DynamicFeild]'
})
export class DynamicFeildDirective implements OnChanges, OnInit {

  @Input() element: BaseElement<any>;
  @Input() FGroup: FormGroup;
  @Input() Service: any;
  @Input() GroupName: string;
  component: ComponentRef<BaseComponent>;
  validationComponent: ComponentRef<ValidationAlertComponent>;

  constructor(private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef) { }

  ngOnInit() {
    const components = Controls();
    if (!components[this.element.controlType]) {
      throw new Error(`this type ${this.element.controlType} not supported ...`);
    }
    const _component = this.resolver.resolveComponentFactory(components[this.element.controlType]);
    this.component = this.container.createComponent(_component);

    const _vcomponent = this.resolver.resolveComponentFactory(ValidationAlertComponent);
    this.validationComponent = this.container.createComponent(_vcomponent);

    this.initializeControlsComponentInstance();
    this.initializeValidationComponentInstance();
  }

  ngOnChanges() {
    if (this.component) {
      this.initializeControlsComponentInstance();
      this.initializeValidationComponentInstance();
    }
  }

  initializeControlsComponentInstance() {
    this.component.instance.form = this.FGroup;
    this.component.instance.element = this.setElement(this.element);
    this.component.instance.Service = this.Service;
    this.component.instance.GroupName = this.GroupName;
  }

  initializeValidationComponentInstance() {
    this.validationComponent.instance.form = this.FGroup;
    this.validationComponent.instance.GroupName = this.GroupName;
    this.validationComponent.instance.element = this.setElement(this.element);
    this.validationComponent.instance.controlName = this.element.Key;
  }

  setElement(element: BaseElement<any>): BaseElement<any> {
    if (element.style && typeof (element.style) === 'string') {
      element.style = JSON.parse(element.style as string);
    }
    return element;
  }


}
