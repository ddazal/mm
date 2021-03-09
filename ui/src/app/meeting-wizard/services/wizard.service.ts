import { Injectable } from '@angular/core';
import { Meeting } from 'src/app/models/meeting.model';
import { MeetingData } from '../models/meeting-data.model';
import { MeetingOption } from '../models/meeting-option.model';
import { MeetingService } from '../services/meeting.service';

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

  async addMeetingOptions(meetingId: string, options: MeetingOption[]) {
    const opts = options.map(option => this.meetingService.createMeetingOption(meetingId, option))
    return Promise.all(opts)
  }
}
