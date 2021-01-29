import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Meeting } from '../models/meeting';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private userService: UserService) { }

  async createEvent(data: Meeting): Promise<User> {
    let user = await this.userService.findByEmail(data.admin.email);
    if (user) {
      console.log('Usuario existente');
      return user;
    }
    console.log('Usuario nuevo');
    user = await this.userService.create(data.admin);
    return user;
  }
}
