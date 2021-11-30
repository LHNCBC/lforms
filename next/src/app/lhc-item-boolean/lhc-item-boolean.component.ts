import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LhcDataService} from '../../lib/lhc-data.service';
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {CommonUtilsService} from "../../lib/common-utils.service";

@Component({
  selector: 'lhc-item-boolean',
  templateUrl: './lhc-item-boolean.component.html',
  styleUrls: ['./lhc-item-boolean.component.css']
})
export class LhcItemBooleanComponent implements OnInit, AfterViewInit {
  @Input() item: any;

  @ViewChild('nzSwitchComponent') nzSwitchComponent: NzSwitchComponent;

  constructor(public lhcDataService: LhcDataService,
              private elRef:ElementRef,
              private liveAnnouncer: LiveAnnouncer,
              private commonUtilsService: CommonUtilsService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() : void {
    //console.log('lhc-item-boolean, ngOnDestroy')
  }

  ngAfterViewInit() {
    // Set aria-label attribute of the actual <button> element.
    const button = this.elRef.nativeElement.querySelector('button[nz-wave]');
    if (button) {
      button.setAttribute('aria-label', this.commonUtilsService.getAriaLabel(this.item));
    }
  }

  onModelChange(value) {
    this.liveAnnouncer.announce(value);
  }

}
