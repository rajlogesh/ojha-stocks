import { TestBed } from '@angular/core/testing';

import { AuthFacadeService } from './auth-facade.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthFacadeService', () => {
  let service: AuthFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(AuthFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
