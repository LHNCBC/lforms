import { Component, OnInit, Input } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-group-matrix',
  templateUrl: './lhc-group-matrix.component.html',
  styleUrls: ['./lhc-group-matrix.component.css']
})
export class LhcGroupMatrixComponent implements OnInit {

  @Input() item;

  constructor(public lhcDataService: LhcDataService) {
  }

  ngOnInit(): void {
  }

}
