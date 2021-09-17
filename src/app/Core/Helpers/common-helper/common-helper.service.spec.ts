import { TestBed } from '@angular/core/testing';

import { CommonHelperService } from './common-helper.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CommonHelperService', () => {
  let service: CommonHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(CommonHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
