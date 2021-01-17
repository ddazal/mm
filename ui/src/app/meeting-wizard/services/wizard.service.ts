import { Injectable } from '@angular/core';
import { Meeting } from '../models/meeting';

@Injectable({
  providedIn: 'root',
})
export class WizardService {
  private data: Meeting = {
    title: '',
    description: '',
    options: [],
    admin: {
      name: '',
      email: '',
    },
  };

  constructor() {}

  getData(): Meeting {
    return this.data;
  }

  updateData(data: Meeting): void {
    this.data = data;
  }
}
