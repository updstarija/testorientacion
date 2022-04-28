import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { take, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AngularFireAuth, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot) {
        return this.auth.authState.pipe(
            take(1),
            switchMap(async (authState) => {
                console.log(authState);
                if (!authState) { 
                    this.router.navigate(['/inicio'])
                    return false
                }
                else{
                    return true;
                }
            }),
        )
    }
}