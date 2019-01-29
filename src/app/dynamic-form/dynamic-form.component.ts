import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementConvertService } from '../Services/element-convert.service';
import { GetElementsService } from '../Services/get-elements.service';
import { Panel } from '../model/panel';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

  form: FormGroup;
  length = 0;
  sourceList: any[] = [];
  elementList: any[] = [];
  message = '';
  index = 0;
  showcheckbox: boolean;
  constructor(private elementConvertService: ElementConvertService,
    public elemntMockService: GetElementsService) {
  }

  ngOnInit() {
    this.sourceList = this.elemntMockService.getElements();
    this.elementList = this.sourceList;

    if (this.elementList.length || this.elementList.length > 0) {
      this.length = this.elementList.length;
    }

    this.form = this.elementConvertService.toFormControl(this.elemntMockService.elemnents);

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
    // show checkbox
    if (this.index % 2 === 0) {
      this.showcheckbox = true;
      this.elementList = this.elemntMockService.getElements();
    } else {
      // apply change
      this.elemntMockService.addElement(this.elementList);
      this.showcheckbox = false;
    }
    this.index += 1;
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
}
