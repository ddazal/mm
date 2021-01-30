import { Injectable } from '@angular/core';
import { MeetingData } from '../models/meeting-data.model';
import { MeetingService } from '../services/meeting.service'

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

  async scheduleMeeting(data: MeetingData): Promise<void> {
    const meeting = await this.meetingService.scheduleMeeting(data);
    console.log(meeting);
  }
}
