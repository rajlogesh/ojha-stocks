import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgesManifestComponent } from './edges-manifest.component';

describe('EdgesManifestComponent', () => {
  let component: EdgesManifestComponent;
  let fixture: ComponentFixture<EdgesManifestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgesManifestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgesManifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
