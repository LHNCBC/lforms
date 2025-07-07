import { Component, OnInit, Input } from '@angular/core';
import { LhcDataService } from '../../lib/lhc-data.service';
import deepEqual from "deep-equal";

@Component({
  selector: 'lhc-group-grid',
  templateUrl: './lhc-group-grid.component.html',
  styleUrls: ['./lhc-group-grid.component.css'],
  standalone: false,
})
export class LhcGroupGridComponent {
  @Input() item;
  @Input() formLevel: boolean = false;
  uniqueGridHeaders: any[] = [];
  constructor(public lhcDataService: LhcDataService) {
  }

  ngOnInit(): void {
    this.createCustomHeaders(this.item);
  }

  createCustomHeaders(item): void {
    item.items.forEach(questionItems => {
      questionItems.items.forEach(subItems => {
        if (!this.uniqueGridHeaders.includes(subItems.question) && subItems.skipLogic?.conditions[0]?.trigger?.value.text != 'alwaysHide' && subItems.skipLogic?.conditions[0]?.trigger?.value.text != 'Never') {
          this.uniqueGridHeaders.push(subItems.question);
        }
      });
    });
  }
}
