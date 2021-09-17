import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgesHeartbeatsComponent } from './edges-heartbeats.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EdgesHeartbeatsComponent', () => {
  let component: EdgesHeartbeatsComponent;
  let fixture: ComponentFixture<EdgesHeartbeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ EdgesHeartbeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgesHeartbeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
