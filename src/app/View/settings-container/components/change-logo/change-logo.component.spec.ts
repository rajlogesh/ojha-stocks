import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLogoComponent } from './change-logo.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SettingsComponent } from '../../settings/settings.component';
// class MockService extends SettingsComponent {
//   doStuff() {
//     return this;
//   }
//}
describe('ChangeLogoComponent', () => {
  let component: ChangeLogoComponent;
  let fixture: ComponentFixture<ChangeLogoComponent>;
 // let mockService;
  beforeEach(async(() => {
  //  mockService = new MockService();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ ChangeLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLogoComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
