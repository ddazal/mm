import { Injectable } from '@angular/core';
import { Meeting } from '../models/meeting.model';
import { MeetingData } from '../meeting-wizard/models/meeting-data.model';
import { MeetingOption } from '../meeting-wizard/models/meeting-option.model';
import { MeetingService } from './meeting.service';

@Injectable({
  providedIn: 'root',
})
export class WizardService {
  private data: MeetingData = {
    title: '',
    description: '',
    options: [],
    admin: {
      name: '',
      email: '',
    },
    guests: []
  };

  constructor(private meetingService: MeetingService) { }

  getData(): MeetingData {
    return this.data;
  }

  updateData(data: MeetingData): void {
    this.data = data;
  }

  async scheduleMeeting(data: MeetingData): Promise<Meeting> {
    const meeting = await this.meetingService.scheduleMeeting(data);
    return meeting;
  }

  async addMeetingOptions(meetingId: string, options: MeetingOption[]): Promise<MeetingOption[]> {
    const opts = options.map(option => this.meetingService.createMeetingOption(meetingId, option));
    return Promise.all(opts);
  }
}
