import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcItemBooleanComponent } from './lhc-item-boolean.component';
import { LhcDataService} from '../../lib/lhc-data.service';
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { FormsModule } from '@angular/forms';

describe('LhcItemBooleanComponent', () => {
  let component: LhcItemBooleanComponent;
  let fixture: ComponentFixture<LhcItemBooleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcItemBooleanComponent ],
      imports: [NzSwitchModule, FormsModule],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemBooleanComponent);
    component = fixture.componentInstance;
    component.item = {
      _elementId: 1,
      question: 'question'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
