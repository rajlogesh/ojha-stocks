import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edges-heartbeats',
  templateUrl: './edges-heartbeats.component.html',
  styleUrls: ['./edges-heartbeats.component.scss']
})
export class EdgesHeartbeatsComponent implements OnInit {


  heartbeatsDC = ['heartbeatTime', 'message', 'status'];
  @Input('heartbeatList') heartbeatList = [];

  constructor() { }

  ngOnInit(): void {
  }

  get isHBAvailable() {
    return (Object.keys(this.heartbeatList).length > 0)?(true):(false);
  }

}
