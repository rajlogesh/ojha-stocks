import { TestBed } from '@angular/core/testing';

import { InterdataServiceService } from './interdata-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InterdataServiceService', () => {
  let service: InterdataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(InterdataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
