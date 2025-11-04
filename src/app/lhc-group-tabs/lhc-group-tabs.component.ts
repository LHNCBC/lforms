import {Component, Input} from "@angular/core";

@Component({
  selector: 'lhc-group-tabs',
  templateUrl: './lhc-group-tabs.component.html',
  styleUrls: ['./lhc-group-tabs.component.css'],
  standalone: false
})
export class LhcGroupTabsComponent {
  @Input() item;

  constructor() {
  }
}
