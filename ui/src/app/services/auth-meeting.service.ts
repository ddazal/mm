import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Meeting } from '../models/meeting.model';
import { MeetingService } from './meeting.service';

@Injectable({
  providedIn: 'root'
})
export class AuthMeetingService {
  isLoggedIn = false;
  redirectUrl: string;
  meetingAccessId: string;
  accessedMetting: Meeting;

  constructor(private router: Router, private http: HttpClient, private meetingService: MeetingService) { }

  async verifyAccessCode(password: string): Promise<boolean> {
    const meeting = await this.meetingService.getMeetingByPublicOrPrivateId(this.meetingAccessId);
    if (!meeting) {
      return false;
    }
    if (password === meeting.accessCode) {
      this.accessedMetting = meeting;
      this.isLoggedIn = true;
      return this.router.navigateByUrl(this.redirectUrl);
    }
    return false;
  }

  reset() {
    this.isLoggedIn = false;
    this.redirectUrl = '';
    this.meetingAccessId = '';
    this.accessedMetting = null;
  }
}
