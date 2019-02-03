import { DataService } from './data-service.service';

export class DoctorService extends DataService {

  constructor() {
    super();
  }


  CountryList = [
    { key: '1', value: 'Egypt', selected: true },
    { key: '2', value: 'Qeter', selected: false },
  ];
  CityList = [];

  testClick() {
    // this.Parent.CurrentObject['firstName'] = 'Cairo';
    // this.CountryList = [
    //   { key: '1', value: 'Egypt', selected: true },
    //   { key: '2', value: 'Qeter', selected: false },
    //   { key: '2', value: 'Qeter', selected: false },
    //   { key: '2', value: 'Qeter', selected: false },
    //   { key: '2', value: 'Qeter', selected: false },
    //   { key: '2', value: 'Qeter', selected: false },
    // ];
    // console.log(this.Parent.CurrentObject);
  }

  testChange(value: any) {

    // this.Parent.changeCurrentObject(this.Parent.CurrentObject);
    // console.log('testChange From DocService', value);
    // this.CountryList = [
    //   { key: '1', value: 'Egypt', selected: true },
    //   { key: '2', value: 'Qeter', selected: false },
    //   { key: '2', value: 'Qeter', selected: false },
    //   { key: '2', value: 'Qeter', selected: false },
    //   { key: '2', value: 'Qeter', selected: false },
    //   { key: '2', value: 'Qeter', selected: false },
    // ];
  }


  ChangeCity(value: any) {
    debugger;
    const items = [
      { key: '1', value: 'Cairo', CountryId: '1' },
      { key: '2', value: 'Nasr', CountryId: '1' },
      { key: '3', value: 'Makka', CountryId: '2' },
      { key: '4', value: 'Madena', CountryId: '2' }
    ];
    this.CityList = items.filter((city: any) => city.CountryId === value);
  }

}
