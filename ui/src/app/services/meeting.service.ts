import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meeting } from '../models/meeting.model';
import { UserService } from './user.service';
import { MeetingData } from '../meeting-wizard/models/meeting-data.model';
import { MeetingOption } from '../meeting-wizard/models/meeting-option.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  endpoint = 'http://localhost:3000/meetings';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

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
      start: option.start,
      end: option.end
    };
    return this.http.post<MeetingOption>(`${this.endpoint}/${meetingId}/options`, body, {
      headers: this.headers
    }).toPromise();
  }

  async getMeetingByPublicOrPrivateId(accessId: string): Promise<Meeting> {
    const filter = {
      where: {
        or: [
          { publicId: accessId },
          { privateId: accessId }
        ]
      },
      include: ['user', 'options']
    };
    const meetings = await this.http.get<Meeting[]>(this.endpoint, {
      params: new HttpParams({
        fromObject: {
          filter: JSON.stringify(filter)
        }
      })
    }).toPromise();
    return meetings[0];
  }

  async getById(meetingId): Promise<Meeting> {
    const filter = {
      include: ['user', 'options']
    };
    const endpoint = `${this.endpoint}/${meetingId}`
    const meeting = await this.http.get<Meeting>(endpoint, {
      params: new HttpParams({
        fromObject: {
          filter: JSON.stringify(filter)
        }
      })
    }).toPromise()
    return meeting
  }

  async updateMeeting(meetingId: string, update: object): Promise<Meeting> {
    const endpoint = `${this.endpoint}/${meetingId}`
    await this.http.patch<void>(endpoint, update, { headers: this.headers }).toPromise()
    const meeting = await this.getById(meetingId)
    return meeting
  }
}
