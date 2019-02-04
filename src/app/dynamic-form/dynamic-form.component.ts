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
    this.ServiceSource.forEach((item: ServiceDetails) => {
      item.Service.Parent = this.objContainerService;
    });

    // this.objContainerService.currentItem.subscribe((CurrentItem) => {
    //   if (CurrentItem) {
    //     Object.keys(CurrentItem).forEach((Key) => {
    //       // tslint:disable-next-line:no-debugger
    //       this.form.controls[Key].setValue(CurrentItem[Key]);
    //     });
    //   }
    // });


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
      // tslint:disable-next-line:prefer-const
      let nitem = this.ServiceSource
        .find(serv => serv['Name'].toLowerCase() === serviceName.toLowerCase())
        .Service;
      if (nitem) {
        return nitem;
      } else {
        debugger ;
      }
    }
    return null;
  }


}
