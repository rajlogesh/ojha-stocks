import { TestBed } from '@angular/core/testing';

import { InterdataBusinessService } from './interdata-business.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InterdataBusinessService', () => {
  let service: InterdataBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(InterdataBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
