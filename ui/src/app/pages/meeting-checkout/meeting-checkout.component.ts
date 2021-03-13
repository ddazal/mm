import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/models/meeting.model';
import { AuthMeetingService } from 'src/app/services/auth-meeting.service';

@Component({
  selector: 'app-meeting-checkout',
  templateUrl: './meeting-checkout.component.html',
})
export class MeetingCheckoutComponent implements OnInit {
  meeting: Meeting;

  constructor(private authMeetingService: AuthMeetingService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authMeetingService.redirectUrl || !this.authMeetingService.meetingAccessId) {
      this.router.navigateByUrl('/');
    }
    this.meeting = this.authMeetingService.accessedMetting;
    this.authMeetingService.reset();
  }

}
