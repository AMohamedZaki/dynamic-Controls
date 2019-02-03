import { DataService } from './data-service.service';

export class DoctorService extends DataService {

  constructor() {
    super();
  }

  testClick() {
    // debugger;
    // this.Parent.CurrentObject['firstName'] = 'Cairo';
    console.log(this.Parent.CurrentObject);
  }

  testChange(value: any) {
    // this.Parent.changeCurrentObject(this.Parent.CurrentObject);
    console.log('testChange From DocService', value);

  }

}
