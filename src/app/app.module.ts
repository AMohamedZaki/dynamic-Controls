import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { GetElementsService } from './Services/get-elements.service';
import { RouterModule } from '@angular/router';
import { PatientService } from './contrlosServices/patient.service';
import { ElememtContainerComponent } from './elememt-container/elememt-container.component';
import { DoctorService } from './contrlosServices/doctor.service';
import 'hammerjs';
import { DynamicControlModule } from './dynamic-control-module/dynamic-control.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DynamicControlModule,
    RouterModule.forRoot([
      { path: '', component: ElememtContainerComponent },
    ])
  ],
  providers: [
    GetElementsService,
    PatientService,
    DoctorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
