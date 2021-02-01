import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthMeetingService {
  isLoggedIn = false;
  redirectUrl: string;
  meetingId: string;

  constructor(private router: Router) { }

  verifyAccessCode(password: string): Promise<boolean> {
    if (password === this.meetingId) {
      this.isLoggedIn = true;
      return this.router.navigateByUrl(this.redirectUrl);
    }
    return Promise.resolve(false);
  }
}
