import { Component, OnInit, ElementRef, Renderer2, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../BasControl/BaseControl';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { ComboBoxComponent } from '@progress/kendo-angular-dropdowns';


@Component({
  selector: 'dynamic-editable-drop-down-list',
  templateUrl: './editable-drop-down-list.component.html',
  styleUrls: ['./editable-drop-down-list.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DynamicEditableDropDownListComponent extends BaseComponent implements OnInit {

  currentValue: any;
  selectedItem: any = {};
  allowCustom = true;
  @ViewChild('kendoComboBoxInstance') ComboBoxInstance: ComboBoxComponent;
  constructor(elementRef: ElementRef,
    renderer: Renderer2,
    cdRef: ChangeDetectorRef) {
    super(elementRef, renderer, cdRef);
  }


  ngOnInit() {
    this.assaginMethod();
  }

  pressEnter() {
    this.openDialog();
  }

  openDialog() {
    this.ComboBoxInstance.toggle(true);
    this.ComboBoxInstance.focus();
  }

}
