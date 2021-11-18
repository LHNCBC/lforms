import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-boolean',
  templateUrl: './lhc-item-boolean.component.html',
  styleUrls: ['./lhc-item-boolean.component.css']
})
export class LhcItemBooleanComponent implements OnInit, AfterViewInit {
  @Input() item: any;

  constructor(public lhcDataService: LhcDataService, private elRef:ElementRef) { }

  ngOnInit(): void {
  }

  ngOnDestroy() : void {
    //console.log('lhc-item-boolean, ngOnDestroy')
  }

  ngAfterViewInit() {
    // Set id attribute of the actual <button> element, so that it is associated with the
    // label in corresponding question text component and the label will be announced.
    const button = this.elRef.nativeElement.querySelector('button[nz-wave]');
    button && (button.id = this.item._elementId);
  }

}
