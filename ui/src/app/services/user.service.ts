import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MeetingData } from '../meeting-wizard/models/meeting-data.model';
import { Meeting } from '../models/meeting.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  async findByEmail(email: string): Promise<User> {
    const filter = { where: { email } };
    const users = await this.http.get<User[]>(this.endpoint, {
      params: new HttpParams({
        fromObject: {
          filter: JSON.stringify(filter)
        }
      })
    }).toPromise();
    return users[0];
  }

  async create(data: { name: string, email: string }): Promise<User> {
    const user = await this.http.post<User>(this.endpoint, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).toPromise();
    return user;
  }

  async addMeeting(userId: string, data: MeetingData): Promise<Meeting> {
    const endpoint = `${this.endpoint}/${userId}/meetings`;
    const body = { title: data.title, description: data.description };
    return this.http.post<Meeting>(endpoint, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).toPromise();
  }
}
