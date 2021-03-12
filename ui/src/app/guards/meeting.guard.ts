import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthMeetingService } from '../services/auth-meeting.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingGuard implements CanActivate {
  constructor(private authMeetingService: AuthMeetingService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { url } = state;
    if (this.authMeetingService.isLoggedIn) {
      return true;
    }
    const accessId = route.paramMap.get('id');
    this.authMeetingService.redirectUrl = url;
    this.authMeetingService.meetingAccessId = accessId;
    return this.router.parseUrl('/reu/checkin');
  }

}
