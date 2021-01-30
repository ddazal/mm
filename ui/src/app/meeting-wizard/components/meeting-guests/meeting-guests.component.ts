import { Component, Input, OnInit } from '@angular/core';
import { MeetingData } from '../../models/meeting-data.model';
import { StepComponent } from '../../models/step-component.model';
import { emailPattern } from '../../models/validators.model';

@Component({
  selector: 'app-meeting-guests',
  templateUrl: './meeting-guests.component.html',
})
export class MeetingGuestsComponent implements OnInit, StepComponent {
  @Input() data: MeetingData;
  emails = '';

  constructor() { }

  ngOnInit(): void {
  }

  submit(): { isValid: boolean; data: object; error: string; } {
    const text = this.emails.trim();
    if (!text) {
      return { isValid: true, data: [], error: '' };
    }
    const guests = text.split('\n');
    const isValid = guests.every(email => emailPattern.test(email.trim()));
    if (isValid) {
      return {
        isValid,
        data: { guests },
        error: '',
      };
    }
    return {
      isValid, data: null, error: 'Escribe un email válido por línea.'
    };
  }

}
