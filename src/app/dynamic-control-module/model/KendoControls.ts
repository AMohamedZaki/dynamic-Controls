
import { BaseElement } from './baseElement';
import { IElement } from './IElement';
import { ControlType } from './controlsTypeEnum';

// Supported events valueChange($event), filterChange($event), open(), close() ,focus(), blur()
export class MultiSelect extends BaseElement<any> {
    controlType = ControlType[ControlType.multiSelect];
    dataSource: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
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

export class EditableDropdown extends BaseElement<any> {
    controlType = ControlType[ControlType.editableDropdown];
    dataSource: string;
    constructor(Options: IElement<any> = {}) {
        super(Options);
        this.dataSource = Options.dataSource || '';
    }
}
