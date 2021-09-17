import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private _profileDetails;
  @Input('profileFetchError') profileFetchError = false;
  @Output('fetchProfileDetails') fetchProfileDetailsEvent = new EventEmitter();
  loading = false;

  @Input('profileDetails') set profileDetails(data) {
    this._profileDetails = data;
    this.loading = false;
  }

  get profileDetails() {
    return this._profileDetails;
  }

  constructor() { }

  ngOnInit(): void {
    this.fetchProfileDetails();
  }

  fetchProfileDetails() {
    this.loading = true;
    this.fetchProfileDetailsEvent.emit('fetchProfileDetails');
  }

}
