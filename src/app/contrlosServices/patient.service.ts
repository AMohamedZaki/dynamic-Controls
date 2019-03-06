import { DataService } from './data-service.service';

export class PatientService extends DataService {

  constructor() {
    super();
  }

  CountryList = [
    { key: '1', value: 'Egypt', selected: true },
    { key: '2', value: 'Qeter', selected: false },
  ];

  CountryRaddio = [
    { key: 1, value: 'USA' },
    { key: 2, value: 'UK' },
  ];

  NamesList = [
    { value: 'Ahmed', key: 1 },
    { value: 'Ali', key: 2 },
    { value: 'Zaki', key: 3 },
    { value: 'Mohamed', key: 4 },
    { value: 'Adraid', key: 5 },
    { value: '3wad', key: 6 }
  ];

  CityList = [];

  testClick() {
    console.log('The Object ', this.CurrentObject);
    this.CurrentObject['lastName'] = 'ali';
    console.log('ali', this.CurrentObject['firstName']);
  }

  testChange(value: any) {
    // console.log('value', value);
  }

  btnClick() {
    this.CurrentObject['IsAgree'] = !this.CurrentObject['IsAgree'] ;
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
