import { TestBed } from '@angular/core/testing';

import { ActivityBusinessService } from './activity-business.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ActivityBusinessService', () => {
  let service: ActivityBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(ActivityBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
