import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcGroupVerticalComponent } from './lhc-group-vertical.component';
import { LhcDataService} from '../../lib/lhc-data.service';
import { WindowService} from '../../lib/window.service';

describe('LhcGroupVerticalComponent', () => {
  let component: LhcGroupVerticalComponent;
  let fixture: ComponentFixture<LhcGroupVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcGroupVerticalComponent ],
      providers: [LhcDataService, WindowService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcGroupVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
