import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcAutocompleteComponent } from './lhc-autocomplete.component';
import { LhcDataService} from '../../../lib/lhc-data.service';

describe('LhcAutocompleteComponent', () => {
  let component: LhcAutocompleteComponent;
  let fixture: ComponentFixture<LhcAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [LhcDataService],
      declarations: [ LhcAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
