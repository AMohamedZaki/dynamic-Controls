import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Panel } from '../model/panel';
import { ServiceDetails } from '../model/ServiceDetails';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() dataSource: any[] = [];
  @Input() ServiceSource: ServiceDetails[];

  length = 0;
  elementList: any[] = [];
  message = '';
  index = 0;
  showcheckbox: boolean;
  constructor() {
  }

  ngOnInit() {
    this.elementList = this.dataSource;
    if (this.elementList.length || this.elementList.length > 0) {
      this.length = this.elementList.length;
    }

  }

  onClick() {
    this.message = 'Done';
  }

  createRange(increment: number, length: number) {
    const remeder = (length % increment === 0) ? 0 : 1;
    const listLength = Math.floor(length / increment);
    const arrayLength = listLength + (remeder);
    return new Array(arrayLength);
  }

  applyChange() {
    // // show checkbox
    // if (this.index % 2 === 0) {
    //   this.showcheckbox = true;
    //   this.elementList = this.elemntMockService.getElements();
    // } else {
    //   // apply change
    //   this.elemntMockService.addElement(this.elementList);
    //   this.showcheckbox = false;
    // }
    // this.index += 1;
  }

  getSelectedDate() {
    this.elementList.filter((item: Panel) => {
      const panelList = item.elementList;
      const subPanel = item.panel;
      const subPanelList = item.panel.elementList;
      if (panelList && panelList.length > 0) {
        item.elementList = this.getvisbl(panelList);
      }
      if (subPanel && subPanelList && subPanelList.length > 0) {
        item.panel.elementList = this.getvisbl(subPanelList);
      }
    });
  }

  getvisbl(items: any[]) {
    return items.filter(it => it.visible === true);
  }

  getService(serviceName: any): any {
    // console.log(item);
    if (serviceName) {
      const nitem = this.ServiceSource
        .find(serv => serv['Name'].toLowerCase() === serviceName.toLowerCase())
        .Service;
      return Object.create(nitem);
    }
    return null;
  }


}
