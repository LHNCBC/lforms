import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'lhc-input',
  templateUrl: './lhc-input.component.html',
  styleUrls: ['./lhc-input.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})


export class LhcInputComponent implements OnInit {

  // Handles the input fields for simple data types, such as integer, decimal,
  // string, and etc.
  @Input() item;

  constructor() { }

  /**
   * Initialize the component
   */
  ngOnInit(): void {
  }

}


