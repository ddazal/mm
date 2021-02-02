import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Meeting } from '../models/meeting.model';

@Injectable({
  providedIn: 'root'
})
export class AuthMeetingService {
  isLoggedIn = false;
  redirectUrl: string;
  meetingAccessId: string;

  constructor(private router: Router, private http: HttpClient) { }

  async verifyAccessCode(password: string): Promise<boolean> {
    const filter = {
      where: {
        or: [
          { publicId: this.meetingAccessId },
          { privateId: this.meetingAccessId }
        ]
      }
    };
    const meetings = await this.http.get<Meeting[]>(`http://localhost:3000/meetings`, {
      params: new HttpParams({
        fromObject: {
          filter: JSON.stringify(filter)
        }
      })
    }).toPromise();
    if (!meetings.length) {
      return false;
    }
    const meeting = meetings[0];
    if (password === meeting.accessCode) {
      this.isLoggedIn = true;
      return this.router.navigateByUrl(this.redirectUrl);
    }
    return false;
  }
}
