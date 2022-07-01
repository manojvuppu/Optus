import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { OrbPanel } from './orb-accordion/orb-accordion-model';
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

  selectedAddOn;
  addOns: object[] = [
    {
      title: 'Jabra Evolve 1 - Link380a UC Stereo Black',
      desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.',
    },
    {
      title: 'Jabra Evolve 2 - Link380a UC Stereo Black',
      desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.',
    },
    {
      title: 'Jabra Evolve 3 - Link380a UC Stereo Black',
      desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.',
    },
    {
      title: 'Jabra Evolve 4 - Link380a UC Stereo Black',
      desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.',
    },
    {
      title: 'Jabra Evolve 5 - Link380a UC Stereo Black',
      desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.',
    },
  ];

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

  selectAddOn(event) {
    console.log('chnaged', event && event.value);
  }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
