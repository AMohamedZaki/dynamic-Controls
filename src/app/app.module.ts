import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, UploadInterceptor } from './app.component';
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
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import { UploadModule } from '@progress/kendo-angular-upload';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';




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
    IntlModule,
    DropDownsModule,
    RouterModule.forRoot([
      { path: '', component: ElememtContainerComponent },
    ]),
    DateInputsModule,
    UploadModule,
    HttpClientModule,
  ],
  providers: [
    GetElementsService,
    ElementConvertService,
    PatientService,
    DoctorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UploadInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
