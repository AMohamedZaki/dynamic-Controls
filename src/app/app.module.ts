import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DynamicElementComponent } from './dynamic-element/dynamic-element.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ElementConvertService } from './Services/element-convert.service';
import { GetElementsService } from './Services/get-elements.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
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
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatNativeDateModule,
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
