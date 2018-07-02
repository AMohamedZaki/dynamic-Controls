import { Injectable } from '@angular/core';
import { TextBoxElement } from '../model/TextBoxElement';
import { DropDown } from '../model/dropDown';

@Injectable()
export class GetElementsService {

  constructor() { }

  getElements() {
    const elemnents: any[] = [
      new TextBoxElement ({
        Key: 'firstName',
        Label: 'First name',
        value: 'National Technology',
        required: true,
        visible: true,
      }) ,
      new DropDown({
        Key: 'brave',
        Label: 'Choose One Answer ?',
        required: true,
        visible: true,
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
      })
    ];


    return elemnents;

  }
}
