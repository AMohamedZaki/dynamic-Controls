import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Panel } from '../model/panel';
import { ServiceDetails } from '../model/ServiceDetails';
import { ControlMainObject } from '../model/ControlMainObject';
import { BaseElement } from '../model/baseElement';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() dataSource: any[] = [];
  @Input() ServiceSource: ServiceDetails[] = [];
  // Create Input Main Object That Contain all Sub Objects
  // @Input() MainObject: ControlMainObject = {};
  // @Output() MainObjectChange: EventEmitter<any> = new EventEmitter<any>();

  index = 0;
  length = 0;
  message = '';
  showcheckbox: boolean;
  elementList: any[] = [];

  constructor() {
  }

  ngOnInit() {

    if (this.dataSource.length || this.dataSource.length > 0) {
      this.length = this.dataSource.length;
    }
    if (this.dataSource) {
      this.elementList = this.dataSource;
      this.dataSource.forEach((panel: Panel) => {
        this.assaginObjectToService(panel);
      });
    }
  }


  getService(serviceName: any): any {
    if (serviceName) {
      // tslint:disable-next-line:prefer-const
      let nitem = this.ServiceSource
        .find(serv => serv['Name'].toLowerCase() === serviceName.toLowerCase())
        .Service;
      if (nitem) {
        return nitem;
      } else {
      }
    }
    return null;
  }

  assaginObjectToService(panel: Panel) {

    if (panel.elementList) {
      // get all Elements in Panel
      const MainPanelObject = {};
      panel.elementList.forEach((element: BaseElement<any>) => {
        MainPanelObject[element.Key] = element.value;
      });
      // this.MainObject[panel.ObjectMap] = MainPanelObject;
      // set Object Value in the service that injected in service list
      const service = this.ServiceSource.find(x => x.Name === panel.Service);
      if (service) {
        const index = this.ServiceSource.findIndex(item => item === service);
        this.ServiceSource[index].Service.AddForm(this.form.controls[panel.ObjectMap] as FormGroup);
      }
    }

    const subPanel = panel.panel;
    if (subPanel) {
      const SubPanelObject = {};
      subPanel.elementList.forEach((element: BaseElement<any>) => {
        SubPanelObject[element.Key] = element.value;
      });
      // this.MainObject[panel.ObjectMap][subPanel.ObjectMap] = SubPanelObject;
      if (subPanel.panel) {
        throw new TypeError('Maximum one sub Panel');
      }
    }
  }

}
