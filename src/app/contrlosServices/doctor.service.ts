import { DataService } from './data-service.service';

export class DoctorService extends DataService {

  constructor() {
    super();
  }

  testClick() {
    console.log('from DoctorService ');
  }

  testChange(event: any) {
    console.log('testChange From DocService');
  }

}
