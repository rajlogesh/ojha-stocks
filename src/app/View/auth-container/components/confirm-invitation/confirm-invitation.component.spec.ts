import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInvitationComponent } from './confirm-invitation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ConfirmInvitationComponent', () => {
  let component: ConfirmInvitationComponent;
  let fixture: ComponentFixture<ConfirmInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule,
        FormsModule],
      declarations: [ ConfirmInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
