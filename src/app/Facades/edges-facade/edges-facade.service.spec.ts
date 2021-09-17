import { TestBed } from '@angular/core/testing';

import { EdgesFacadeService } from './edges-facade.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EdgesFacadeService', () => {
  let service: EdgesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(EdgesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
