import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicElementComponent } from './dynamic-element/dynamic-element.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ElememtContainerComponent } from '../elememt-container/elememt-container.component';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IntlModule } from '@progress/kendo-angular-intl';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { UploadModule } from '@progress/kendo-angular-upload';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByPipe } from './Pipes/orderBy.pipe';
import { DynamicFeildDirective } from './directive/dynamic-feild.directive';
import { DynamicTextBoxComponent } from './controls/dynamic-text-box/dynamic-text-box.component';
import { ValidationAlertComponent } from './controls/validation-alert/validation-alert.component';
import { DynamicDropdownComponent } from './controls/dynamic-dropdown/dynamic-dropdown.component';
import { DynamicCheckboxComponent } from './controls/dynamic-checkbox/dynamic-checkbox.component';
import { DynamicFileUploadComponent } from './controls/dynamic-file-upload/dynamic-file-upload.component';
import { DynamicButtonComponent } from './controls/dynamic-button/dynamic-button.component';
import { DynamicDatePickerComponent } from './controls/dynamic-date-picker/dynamic-date-picker.component';
import { DynamicDateDetailsComponent } from './controls/dynamic-date-details/dynamic-date-details.component';
import { DynamicRadiobuttonsComponent } from './controls/dynamic-radiobuttons/dynamic-radiobuttons.component';
import { DynamicMultiSelectComponent } from './controls/dynamic-multi-select/dynamic-multi-select.component';
import { DynamicTextAreaComponent } from './controls/dynamic-text-area/dynamic-text-area.component';
import { DynamicEditableDropDownListComponent } from './controls/dynamic-editable-drop-down-list/editable-drop-down-list.component';

@NgModule({
  declarations: [
    DynamicElementComponent,
    DynamicFormComponent,
    ElememtContainerComponent,
    OrderByPipe,
    // DateTimePickerComponent,
    DynamicFeildDirective,
    DynamicTextBoxComponent,
    ValidationAlertComponent,
    DynamicDropdownComponent,
    DynamicCheckboxComponent,
    DynamicFileUploadComponent,
    DynamicButtonComponent,
    DynamicDatePickerComponent,
    DynamicDateDetailsComponent,
    DynamicRadiobuttonsComponent,
    DynamicMultiSelectComponent,
    DynamicTextAreaComponent,
    DynamicEditableDropDownListComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    IntlModule,
    LayoutModule,
    DropDownsModule,
    DateInputsModule,
    UploadModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    DynamicTextBoxComponent,
    DynamicDropdownComponent,
    ValidationAlertComponent,
    DynamicTextAreaComponent,
    DynamicRadiobuttonsComponent,
    DynamicMultiSelectComponent,
    DynamicCheckboxComponent,
    DynamicDatePickerComponent,
    DynamicDateDetailsComponent,
    DynamicFileUploadComponent,
    DynamicButtonComponent,
    DynamicEditableDropDownListComponent
  ]
})
export class DynamicControlModule { }
