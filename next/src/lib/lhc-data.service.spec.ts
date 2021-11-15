import { TestBed } from '@angular/core/testing';

import { LhcDataService } from './lhc-data.service';

describe('LhcDataService', () => {
  let service: LhcDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [LhcDataService]
    });
    service = TestBed.inject(LhcDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
