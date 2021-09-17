import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityMessageListComponent } from './activity-message-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('ActivityMessageListComponent', () => {
  let component: ActivityMessageListComponent;
  let fixture: ComponentFixture<ActivityMessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ ActivityMessageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityMessageListComponent);
    component = fixture.componentInstance;
    component.detail = {label: '450_Omplx999', createdTime: '',
    updatedTime: '',
    messageType: 'temp', messageTypeVersion: '1.0.0', sender: 'sender',
    source: '35.175.25.113', status: 'Received', messageReferenceId: ''};
    component.fileContent = { fileContent: 'test input' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
//   it('should correctly render the passed @Input value', () => {
//     component.detail.label = 'test input';
//     fixture.detectChanges();
//     expect(fixture.nativeElement.innerText).toBe('test input');
//   });
});
