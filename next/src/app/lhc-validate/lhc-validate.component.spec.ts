import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcValidateComponent } from './lhc-validate.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcValidateComponent', () => {
  let component: LhcValidateComponent;
  let fixture: ComponentFixture<LhcValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcValidateComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
