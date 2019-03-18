import { BaseElement } from './baseElement';
import { IElement } from './IElement';
import { DateDetailsModel } from './dateDetails';

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

// fileUpload
export class FileUpload extends BaseElement<any> {
    controlType = 'fileUpload';
    multiple = false;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.multiple = Options.multiple;
    }
}

// DateDetails
export class DateDetails extends BaseElement<any> {
    dateDetails: DateDetailsModel;
    controlType = 'dateDetails';
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dateDetails = Options.dateDetails;
    }
}

