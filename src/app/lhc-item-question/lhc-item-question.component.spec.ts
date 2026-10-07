import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LhcItemQuestionComponent } from './lhc-item-question.component';
import { LhcItemQuestionTextComponent } from '../lhc-item-question-text/lhc-item-question-text.component';
import { WindowService } from '../../lib/window.service';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcItemQuestionComponent', () => {
  let component: LhcItemQuestionComponent;
  let fixture: ComponentFixture<LhcItemQuestionComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should normalize an empty two-state checkbox value before rendering the question', fakeAsync(() => {
    const lhcDataService = TestBed.inject(LhcDataService);
    const changeSpy = spyOn(lhcDataService, 'onItemValueChange');
    component.item = {
      value: true,
      defaultAnswer: true,
      _answerRequired: true,
      displayControl: {answerLayout: {type: 'CHECK_BOX'}}
    };
    component.ngDoCheck();
    tick();
    expect(component.item.value).toBeTrue();
    expect(changeSpy).not.toHaveBeenCalled();

    component.item.value = null;
    component.ngDoCheck();

    expect(component.item.value).toBeFalse();
    // dependents are notified after the current change-detection pass
    expect(changeSpy).not.toHaveBeenCalled();
    tick();
    expect(changeSpy).toHaveBeenCalledOnceWith(component.item, false, null);
  }));
});
