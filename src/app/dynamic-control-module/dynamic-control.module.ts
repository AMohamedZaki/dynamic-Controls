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
import { DateTimePickerComponent } from './controls/date-time-picker/date-time-picker.component';

@NgModule({
  declarations: [
    DynamicElementComponent,
    DynamicFormComponent,
    ElememtContainerComponent,
    OrderByPipe,
    DateTimePickerComponent
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
  ]
})
export class DynamicControlModule { }
