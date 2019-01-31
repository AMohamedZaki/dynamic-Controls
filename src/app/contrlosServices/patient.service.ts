import { DataService } from './data-service.service';

export class PatientService extends DataService {

  constructor() {
    super();
   }

  testClick() {
    this.Parent.CurrentObject['firstName'] = 'ahmed';
    console.log('from PatientService ');
  }

  testChange(event: any) {
    console.log('testChange From PatientService');
  }



  GetCountry() {
    return [
      { Name: 'Egypt', Id: 1 },
      { Name: 'Saudi', Id: 2 },
      { Name: 'Qeter', Id: 3 }
    ];
  }

  GetCities() {
    return [
      { Name: 'Cairo', Id: 1, CountryId: 1},
      { Name: 'Nasr', Id: 2,  CountryId: 1  },
      { Name: 'Qeter', Id: 3,  CountryId: 3 },
      { Name: 'El Do7a', Id: 3,  CountryId: 3 },
      { Name: 'Makka', Id: 3,  CountryId: 2 },
      { Name: 'El Madina', Id: 3,  CountryId: 2 },
    ];
  }
}
