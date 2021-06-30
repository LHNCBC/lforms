import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lhc-validate',
  templateUrl: './lhc-validate.component.html',
  styleUrls: ['./lhc-validate.component.css']
})
export class LhcValidateComponent implements OnInit {

  @Input() item: any;

  constructor() {
  }

  /**
   * Initialize the component
   */
  ngOnInit(): void {
  }

}
