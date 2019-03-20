import {
    OnInit, forwardRef, Component, ElementRef,
    Renderer2, ChangeDetectorRef, AfterViewChecked
} from '@angular/core';
import {
    ControlValueAccessor, ControlContainer, FormGroupDirective,
    NG_VALUE_ACCESSOR, FormGroup, AbstractControl
} from '@angular/forms';
import { BaseElement } from '../../model/baseElement';
import { hasRequiredField } from '../../validation/hasRequiredField';
import { IEvent } from '../../model/IEvents';

@Component({
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => BaseComponent),
        multi: true
    }]
})
export class BaseComponent implements OnInit, ControlValueAccessor, AfterViewChecked {

    private _value: boolean;

    class: string;
    fSubGName = '';
    fCName = '';
    ngStyle: any;

    GroupName = '';
    form: FormGroup;
    Service: any;
    element: BaseElement<any>;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor(private elementRef: ElementRef,
        private renderer: Renderer2,
        private cdRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.assaginMethod();
    }

    protected assaginMethod() {
        if (this.element && this.element.events && this.element.events.length > 0) {
            this.element.events.forEach((element: IEvent) => {
                this.assaginMethodToControl(element);
            });
        }
    }

    private assaginMethodToControl(element: IEvent) {
        if (this.Service && element) {
            if (typeof this.Service[element.callBack] === 'function') {
                this.renderer.listen(this.elementRef.nativeElement, element.Name,
                    this.MethodWithParameterOrNot(element));
            } else {
                this.invalidMedthod(element);
            }
        }
    }

    private MethodWithParameterOrNot(element: IEvent): (event: any) => boolean | void {
        if (element.PassEventObject) { return (el: any) => this.Service[element.callBack](el); }
        return () => this.Service[element.callBack]();
    }


    private invalidMedthod(element: IEvent) {
        if (element.callBack.indexOf('(') > -1 || element.callBack.indexOf(')') > -1) {
            throw new TypeError(`The Method Name Contain brackets !!`);
        }
        throw new TypeError(`Method ${element.callBack} Not Exist !!`);
    }

    // check the control has required validation or not
    HasRequiredValidation() {
        const Control = this.form.get(`${this.GroupName}.${this.element.Key}`);
        return hasRequiredField(Control);
    }

    // get form control item by send control name
    getElement(name: string): AbstractControl {
        return this.form.get(`${this.GroupName}.${name}`);
    }


    // get full form control name (groupname.controlname)
    fullControlname() {
        return `${this.GroupName}.${this.element.Key}`;
    }

    // For The Validtion in Case the Validtion is Fire
    // and the Control Value Changed under the hode
    ngAfterViewChecked(): void {
        this.cdRef.detectChanges();
    }

    // the implement of Value Accessor
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    writeValue(value: any): void {
        this.value = value;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

}
