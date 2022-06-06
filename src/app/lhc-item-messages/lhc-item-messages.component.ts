import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'lhc-item-messages',
  templateUrl: './lhc-item-messages.component.html',
  styleUrls: ['./lhc-item-messages.component.css']
})
export class LhcItemMessagesComponent implements OnInit {

  @Input() item;
  constructor() { }

  ngOnInit(): void {
  }

}
