import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemSimpleTypeComponent } from './lhc-item-simple-type.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcItemSimpleTypeComponent', () => {
  let component: LhcItemSimpleTypeComponent;
  let fixture: ComponentFixture<LhcItemSimpleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemSimpleTypeComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemSimpleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
