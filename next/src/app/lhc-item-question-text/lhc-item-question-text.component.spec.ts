import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemQuestionTextComponent } from './lhc-item-question-text.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcItemQuestionTextComponent', () => {
  let component: LhcItemQuestionTextComponent;
  let fixture: ComponentFixture<LhcItemQuestionTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemQuestionTextComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemQuestionTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
