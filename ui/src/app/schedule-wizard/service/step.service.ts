import { Injectable } from '@angular/core';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { EventAdminComponent } from '../components/event-admin/event-admin.component';
import { EventDetailsComponent } from '../components/event-details/event-details.component';
import { StepItem } from '../components/step-item';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  constructor() {}

  getSteps(): StepItem[] {
    return [
      new StepItem(EventDetailsComponent),
      new StepItem(CalendarComponent),
      new StepItem(EventAdminComponent),
    ];
  }
}
