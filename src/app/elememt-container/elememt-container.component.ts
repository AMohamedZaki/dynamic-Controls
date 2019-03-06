import { Component, OnInit, ViewChild } from '@angular/core';
import { GetElementsService } from '../Services/get-elements.service';
import { ElementConvertService } from '../Services/element-convert.service';
import { FormGroup } from '@angular/forms';
import { PatientService } from '../contrlosServices/patient.service';
import { ServiceDetails } from '../model/ServiceDetails';
import { DoctorService } from '../contrlosServices/doctor.service';
import { Patient } from '../contrlosServices/Patient';
import { ComboBoxComponent } from '@progress/kendo-angular-dropdowns';

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
  patient: Patient;
  registrationObject: any = {};

  filteredItemTitle: string;
  allowCustom = true;

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



  onSubmit() {
    alert('Done');
  }


}

