import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DynamicElementComponent } from './dynamic-element/dynamic-element.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ElementConvertService } from './Services/element-convert.service';
import { GetElementsService } from './Services/get-elements.service';
import { RouterModule } from '@angular/router';
import { PatientService } from './contrlosServices/patient.service';
import { ElememtContainerComponent } from './elememt-container/elememt-container.component';
import { DoctorService } from './contrlosServices/doctor.service';
import { OrderByPipe } from './Pipes/orderBy.pipe';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    DynamicElementComponent,
    DynamicFormComponent,
    ElememtContainerComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    DropDownsModule,
    RouterModule.forRoot([
      { path: '' , component: ElememtContainerComponent } ,
    ])
  ],
  providers: [
    GetElementsService,
    ElementConvertService,
    PatientService,
    DoctorService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
