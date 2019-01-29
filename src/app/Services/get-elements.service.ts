import { Injectable } from '@angular/core';
import { TextBoxElement } from '../model/TextBoxElement';
import { DropDown } from '../model/dropDown';
import { ElementConvertService } from './element-convert.service';
import { DatePickerElement } from '../model/datepicker';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Panel } from '../model/panel';

@Injectable()
export class GetElementsService {

  elemnents: Panel[];
  constructor(private elementConvertService: ElementConvertService) {
    this.elemnents = [{
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
              { Name: 'click', callBack: 'testClick()' },
              { Name: 'change', callBack: 'testChange(event)' }
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
      , panel: {
        titel: 'pathology contnent',
        elementList: [
          new TextBoxElement({
            Key: 'paragraph',
            Label: 'paragraph',
            value: '',
            required: true,
            visible: true,
            id: 0
          })
        ]
      }
    }];
  }

  private currentItemsSource = new BehaviorSubject<any[]>([]);
  currentItems = this.currentItemsSource.asObservable();

  changeCurrentItem(item: any) {
    this.currentItemsSource.next(item);
  }


  getElements() {
    return this.elemnents;

  }

  addElement(elemnents: Panel[]) {
    this.elemnents = this.assign(this.elemnents, elemnents);
  }

  assign(target, source): Panel[] {
    const num = Math.min(target.length, source.length);
    for (let i = 0; i < num; ++i) {
      target[i] = source[i];
    }
    return target;
  }

}
