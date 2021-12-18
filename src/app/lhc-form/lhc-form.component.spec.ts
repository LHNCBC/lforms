import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcFormComponent } from './lhc-form.component';
import { LhcDataService} from '../../lib/lhc-data.service';
import { WindowService } from '../../lib/window.service';

describe('LhcFormComponent', () => {
  let component: LhcFormComponent;
  let fixture: ComponentFixture<LhcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcFormComponent ],
      providers: [LhcDataService, WindowService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
