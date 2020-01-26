import { BaseElement } from './baseElement';
import { ControlType } from './controlsTypeEnum';
import { TelephoneDetailsModel } from './telephoneDetails';
import { DateDetailsModel } from './dateDetails';

// TextBox
export class TextBoxElement extends BaseElement<any> {
    controlType = ControlType[ControlType.textbox];
    constructor() {
        super();
    }
}

// CheckBox
export class CheckBox extends BaseElement<any> {
    controlType = ControlType[ControlType.checkBox];
    dataSource: string;
    constructor() {
        super();
    }
}

// Radio button
export class Radiobuttons extends BaseElement<any> {
    controlType = ControlType[ControlType.radiobuttons];
    dataSource: string;
    constructor() {
        super();
    }
}


// Drop down List
export class DropDown extends BaseElement<any> {
    controlType = ControlType[ControlType.dropdown];
    dataSource: string;
    constructor() {
        super();
    }
}

// Drop down List
export class Button extends BaseElement<any> {
    controlType = ControlType[ControlType.button];
    constructor() {
        super();
    }
}

// TextArea
export class TextArea extends BaseElement<any> {
    controlType = ControlType[ControlType.textArea];
    constructor() {
        super();
    }
}

// fileUpload
export class FileUpload extends BaseElement<any> {
    controlType = ControlType[ControlType.fileUpload];
    multiple = false;
    constructor() {
        super();
    }
}

// DateDetails
export class DateDetails extends BaseElement<DateDetailsModel> {
    controlType = ControlType[ControlType.dateDetails];
    constructor() {
        super();
    }
}

// telephone number
export class TelephoneDetails extends BaseElement<TelephoneDetailsModel> {
    controlType = ControlType[ControlType.telephoneDetails];
    constructor() {
        super();
    }
}


