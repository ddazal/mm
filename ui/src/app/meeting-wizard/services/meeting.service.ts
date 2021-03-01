import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meeting } from 'src/app/models/meeting.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MeetingData } from '../models/meeting-data.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient, private userService: UserService) { }

  async scheduleMeeting(data: MeetingData): Promise<Meeting> {
    let user = await this.userService.findByEmail(data.admin.email);
    if (!user) {
      user = await this.userService.create(data.admin);
    }
    const meeting = await this.userService.addMeeting(user.id, data);
    return meeting;
  }
}
