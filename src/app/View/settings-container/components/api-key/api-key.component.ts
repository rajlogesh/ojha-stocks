import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-api-key',
  templateUrl: './api-key.component.html',
  styleUrls: ['./api-key.component.scss']
})
export class ApiKeyComponent implements OnInit {

  loading = false;
  @Input('APIKeyStatus$') APIKeyStatus$ = new Observable();
  apistatus = 'initial';

  @Input('APIKey$') APIKey$ = new Observable();
  @Output('refreshAPIKey') refreshAPIKeyEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.APIKey$.subscribe((res) => {
      this.loading = false;
    });
    this.APIKeyStatus$.subscribe((status: any) => {
      this.apistatus = status;
    });
  }

  refreshAPIKey() {
    this.loading = true;
    this.refreshAPIKeyEvent.emit('refresh');
  }

  deleteAPIKey() {
    this.loading = true;
    this.refreshAPIKeyEvent.emit('delete');
  }

}
