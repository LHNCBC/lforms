import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemTextComponent } from './lhc-item-text.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcItemTextComponent', () => {
  let component: LhcItemTextComponent;
  let fixture: ComponentFixture<LhcItemTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemTextComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
