import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityToolBarComponent } from './activity-tool-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('ActivityToolBarComponent', () => {
  let component: ActivityToolBarComponent;
  let fixture: ComponentFixture<ActivityToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule],
      declarations: [ ActivityToolBarComponent ],
      providers: [
        MatDialog
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
