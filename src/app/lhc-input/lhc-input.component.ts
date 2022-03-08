import { Component, OnInit, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-input',
  templateUrl: './lhc-input.component.html',
  styleUrls: ['./lhc-input.component.css']
})

export class LhcInputComponent {

  // Handles the input fields for simple data types, such as integer, decimal,
  // string, and etc.
  @Input() item;

  constructor(public lhcDataService: LhcDataService) { }

}


