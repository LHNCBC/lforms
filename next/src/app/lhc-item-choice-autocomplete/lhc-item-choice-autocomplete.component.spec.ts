import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemChoiceAutocompleteComponent } from './lhc-item-choice-autocomplete.component';
import { LhcDataService} from '../../lib/lhc-data.service';
    
describe('LhcItemChoiceAutocompleteComponent', () => {
  let component: LhcItemChoiceAutocompleteComponent;
  let fixture: ComponentFixture<LhcItemChoiceAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemChoiceAutocompleteComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemChoiceAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
