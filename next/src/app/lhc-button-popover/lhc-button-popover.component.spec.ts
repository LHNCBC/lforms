import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcButtonPopoverComponent } from './lhc-button-popover.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcPopoverComponent', () => {
  let component: LhcButtonPopoverComponent;
  let fixture: ComponentFixture<LhcButtonPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcButtonPopoverComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcButtonPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
