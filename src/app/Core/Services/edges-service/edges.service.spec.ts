import { TestBed } from '@angular/core/testing';

import { EdgesService } from './edges.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EdgesService', () => {
  let service: EdgesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(EdgesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
