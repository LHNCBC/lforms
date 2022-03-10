import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LhcItemChoiceComponent } from './lhc-item-choice.component';

describe('LhcItemChoiceComponent', () => {
  let component: LhcItemChoiceComponent;
  let fixture: ComponentFixture<LhcItemChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemChoiceComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
