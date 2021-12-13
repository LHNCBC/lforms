import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemGroupComponent } from './lhc-item-group.component';
import { LhcItemQuestionTextComponent } from '../lhc-item-question-text/lhc-item-question-text.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcItemGroupComponent', () => {
  let component: LhcItemGroupComponent;
  let fixture: ComponentFixture<LhcItemGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        LhcItemGroupComponent,
        LhcItemQuestionTextComponent
      ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
