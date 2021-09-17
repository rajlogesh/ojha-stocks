import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @ViewChild('snav') sidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @Input('pageTitle') pageTitle;
  @Input('showTitleBar') showTitleBar = true;
  menuState = false;
  @Output('doLogout') doLogoutEvent = new EventEmitter();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleSideBar(event) {
    this.menuState = !this.menuState;
    this.sidenav.toggle();
  }

  doLogout(event) {
    this.doLogoutEvent.emit('doLogout');
  }

}
