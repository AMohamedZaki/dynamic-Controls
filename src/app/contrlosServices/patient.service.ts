import { DataService } from './data-service.service';

export class PatientService extends DataService {

  constructor() {
    super();
   }

  testClick() {
    console.log('from PatientService ');
  }

  testChange(event: any) {
    console.log('testChange From PatientService');
  }

}
