import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServiceDetails } from '../model/ServiceDetails';
import { Panel } from '../model/panel';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() dataSource: any[] = [];
  @Input() ServiceSource: ServiceDetails[] = [];
  // Create Input Main Object That Contain all Sub Objects

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
      // set Object Value in the service that injected in service list
      const service = this.ServiceSource.find(x => x.Name === panel.Service);
      if (service) {
        const index = this.ServiceSource.findIndex(item => item === service);
        this.ServiceSource[index].Service.AddForm(this.form.controls[panel.ObjectMap] as FormGroup);
        this.ServiceSource[index].Service.SetValidtors(panel.elementList);
      }
    }
  }

}
