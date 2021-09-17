import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-activity-tool-bar',
  templateUrl: './activity-tool-bar.component.html',
  styleUrls: ['./activity-tool-bar.component.scss']
})
export class ActivityToolBarComponent implements OnInit {

  durationFilterSelected = 10;
  fpDisabled = true;
  lpDisabled = true;
  limit = environment.dataSetLimit;

  @Input('loading$') loading$ = new Observable();
  @Output('durationChanged') durationChangedEvent = new EventEmitter();
  @Output('searchTerm') searchTermEvent = new EventEmitter();
  @Input('dsControls$') dsControls$ = new Observable();
  @Output('requestDS') requestDSEvent = new EventEmitter();

  constructor() { }
  ngOnInit(): void {
    this.refreshMA();
    this.listenDSControls();
  }

  listenDSControls() {
    this.dsControls$.subscribe((data) => {
      this.lpDisabled = !data['nextDSPage'];
      this.fpDisabled = !data['prevDSPage']
    });
  }

  filterChanged(durationFilter) {
    this.durationChangedEvent.emit(this.durationFilterSelected);
  }

  activityFilter(e) {
    this.searchTermEvent.emit(e.target.value);
  }

  refreshMA() {
    this.durationChangedEvent.emit(this.durationFilterSelected);
  }

  prevDS() {
    this.requestDSEvent.emit('prev');
  }

  nextDS() {
    this.requestDSEvent.emit('next');
  }

}
