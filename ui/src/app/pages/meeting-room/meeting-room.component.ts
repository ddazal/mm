import { Component, OnInit } from '@angular/core';
import { AuthMeetingService } from 'src/app/services/auth-meeting.service';
import { MeetingOptionService } from 'src/app/services/meeting-option.service';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/models/meeting.model';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
})
export class MeetingRoomComponent implements OnInit {
  meeting: Meeting;
  isAdminView: boolean;

  saving = false;
  deactivating = false;
  updating = false;
  activeModalUpdate = false;
  notify: boolean;


  constructor(
    private authMeetingService: AuthMeetingService,
    private meetingOptionService: MeetingOptionService,
    private meetingService: MeetingService,
    private router: Router
  ) {
    const { state } = this.router.getCurrentNavigation().extras
    this.notify = state && state.success
  }

  ngOnInit(): void {
    this.setup();
  }

  setup(): void {
    this.meeting = this.authMeetingService.accessedMetting;
    this.isAdminView = this.authMeetingService.asAdmin;
  }

  toggleFlag(flag: string): void {
    this[flag] = !this[flag];
  }

  async closeVoting(): Promise<void> {
    this.toggleFlag('deactivating');
    const meeting = await this.meetingService.updateMeeting(this.meeting.id, { isActive: false });
    this.meeting = meeting;
    this.toggleFlag('deactivating');
  }

  async openVoting(): Promise<void> {
    this.toggleFlag('deactivating');
    const meeting = await this.meetingService.updateMeeting(this.meeting.id, { isActive: true });
    this.meeting = meeting;
    this.toggleFlag('deactivating');
  }

  async updateMeetingInfo(data: { title: string, description: string }): Promise<void> {
    this.toggleFlag('updating');
    const meeting = await this.meetingService.updateMeeting(this.meeting.id, data);
    this.meeting = meeting;
    this.toggleFlag('updating');
    this.toggleFlag('activeModalUpdate');
  }

  async saveVotes(data: { votes: any[], participant: string }): Promise<void> {
    this.toggleFlag('saving');
    try {
      await this.meetingOptionService.addVotes(data.votes, data.participant);
      this.router.navigate(['/reu/checkout']);
    } catch (error) {
      console.error(error);
    }
  }
}
