import { Component, OnInit, ViewChild } from '@angular/core';
import { ComboBoxComponent } from '@progress/kendo-angular-dropdowns';
import { FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ServiceDetails } from '../dynamic-control-module/model/ServiceDetails';
import { GetElementsService } from '../Services/get-elements.service';
import { PatientService } from '../contrlosServices/patient.service';
import { DoctorService } from '../contrlosServices/doctor.service';
import { ConvertListToFormGroup } from '../dynamic-control-module/service/helper.service';

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

  constructor(
    private elemntMockService: GetElementsService,
    private patService: PatientService,
    private docService: DoctorService) {
  }

  ngOnInit() {
    // call the server..
    this.ElementDataList = this.elemntMockService.getElements();

    // convert thr result to form group
    this.form = ConvertListToFormGroup(this.elemntMockService.elemnents);

    // Assain Services
    this.ServiceList.push({ Name: 'patService', Service: this.patService });
    this.ServiceList.push({ Name: 'docService', Service: this.docService });
  }

  onSubmit() {
    alert('Done');
  }


}

