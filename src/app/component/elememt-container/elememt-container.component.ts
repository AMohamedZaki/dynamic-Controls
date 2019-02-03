import { Component, OnInit } from '@angular/core';
import { GetElementsService } from '../../Services/get-elements.service';
import { ElementConvertService } from '../../Services/element-convert.service';
import { FormGroup } from '@angular/forms';
import { PatientService } from '../../contrlosServices/patient.service';
import { ServiceDetails } from '../../model/ServiceDetails';
import { DoctorService } from '../../contrlosServices/doctor.service';
import { Patient } from '../../contrlosServices/Patient';
import { ObjDetails } from '../../model/ObjectDetails';

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
  ObjectList: ObjDetails[] = [];
  patient: Patient;

  constructor(
    private elementConvertService: ElementConvertService,
    private elemntMockService: GetElementsService,
    private patService: PatientService,
    private docService: DoctorService) {
  }

  ngOnInit() {
    this.patient = {
      firstName: 'mn3m',
      lastName: 'ahmed',
      Id: 12312312,
      City: { key: '1', value: 'Egypt' },
      Country: { key: '1', value: 'Egypt' }
    };

    this.ElementDataList = this.elemntMockService.getElements();
    this.form = this.elementConvertService.toFormControl(this.elemntMockService.elemnents);
    // Assain Objects
    console.log('before compo', ObjDetails.ConvertObject(this.patient));

    this.ObjectList.push({ Name: 'Patient', Object: ObjDetails.ConvertObject(this.patient) });
    // Assain Services
    this.ServiceList.push({ Name: 'patService', Service: this.patService });
    this.ServiceList.push({ Name: 'docService', Service: this.docService });
  }

}
