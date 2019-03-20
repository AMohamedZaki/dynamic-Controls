import { Type } from '@angular/core';
import { DynamicTextBoxComponent } from '../controls/dynamic-text-box/dynamic-text-box.component';
import { BaseComponent } from '../controls/BasControl/BaseControl';
import { DynamicDropdownComponent } from '../controls/dynamic-dropdown/dynamic-dropdown.component';
import { DynamicTextAreaComponent } from '../controls/dynamic-text-area/dynamic-text-area.component';
import { DynamicRadiobuttonsComponent } from '../controls/dynamic-radiobuttons/dynamic-radiobuttons.component';
import { DynamicMultiSelectComponent } from '../controls/dynamic-multi-select/dynamic-multi-select.component';
import { DynamicCheckboxComponent } from '../controls/dynamic-checkbox/dynamic-checkbox.component';
import { DynamicDatePickerComponent } from '../controls/dynamic-date-picker/dynamic-date-picker.component';
import { DynamicDateDetailsComponent } from '../controls/dynamic-date-details/dynamic-date-details.component';
import { DynamicFileUploadComponent } from '../controls/dynamic-file-upload/dynamic-file-upload.component';
import { DynamicButtonComponent } from '../controls/dynamic-button/dynamic-button.component';
import { DynamicEditableDropDownListComponent } from '../controls/dynamic-editable-drop-down-list/editable-drop-down-list.component';

interface ControlElement {
    [ket: string]: Type<BaseComponent>;
}

export function Controls(): ControlElement {
    const controls: ControlElement = {
        textbox: DynamicTextBoxComponent,
        dropdown: DynamicDropdownComponent,
        textArea: DynamicTextAreaComponent,
        radiobuttons: DynamicRadiobuttonsComponent,
        multiSelect: DynamicMultiSelectComponent,
        checkBox: DynamicCheckboxComponent,
        datePicker: DynamicDatePickerComponent,
        dateDetails: DynamicDateDetailsComponent,
        fileUpload: DynamicFileUploadComponent,
        button: DynamicButtonComponent,
        editableDropdown: DynamicEditableDropDownListComponent
    };
    return controls;
}
