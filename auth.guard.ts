import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    if (localStorage.getItem("token") != null) {
      return true;
    } else{
        this.router.navigateByUrl("/login");
        return false;

    } 
  }
}
