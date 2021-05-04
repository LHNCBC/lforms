import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lhc-item-time',
  templateUrl: './lhc-item-time.component.html',
  styleUrls: ['./lhc-item-time.component.css']
})
export class LhcItemTimeComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

  time: Date | null = null;
  
  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

}
