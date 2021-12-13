import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhcWatcherComponent } from './lhc-watcher.component';
import { LhcDataService} from '../../lib/lhc-data.service';

describe('LhcWatcherComponent', () => {
  let component: LhcWatcherComponent;
  let fixture: ComponentFixture<LhcWatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcWatcherComponent ],
      providers: [LhcDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
