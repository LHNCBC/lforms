import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemDateComponent } from './lhc-item-date.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcItemDateComponent', () => {
  let component: LhcItemDateComponent;
  let fixture: ComponentFixture<LhcItemDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemDateComponent ],
      providers: [LhcDataService]
    })
    .compileComponents()

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
