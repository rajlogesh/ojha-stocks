import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthFacadeService } from 'src/app/Facades/auth-facade/auth-facade.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input('menuIconState') menuIconState = false;
  @Output('sidebarToggle') sidebarEvent = new EventEmitter();
  @Output('logoutEvent') logoutEvent = new EventEmitter();
  @Input('pageTitle') pageTitle = '';
  @Input('showTitleBar') showTitleBar = true;
  userDetails = {};

  constructor(
    public dialog: MatDialog,
    private authFacade: AuthFacadeService
  ) { }

  ngOnInit(): void {
    this.authFacade.getUserInformation()
      .subscribe((res) => {
        this.userDetails = res;
      }, (error) => {
        // nothing
      });
  }

  openDialog(): void {
    this.dialog.open(SearchComponent, { width: '75vw', height: '75vh' });
  }

  toggleSidebar() {
    this.menuIconState = !this.menuIconState;
    this.sidebarEvent.emit('toggle');
  }

  doLogout() {
    this.logoutEvent.emit('dologout');
  }

}
