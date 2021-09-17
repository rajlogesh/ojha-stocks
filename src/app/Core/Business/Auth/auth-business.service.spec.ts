import { TestBed } from '@angular/core/testing';

import { AuthBusinessService } from './auth-business.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthBusinessService', () => {
  let service: AuthBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(AuthBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
