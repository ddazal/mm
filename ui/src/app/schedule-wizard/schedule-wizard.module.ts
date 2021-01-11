import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './components/calendar/calendar.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { ScheduleWizardComponent } from './components/schedule-wizard/schedule-wizard.component';
import { EventInfoComponent } from './components/event-info/event-info.component';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventAdminInfoComponent } from './components/event-admin-info/event-admin-info.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [
    CalendarComponent,
    ScheduleWizardComponent,
    EventInfoComponent,
    EventAdminInfoComponent,
  ],
  imports: [CommonModule, FullCalendarModule, ReactiveFormsModule],
  exports: [ScheduleWizardComponent],
})
export class ScheduleWizardModule {}
