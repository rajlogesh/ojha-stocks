import { TestBed } from '@angular/core/testing';

import { ActivityFacadeService } from './activity-facade.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ActivityFacadeService', () => {
  let service: ActivityFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(ActivityFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
