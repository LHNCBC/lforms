import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcPopoverComponent } from './lhc-popover.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcPopoverComponent', () => {
  let component: LhcPopoverComponent;
  let fixture: ComponentFixture<LhcPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcPopoverComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
