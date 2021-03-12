import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthMeetingService } from 'src/app/services/auth-meeting.service';

@Component({
  selector: 'app-meeting-checkin',
  templateUrl: './meeting-checkin.component.html',
})
export class MeetingCheckinComponent implements OnInit {
  accessCode: FormControl = new FormControl('', Validators.required);
  incorrectAccessCode = false;

  constructor(private authMeetingService: AuthMeetingService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authMeetingService.redirectUrl || !this.authMeetingService.meetingAccessId) {
      this.router.navigateByUrl('/');
    }
  }

  async verifyAccessCode(): Promise<boolean | void> {
    const code = this.accessCode.value;
    const success = await this.authMeetingService.verifyAccessCode(code);
    if (!success) {
      this.incorrectAccessCode = true;
    }
  }

}
