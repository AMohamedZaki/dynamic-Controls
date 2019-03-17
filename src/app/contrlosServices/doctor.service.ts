import { DataService } from '../dynamic-control-module/service/data-service.service';

export class DoctorService extends DataService {

  constructor() {
    super();
  }

  CountryList = [
    { key: 1, value: 'Egypt' },
    { key: 2, value: 'Sadui' },
  ];


  CityList = [];

  testClick() {
    console.log(this.CurrentObject);
    this.CurrentObject['doctorlastName'] += ' ali';
    console.log('ali', this.CurrentObject['doctorlastName']);
  }

  testChange(value: any) {
    console.log('value', value);
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
