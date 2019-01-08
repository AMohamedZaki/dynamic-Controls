import { Injectable } from '@angular/core';
import { TextBoxElement } from '../model/TextBoxElement';
import { DropDown } from '../model/dropDown';
import { ElementConvertService } from './element-convert.service';
import { DatePickerElement } from '../model/datepicker';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Panel } from '../model/panel';

@Injectable()
export class GetElementsService {

  constructor(private elementConvertService: ElementConvertService) { }

  private currentItemsSource = new BehaviorSubject<any[]>([]);
  currentItems = this.currentItemsSource.asObservable();

  changeCurrentItem(item: any) {
    this.currentItemsSource.next(item);
  }


  getElements() {
    const elemnents: Panel[] = [{
      titel: 'Patient',
      elementList: [
        new TextBoxElement({
          Key: 'firstName',
          Label: 'First name',
          value: 'National Technology',
          required: true,
          visible: true,
          id: 0,
          events:
            [
              { Name: 'click', callBack: () => { this.elementConvertService.test(); } },
              { Name: 'change', callBack: el => { console.log(el.target.value); } }
            ]
        }),
        new DatePickerElement({
          Key: 'dateTimePicker',
          Label: 'Select Date',
          required: true,
          visible: false,
          id: 3
        }),
        new DropDown({
          Key: 'City',
          Label: 'Choose your City ?',
          required: true,
          visible: false,
          id: 4,
          options: [
            { key: 'cairo', value: 'Cairo' },
            { key: 'nasr', value: 'Nasr' },
            { key: 'helwan', value: 'Helwan' },
            { key: 'zagazeg', value: 'Zagazeg' }
          ]
        }),
        new TextBoxElement({
          Key: 'lastName',
          Label: 'Last name',
          value: 'Zaki',
          required: true,
          visible: false,
          id: 3
        })
      ]
    }];
    return elemnents;

  }
}
