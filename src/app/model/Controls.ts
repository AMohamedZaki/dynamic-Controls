import { BaseElement } from './baseElement';
import { IElement } from './IElement';
import { ControlStyle } from './DynamicStyle';

// TextBox
export class TextBoxElement extends BaseElement<any> {
    controlType = 'textbox';
    type: string;
    constructor(Options: IElement<string> = {}) {
        super(Options);
    }
}

// CheckBox
export class CheckBox extends BaseElement<any> {
    controlType = 'checkBox';
    dataSource: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
    }
}

// Radio button
export class Radiobuttons extends BaseElement<any> {
    controlType = 'radiobuttons';
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

// Drop down List
export class Button extends BaseElement<any> {
    controlType = 'button';
    constructor(Options: IElement<any> = {}) {
        super(Options);
    }
}

// TextArea
export class TextArea extends BaseElement<any> {
    controlType = 'textArea';
    constructor(Options: IElement<any> = {}) {
        super(Options);
    }
}

