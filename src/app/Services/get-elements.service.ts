import { Injectable } from '@angular/core';
import { TextBoxElement } from '../model/TextBoxElement';
import { DropDown } from '../model/dropDown';
import { EventEmitter } from 'events';
import { ElementConvertService } from './element-convert.service';
import { DatePickerElement } from '../model/datepicker';
<<<<<<< HEAD
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Panel } from '../model/panel';
=======
>>>>>>> parent of bac2306... apply an example for dynamic controls

@Injectable()
export class GetElementsService {

  constructor(private elementConvertService: ElementConvertService) { }

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
<<<<<<< HEAD
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
=======
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
        Label: 'Last name1',
        value: 'Zaki',
        required: true,
        visible: false,
        id: 3
      }),

    ];

>>>>>>> parent of bac2306... apply an example for dynamic controls
    return elemnents;

  }
}
