import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeetingOptionsComponent } from './components/meeting-options/meeting-options.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { MeetingWizardComponent } from './components/meeting-wizard/meeting-wizard.component';
import { MeetingDetailsComponent } from './components/meeting-details/meeting-details.component';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MeetingAdminComponent } from './components/meeting-admin/meeting-admin.component';
import { StepDirective } from './directives/step.directive';
import { MeetingGuestsComponent } from './components/meeting-guests/meeting-guests.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [
    MeetingOptionsComponent,
    MeetingWizardComponent,
    MeetingDetailsComponent,
    MeetingAdminComponent,
    StepDirective,
    MeetingGuestsComponent,
  ],
  imports: [CommonModule, FullCalendarModule, ReactiveFormsModule, FormsModule],
  exports: [MeetingWizardComponent],
})
export class MeetingWizardModule {}
