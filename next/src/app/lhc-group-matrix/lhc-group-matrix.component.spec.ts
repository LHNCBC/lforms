import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcGroupMatrixComponent } from './lhc-group-matrix.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcGroupMatrixComponent', () => {
  let component: LhcGroupMatrixComponent;
  let fixture: ComponentFixture<LhcGroupMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcGroupMatrixComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcGroupMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
