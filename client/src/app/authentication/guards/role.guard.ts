import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private toastService: ToastrService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!route.data.roles || route.data.roles.indexOf(this.authService.getRole()) !== -1) {
      return true;
    } else {
      this.toastService.warning("Vous n'avez pas les droits pour acceder à cette ressource", '', {
        progressBar: true,
        closeButton: true,
        tapToDismiss: false
      });
      return false;
    }
  }

}
