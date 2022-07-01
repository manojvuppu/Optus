import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { OrbPanel } from './orb-accordion-model';

@Component({
  selector: 'orb-accordion-panel',
  template: '<ng-template #tmpl><ng-content></ng-content></ng-template>',
  styles: [],
})
export class OrbAccordionPanelComponent {
  @Input() tmplName: string;
  @ViewChild('tmpl', { static: true }) tmpl: TemplateRef<any>;
}

@Component({
  selector: 'orb-accordion',
  templateUrl: './orb-accordion.component.html',
  styleUrls: ['./orb-accordion.component.scss'],
})
export class OrbAccordionComponent implements OnInit, AfterViewInit {
  @Input()
  panels: OrbPanel[];
  @Output()
  change: EventEmitter<OrbPanel> = new EventEmitter();

  @ContentChildren(OrbAccordionPanelComponent)
  templateRefs: QueryList<OrbAccordionPanelComponent>;

  @ViewChildren('container', { read: ViewContainerRef })
  container: QueryList<ViewContainerRef>;

  selectedPanel: OrbPanel;

  // @Input()
  // selectedAddOn: string;

  constructor() {}

  ngOnInit() {
    this.selectedPanel = this.panels[0];
  }

  ngAfterViewInit() {
    this._initPanels();
  }

  _initPanels() {
    const tmplComponents = this.templateRefs.toArray();

    this.panels.forEach((panel, index) => {
      const tmplComponent = tmplComponents.find(
        (com) => com.tmplName === panel.tmplName
      );
      if (tmplComponent) {
        this.container.toArray()[index].createEmbeddedView(tmplComponent.tmpl);
      }
    });
  }

  onOpened(panel: OrbPanel) {
    console.log(panel);
    console.log('panel opened');
    this.selectedPanel.isChecked = true;
    this.selectedPanel.isExpanded = false;

    this.selectedPanel = panel;
    this.selectedPanel.isExpanded = true;

    this.change.emit(this.selectedPanel);
  }

  onClosed(panel: OrbPanel) {
    console.log('panel closed');
     this.selectedPanel.isExpanded = false;
  }

  next() {
    const index = this.panels.indexOf(this.selectedPanel);
    if (index > -1 && index < this.panels.length - 1) {
      this.move(index + 1);
    }
  }

  previous() {
    const index = this.panels.indexOf(this.selectedPanel);
    if (index > 0) {
      this.move(index - 1);
    }
  }

  move(index: number) {
    this.selectedPanel.isChecked = true;
    this.selectedPanel.isExpanded = false;

    this.selectedPanel = this.panels[index];
    this.selectedPanel.isExpanded = true;
  }
}
