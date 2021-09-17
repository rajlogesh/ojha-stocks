import { TestBed } from '@angular/core/testing';

import { EdgesBusinessService } from './edges-business.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EdgesBusinessService', () => {
  let service: EdgesBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(EdgesBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
