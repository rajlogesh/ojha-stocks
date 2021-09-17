import { TestBed } from '@angular/core/testing';

import { HttpHelperService } from './http-helper.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HttpHelperService', () => {
  let service: HttpHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(HttpHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
