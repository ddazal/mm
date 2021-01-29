import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
