import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateInterdataViewComponent } from './create-interdata-view.component';
import {HttpClientModule} from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateInterdataViewComponent', () => {
  let component: CreateInterdataViewComponent;
  let fixture: ComponentFixture<CreateInterdataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatChipsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule
      ],
      declarations: [ CreateInterdataViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInterdataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
