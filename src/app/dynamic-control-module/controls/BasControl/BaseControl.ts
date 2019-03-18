import { OnInit, Input, forwardRef, Component } from '@angular/core';
import { ControlValueAccessor, ControlContainer, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => BaseComponent),
        multi: true
    }]
})
export class BaseComponent implements OnInit, ControlValueAccessor {

    @Input() class: string;
    @Input() fGName = '';
    @Input() fCName = '';
    @Input() ngStyle: any;
    private _value: boolean;

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() { }

    ngOnInit() {
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
