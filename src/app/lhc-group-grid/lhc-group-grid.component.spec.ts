import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcDataService} from '../../lib/lhc-data.service';

import { LhcGroupGridComponent } from './lhc-group-grid.component';

describe('LhcGroupGridComponent', () => {
  let component: LhcGroupGridComponent;
  let fixture: ComponentFixture<LhcGroupGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcGroupGridComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LhcGroupGridComponent);
    component = fixture.componentInstance;
    
    component.item = {
      items: [{
        answers: [],
        items: []
      }]
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
