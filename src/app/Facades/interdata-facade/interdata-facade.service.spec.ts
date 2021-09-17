import { TestBed } from '@angular/core/testing';

import { InterdataFacadeService } from './interdata-facade.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InterdataFacadeService', () => {
  let service: InterdataFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(InterdataFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
