import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemTimeComponent } from './lhc-item-time.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcItemTimeComponent', () => {
  let component: LhcItemTimeComponent;
  let fixture: ComponentFixture<LhcItemTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemTimeComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
