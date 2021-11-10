import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemComponent } from './lhc-item.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcItemComponent', () => {
  let component: LhcItemComponent;
  let fixture: ComponentFixture<LhcItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
