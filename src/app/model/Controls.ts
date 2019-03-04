import { BaseElement } from './baseElement';
import { IElement } from './IElement';

// TextBox
export class TextBoxElement extends BaseElement<any> {
    controlType = 'textbox';
    type: string;

    constructor(Options: IElement<string> = {}) {
        super(Options);
        this.type = Options.type || '';
    }
}

// CheckBox
export class CheckBox extends BaseElement<any> {
    controlType = 'CheckBox';
    dataSource: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
    }
}

// Radio button
export class Radiobuttons extends BaseElement<any> {
    controlType = 'Radiobuttons';
    dataSource: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
    }
}


// Drop down List
export class DropDown extends BaseElement<any> {
    controlType = 'dropdown';
    // options: { key: string, value: string, selected?: boolean };
    dataSource: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
    }
}

// datepicker

export class DatePickerElement extends BaseElement<any> {
    controlType = 'datepicker';
    type: string;

    constructor(Options: IElement<string> = {}) {
        super(Options);
        this.type = Options.type || '';
    }
}
