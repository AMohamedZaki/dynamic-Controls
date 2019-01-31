import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Panel } from '../model/panel';
import { ServiceDetails } from '../model/ServiceDetails';
import { DataService } from '../contrlosServices/data-service.service';
import { ObjectContianerService } from '../contrlosServices/ObjectContianer.service';
import { ControlMainObject } from '../model/ControlMainObject';
import { ObjectDetails } from '../model/ObjectDetails';
import { Patient } from '../contrlosServices/Patient';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() dataSource: any[] = [];
  @Input() ObjectsMapper: ObjectDetails[] = [];
  @Input() ServiceSource: ServiceDetails[] = [];

  index = 0;
  length = 0;
  message = '';
  showcheckbox: boolean;
  elementList: any[] = [];
  MainObject: ControlMainObject = {};

  constructor(private objContainerService: ObjectContianerService) {
  }

  ngOnInit() {

    if (this.dataSource.length || this.dataSource.length > 0) {
      this.length = this.dataSource.length;
    }
    console.log('List', this.ObjectsMapper);
    this.dataSource.forEach((panel: Panel) => {
      const pObject = this.ObjectsMapper.find((item: ObjectDetails) => item.Name === panel.ObjectMap);

      // tslint:disable-next-line:no-debugger
      debugger;
      if (pObject) {
        this.MainObject[panel.ObjectMap] = pObject.Object;
      }
    });

    console.log(this.MainObject);
     this.objContainerService.CurrentObject = this.form.value;
     this.ServiceSource.forEach((item: ServiceDetails) => {
       item.Service.Parent = this.objContainerService;
     });
     this.objContainerService.currentItem.subscribe((CurrentItem) => {
       if (CurrentItem) {
         Object.keys(CurrentItem).forEach((Key) => {
           // tslint:disable-next-line:no-debugger
           this.form.controls[Key].setValue(CurrentItem[Key]);
         });
       }
     });


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
