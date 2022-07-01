import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { addOnTypes, OrbPanel } from './orb-accordion/orb-accordion-model';
import { OrbAccordionComponent } from './orb-accordion/orb-accordion.component';

/**
 * @title Expansion panel as accordion
 */
@Component({
  selector: 'expansion-steps-example',
  templateUrl: 'expansion-steps-example.html',
  styleUrls: ['expansion-steps-example.css'],
})
export class ExpansionStepsExample {
  @ViewChild('orbAccordion', { read: OrbAccordionComponent, static: false })
  orbAccordion: OrbAccordionComponent;

  @Output()
  back = new EventEmitter();
  @Output()
  complete = new EventEmitter();
  @Output()
  changePanel: EventEmitter<OrbPanel> = new EventEmitter();

  panels: OrbPanel[] = [
    {
      name: 'Basic Info',
      tmplName: 'basicInfo',
      isChecked: false,
      isExpanded: true,
    },
    {
      name: 'Email & Terms',
      tmplName: 'emailTerms',
      isChecked: false,
      isExpanded: false,
    },
    {
      name: 'Price',
      tmplName: 'price',
      isChecked: false,
      isExpanded: false,
    },
  ];
  pricePanel = this.panels.find((panel) => panel.name === 'Price');

  selectedAddO:string;
  addOns: object[] = addOnTypes;

  onSave() {
    if (this.pricePanel && this.pricePanel.isExpanded) {
      this.pricePanel.isExpanded = false;
      this.complete.emit();
    } else {
      this.orbAccordion.next();
    }
  }

  onChangePanel(panel: OrbPanel) {
    this.changePanel.emit(panel);
  }

  selectAddOn(event:any) {
    console.log('chnaged', event && event.value);
  }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
