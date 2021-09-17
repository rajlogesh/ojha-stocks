import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialogModule,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RemoveTableDataComponent } from './remove-table-data.component';

describe('RemoveTableDataComponent', () => {
  let component: RemoveTableDataComponent;
  let fixture: ComponentFixture<RemoveTableDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
      ],
      declarations: [ RemoveTableDataComponent ],
      providers: [{provide : MatDialogRef, useValue : {}}, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
