import { DataService } from './data-service.service';

export class PatientService extends DataService {

  constructor() {
    super();
  }

  CountryList = [
    { key: '1', value: 'Egypt', selected: true },
    { key: '2', value: 'Qeter', selected: false },
  ];
  CityList = [];

  testClick() {
  }

  testChange(value: any) {
  }


  ChangeCity(value: any) {
    const items = [
      { key: '1', value: 'Cairo', CountryId: '1' },
      { key: '2', value: 'Nasr', CountryId: '1' },
      { key: '3', value: 'Makka', CountryId: '2' },
      { key: '4', value: 'Madena', CountryId: '2' }
    ];
    this.CityList = items.filter((city: any) => city.CountryId === value);
  }

}
