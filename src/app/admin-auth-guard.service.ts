import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) { }

  canActivate(): Observable<boolean> {
    // return this.auth.user$.pipe(
    //   switchMap(user => {
    //     return this.userService.get(user.uid);
    //   }),
    //   map(appUser => {
    //     return appUser.isAdmin;
    //   })
    // );
    return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin));
  }
}
/*

todo: попрацювати з світчмапою і спробувати забрати пайп


 */