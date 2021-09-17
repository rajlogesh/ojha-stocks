import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EdgeCertificateComponent } from './edge-certificate.component';
import {HttpClientModule} from '@angular/common/http';

describe('EdgeCertificateComponent', () => {
  let component: EdgeCertificateComponent;
  let fixture: ComponentFixture<EdgeCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [ EdgeCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
