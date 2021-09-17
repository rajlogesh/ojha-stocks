import { TestBed } from '@angular/core/testing';

import { SettingsBusinessService } from './settings-business.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SettingsBusinessService', () => {
  let service: SettingsBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(SettingsBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
