import { Component, OnInit } from '@angular/core';
import { GetElementsService } from '../../Services/get-elements.service';
import { ElementConvertService } from '../../Services/element-convert.service';
import { FormGroup } from '@angular/forms';
import { PatientService } from '../../contrlosServices/patient.service';
import { ServiceDetails } from '../../model/ServiceDetails';
import { DoctorService } from '../../contrlosServices/doctor.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'elememt-container',
  templateUrl: './elememt-container.component.html',
  styleUrls: ['./elememt-container.component.css']
})
export class ElememtContainerComponent implements OnInit {

  ElementDataList: any[];
  form: FormGroup;
  ServiceList: ServiceDetails[] = [];

  constructor(
    private elementConvertService: ElementConvertService,
    private elemntMockService: GetElementsService,
    private patService: PatientService,
    private docService: DoctorService) {
  }

  ngOnInit() {
    this.ElementDataList = this.elemntMockService.getElements();
    this.form = this.elementConvertService.toFormControl(this.elemntMockService.elemnents);

    this.ServiceList.push(Object.assign({}, { Name: 'patService', Service: this.patService }));
    this.ServiceList.push(Object.assign({}, { Name: 'docService', Service: this.docService }));
  }

}
