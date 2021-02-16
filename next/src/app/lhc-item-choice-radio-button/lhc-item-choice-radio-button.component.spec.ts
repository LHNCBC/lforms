import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { LhcItemChoiceRadioButtonComponent } from './lhc-item-choice-radio-button.component';

describe('LhcItemChoiceRadioButtonComponent', () => {
  let component: LhcItemChoiceRadioButtonComponent;
  let fixture: ComponentFixture<LhcItemChoiceRadioButtonComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ LhcItemChoiceRadioButtonComponent ],
      imports: [FormsModule, NzRadioModule, NzGridModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemChoiceRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
