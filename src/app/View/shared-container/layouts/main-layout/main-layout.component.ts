import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, mergeMap, map } from 'rxjs/operators';
import { AuthFacadeService } from 'src/app/Facades/auth-facade/auth-facade.service';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  pageTitle = '';
  showTitleBar = true;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public authFacade: AuthFacadeService
  ) {
    this.fetchRouterData();
  }

  ngOnInit(): void {}

  fetchRouterData() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute.firstChild.firstChild;
        if (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => route['data'])
    ).subscribe(data => {
      this.pageTitle = data['pageTitle'] || 'Dashboard';
      if (data['titleBar'] === undefined ) {
        this.showTitleBar = true;
      } else {
        this.showTitleBar = data['titleBar'];
      }
    }, error => {
      this.pageTitle = '';
      this.showTitleBar = true;
    });
  }

  doLogout(event) {
    this.authFacade.logout();
  }

}
