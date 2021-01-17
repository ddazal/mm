import { Injectable } from '@angular/core';
import { MeetingOptionsComponent } from '../components/meeting-options/meeting-options.component';
import { MeetingAdminComponent } from '../components/meeting-admin/meeting-admin.component';
import { MeetingDetailsComponent } from '../components/meeting-details/meeting-details.component';
import { StepItem } from '../models/step-item';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  constructor() {}

  getSteps(): StepItem[] {
    return [
      new StepItem(MeetingDetailsComponent),
      new StepItem(MeetingOptionsComponent),
      new StepItem(MeetingAdminComponent),
    ];
  }
}
