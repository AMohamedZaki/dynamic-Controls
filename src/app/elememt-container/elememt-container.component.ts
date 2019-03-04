import { Component, OnInit, ViewChild } from '@angular/core';
import { GetElementsService } from '../Services/get-elements.service';
import { ElementConvertService } from '../Services/element-convert.service';
import { FormGroup } from '@angular/forms';
import { PatientService } from '../contrlosServices/patient.service';
import { ServiceDetails } from '../model/ServiceDetails';
import { DoctorService } from '../contrlosServices/doctor.service';
import { Patient } from '../contrlosServices/Patient';
import { ComboBoxComponent } from '@progress/kendo-angular-dropdowns';
import { attachEmbeddedView } from '@angular/core/src/view';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'elememt-container',
  templateUrl: './elememt-container.component.html',
  styleUrls: ['./elememt-container.component.css']
})
export class ElememtContainerComponent implements OnInit {

  @ViewChild('itemComboBox') public itemComboBox: ComboBoxComponent;

  ElementDataList: any[];
  form: FormGroup;
  ServiceList: ServiceDetails[] = [];
  patient: Patient;
  registrationObject: any = {};

  filteredItemTitle: string;
  listItemTitles: TestingDemo[] = [];
  allowCustom = true;

  constructor(
    private elementConvertService: ElementConvertService,
    private elemntMockService: GetElementsService,
    private patService: PatientService,
    private docService: DoctorService) {
  }

  ngOnInit() {

    this.ElementDataList = this.elemntMockService.getElements();
    this.form = this.elementConvertService.toFormControl(this.elemntMockService.elemnents);

    // Assain Services
    this.ServiceList.push({ Name: 'patService', Service: this.patService });
    this.ServiceList.push({ Name: 'docService', Service: this.docService });
  }



  onSubmit() {
    alert('Done');
  }



  public itemFilteration() {
    debugger;

    const newItems = [
      { name: 'Mohameden', key: 1 },
      { name: 'Androw', key: 2 },
      { name: '3awaden', key: 3 },
      { name: 'Adres', key: 4 },
      { name: 'pepo', key: 5 },
    ];


    if (this.filteredItemTitle) {
      this.listItemTitles = newItems;

      this.itemComboBox.toggle(true);
      return;
    }
  }


  private getItemsByTitleOnSuccess(response: any) {
    // this.listItems = response.entityList;
    // this.listItemTitles = this.listItems.map(x => x.title);
    this.itemComboBox.toggle(true);
  }


  setSelectedItem() {

    //return true;
  }


  openToggle() {
    this.itemComboBox.toggle(true);
  }

}



export class TestingDemo {
  name: string;
  key: number;
}
