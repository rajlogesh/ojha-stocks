import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEdgesComponent } from './create-edges.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CreateEdgesComponent', () => {
  let component: CreateEdgesComponent;
  let fixture: ComponentFixture<CreateEdgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule],
      declarations: [ CreateEdgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEdgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
