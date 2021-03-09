import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meeting } from 'src/app/models/meeting.model';
import { UserService } from '../../services/user.service';
import { MeetingData } from '../models/meeting-data.model';
import { MeetingOption } from '../models/meeting-option.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  endpoint = 'http://localhost:3000/meetings';

  constructor(private http: HttpClient, private userService: UserService) { }

  async scheduleMeeting(data: MeetingData): Promise<Meeting> {
    let user = await this.userService.findByEmail(data.admin.email);
    if (!user) {
      user = await this.userService.create(data.admin);
    }
    const meeting = await this.userService.addMeeting(user.id, data);
    return meeting;
  }

  async createMeetingOption(meetingId: string, option: MeetingOption): Promise<MeetingOption> {
    const body = {
      startTime: option.start,
      endTime: option.end
    }
    return this.http.post<MeetingOption>(`${this.endpoint}/${meetingId}/options`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).toPromise()
  }
}
