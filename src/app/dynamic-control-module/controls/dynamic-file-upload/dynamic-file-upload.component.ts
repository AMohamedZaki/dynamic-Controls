import { Component, OnInit, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../BasControl/BaseControl';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dynamic-file-upload',
  templateUrl: './dynamic-file-upload.component.html',
  styleUrls: ['./dynamic-file-upload.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DynamicFileUploadComponent extends BaseComponent implements OnInit {

  constructor(elementRef: ElementRef,
    renderer: Renderer2,
    cdRef: ChangeDetectorRef) {
    super(elementRef, renderer, cdRef);
  }


  ngOnInit() {
    this.assaginMethod();
  }

}