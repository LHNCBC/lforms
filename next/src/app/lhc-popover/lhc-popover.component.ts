import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lhc-popover',
  templateUrl: './lhc-popover.component.html',
  styleUrls: ['./lhc-popover.component.css']
})
export class LhcPopoverComponent implements OnInit {

  @Input() item: any;
  @Input() popoverType: string;
  @Input() formLevel: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}
