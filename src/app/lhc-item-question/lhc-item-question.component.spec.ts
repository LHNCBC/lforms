import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemQuestionComponent } from './lhc-item-question.component';
import { LhcItemQuestionTextComponent } from '../lhc-item-question-text/lhc-item-question-text.component';
import { WindowService } from '../../lib/window.service';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcItemQuestionComponent', () => {
  let component: LhcItemQuestionComponent;
  let fixture: ComponentFixture<LhcItemQuestionComponent>;
  let windowService: WindowService;
  let lhcDataService: LhcDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        LhcItemQuestionComponent,
        LhcItemQuestionTextComponent 
      ],
      providers: [LhcDataService, WindowService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemQuestionComponent);
    component = fixture.componentInstance;
    windowService = TestBed.inject(WindowService);
    lhcDataService = TestBed.inject(LhcDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use an optional tab width with a half-form-width fallback in large view mode', () => {
    spyOn(lhcDataService, 'getItemViewModeClass').and.returnValue('lhc-item-view-lg');

    windowService.setWindowWidth(800);

    expect(component.eleStyle).toEqual({
      width: 'var(--lhc-tab-content-answer-width, 400px)'
    });
  });

  it('should not set an answer column width outside large view mode', () => {
    spyOn(lhcDataService, 'getItemViewModeClass').and.returnValue('lhc-item-view-md');

    windowService.setWindowWidth(600);

    expect(component.eleStyle).toBeNull();
  });
});
