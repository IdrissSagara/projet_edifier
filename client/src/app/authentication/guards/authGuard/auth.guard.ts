import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isloggedIn()) {
      // get the roles and see if it matches the ones which can access
      if (!route.data.roles || route.data.roles.indexOf(this.auth.getRole()) !== -1) {
        return true;
      } else { // user is auth but does not have accreditation to see this route
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        // console.log('Vous n\'avez pas les droits nécessaires pour acceder à cette route');
        return false;
      }
    } else {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then(r => {
        // console.error("Vous devez vous authentifier pour acceder à cette ressource");
        // this.toastService.toastError("Vous devez vous authentifier pour acceder à cette ressource");
      });
      return false;
    }
  }

}
