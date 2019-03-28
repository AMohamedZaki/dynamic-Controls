import { BaseElement } from './baseElement';
import { IElement } from './IElement';
import { ControlType } from './controlsTypeEnum';

// TextBox
export class TextBoxElement extends BaseElement<any> {
    controlType = ControlType[ControlType.textbox];
    constructor(Options: IElement<string> = {}) {
        super(Options);
    }
}

// CheckBox
export class CheckBox extends BaseElement<any> {
    controlType = ControlType[ControlType.checkBox];
    dataSource: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
    }
}

// Radio button
export class Radiobuttons extends BaseElement<any> {
    controlType = ControlType[ControlType.radiobuttons];
    dataSource: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
    }
}


// Drop down List
export class DropDown extends BaseElement<any> {
    controlType = ControlType[ControlType.dropdown];
    dataSource: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
    }
}

// Drop down List
export class Button extends BaseElement<any> {
    controlType = ControlType[ControlType.button];
    constructor(Options: IElement<any> = {}) {
        super(Options);
    }
}

// TextArea
export class TextArea extends BaseElement<any> {
    controlType = ControlType[ControlType.textArea];
    constructor(Options: IElement<any> = {}) {
        super(Options);
    }
}

// fileUpload
export class FileUpload extends BaseElement<any> {
    controlType = ControlType[ControlType.fileUpload];
    multiple = false;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.multiple = Options.multiple;
    }
}

// DateDetails
export class DateDetails extends BaseElement<any> {
    nestedControls = {
        Day: '',
        Month: '',
        Year: ''
    };
    controlType = ControlType[ControlType.dateDetails];
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.nestedControls = Options.nestedControls;
    }
}
