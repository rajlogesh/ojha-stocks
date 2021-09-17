import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgesUpdateComponent } from './edges-update.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('EdgesUpdateComponent', () => {
  let component: EdgesUpdateComponent;
  let fixture: ComponentFixture<EdgesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule,
        FormsModule, MatDialogModule],
      declarations: [ EdgesUpdateComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
