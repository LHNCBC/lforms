import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcInputComponent } from './lhc-input.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcInputComponent', () => {
  let component: LhcInputComponent;
  let fixture: ComponentFixture<LhcInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcInputComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
