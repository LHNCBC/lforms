import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LhcDataService} from '../../lib/lhc-data.service';
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lhc-item-boolean',
  templateUrl: './lhc-item-boolean.component.html',
  styleUrls: ['./lhc-item-boolean.component.css']
})
export class LhcItemBooleanComponent implements OnInit, AfterViewInit {
  @Input() item: any;

  @ViewChild('nzSwitchComponent') nzSwitchComponent: NzSwitchComponent;

  constructor(public lhcDataService: LhcDataService, private elRef:ElementRef, private liveAnnouncer: LiveAnnouncer) { }

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
    // Announce value when changed.
    this.nzSwitchComponent.registerOnChange((value) => {
      this.liveAnnouncer.announce(value);
    });
  }

}
