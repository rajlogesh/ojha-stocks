import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthBusinessService } from '../../Business/Auth/auth-business.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private authBusiness: AuthBusinessService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const _isAuthenticated =  this.authBusiness.isAuthenticated();
    if (!_isAuthenticated) {
      this.router.navigate(['/auth', 'login']);
    } 
    return _isAuthenticated;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const _isAuthenticated =  this.authBusiness.isAuthenticated();
    if (!_isAuthenticated) {
      this.router.navigate(['/auth', 'login']);
    } 
    return _isAuthenticated;
  }
  
}
