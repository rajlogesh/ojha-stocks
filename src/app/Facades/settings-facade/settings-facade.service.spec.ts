import { TestBed } from '@angular/core/testing';

import { SettingsFacadeService } from './settings-facade.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SettingsFacadeService', () => {
  let service: SettingsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(SettingsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
