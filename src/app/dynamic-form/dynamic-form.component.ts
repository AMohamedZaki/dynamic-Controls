import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Panel } from '../model/panel';
import { ServiceDetails } from '../model/ServiceDetails';
import { ObjectContianerService } from '../contrlosServices/ObjectContianer.service';
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
  @Input() MainObject: ControlMainObject = {};

  index = 0;
  length = 0;
  message = '';
  showcheckbox: boolean;
  elementList: any[] = [];

  constructor(private objContainerService: ObjectContianerService) {
  }

  ngOnInit() {

    if (this.dataSource.length || this.dataSource.length > 0) {
      this.length = this.dataSource.length;
    }
    if (this.dataSource) {
      this.elementList = this.dataSource;
      this.dataSource.forEach((controlElement: Panel) => {

        if (controlElement.elementList) {
          // get all Elements in Panel
          const MainPanelObject = {};
          controlElement.elementList.forEach((element: BaseElement<any>) => {
            MainPanelObject[element.Key] = element.value;
          });
          this.MainObject[controlElement.ObjectMap] = MainPanelObject;
        }

        const subPanel = controlElement.panel;
        if (subPanel) {
          const SubPanelObject = {};
          subPanel.elementList.forEach((element: BaseElement<any>) => {
            SubPanelObject[element.Key] = element.value;
          });
          this.MainObject[controlElement.ObjectMap][subPanel.ObjectMap] = SubPanelObject;
          if (subPanel.panel) {
            throw new TypeError('Maximum one sub Panel');
          }
        }

      });
    }

    this.objContainerService.CurrentObject = this.MainObject;
    console.log('objContainerService', this.objContainerService);
    this.ServiceSource.forEach((item: ServiceDetails) => {
      item.Service.Parent = this.objContainerService;
      item.Service.Parent.CurrentObject = this.MainObject;
    });

  }


  getService(serviceName: any): any {
    if (serviceName) {
      // tslint:disable-next-line:prefer-const
      let nitem = this.ServiceSource
        .find(serv => serv['Name'].toLowerCase() === serviceName.toLowerCase())
        .Service;
      if (nitem) {
        console.log(nitem.CurrentObject);
        return nitem;
      } else {
      }
    }
    return null;
  }


}
