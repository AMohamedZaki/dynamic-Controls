import { Component, OnInit, ViewChild } from '@angular/core';
import { GetElementsService } from '../Services/get-elements.service';
import { ElementConvertService } from '../Services/element-convert.service';
import { FormGroup } from '@angular/forms';
import { PatientService } from '../contrlosServices/patient.service';
import { ServiceDetails } from '../model/ServiceDetails';
import { DoctorService } from '../contrlosServices/doctor.service';
import { ComboBoxComponent } from '@progress/kendo-angular-dropdowns';
import { FileRestrictions } from '@progress/kendo-angular-upload';
import { of } from 'rxjs/observable/of';
import { HttpResponse } from '@angular/common/http';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'elememt-container',
  templateUrl: './elememt-container.component.html',
  styleUrls: ['./elememt-container.component.css']
})
export class ElememtContainerComponent implements OnInit {

  @ViewChild('itemComboBox') public itemComboBox: ComboBoxComponent;

  ElementDataList: any[];
  form: FormGroup;
  ServiceList: ServiceDetails[] = [];

  uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

  // myRestrictions: FileRestrictions = {
  //   allowedExtensions: ['.jpg', '.png', '.pdf'],
  //   maxFileSize: 4194304
  // };

  constructor(
    private elementConvertService: ElementConvertService,
    private elemntMockService: GetElementsService,
    private patService: PatientService,
    private docService: DoctorService) {
  }

  ngOnInit() {

    this.ElementDataList = this.elemntMockService.getElements();
    this.form = this.elementConvertService.toFormControl(this.elemntMockService.elemnents);

    // Assain Services
    this.ServiceList.push({ Name: 'patService', Service: this.patService });
    this.ServiceList.push({ Name: 'docService', Service: this.docService });
  }

  uploadEventHandler(event) {
    // tslint:disable-next-line:no-debugger
    debugger;
    console.log('event', event);
        return of(new HttpResponse({ status: 200 }));
  }

  onSubmit() {
    alert('Done');
  }


}

