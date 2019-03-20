
import { BaseElement } from './baseElement';
import { IElement } from './IElement';
import { ControlType } from './controlsTypeEnum';

// Supported events valueChange($event), filterChange($event), open(), close() ,focus(), blur()
export class MultiSelect extends BaseElement<any> {
    controlType = ControlType[ControlType.multiSelect];
    dataSource: string;
    textField: string;
    valueField: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
        this.textField = Options.textField || '';
        this.valueField = Options.valueField || '';
    }
}


export class DatePicker extends BaseElement<any> {
    controlType = ControlType[ControlType.datePicker];
    format: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.format = Options.format;
    }
}

export class KendoFileUpload extends BaseElement<any> {
    controlType = ControlType[ControlType.fileUpload];
    constructor(Options: IElement<any> = {}) {
        super(Options);
    }
}
