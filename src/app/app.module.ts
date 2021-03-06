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
<<<<<<< HEAD
import { RouterModule } from '@angular/router';
import { SearchComponent } from './component/search/search.component';
=======
>>>>>>> parent of bac2306... apply an example for dynamic controls


@NgModule({
  declarations: [
    AppComponent,
    DynamicElementComponent,
    DynamicFormComponent
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
    MatNativeDateModule
  ],
  providers: [
    GetElementsService,
    ElementConvertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
