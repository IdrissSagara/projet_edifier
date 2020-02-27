import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {ToastService} from '../service/toast.service';
import {ToastyService} from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private toastService: ToastService,
              private toasty: ToastyService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isloggedIn()) {
      // get the roles and see if it matches the ones which can access
      if (!route.data.roles || route.data.roles.indexOf(this.auth.getRole()) !== -1) {
        return true;
      } else { // user is auth but does not have accreditation to see this route
        this.router.navigate(['/auth/login']);
        console.log('Vous n\'avez pas les droits nécessaires pour acceder à cette route');
        this.toasty.info("Vous n'avez pas les droits nécessaires pour acceder à cette route");
        return false;
      }
    } else {
      this.router.navigate(['/auth/login']).then(r => {
        console.error("Vous devez vous authentifier pour acceder à cette ressource");
        // this.toastService.toastError("Vous devez vous authentifier pour acceder à cette ressource");
      });
      return false;
    }
  }

}