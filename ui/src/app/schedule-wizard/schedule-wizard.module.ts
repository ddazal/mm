import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './components/calendar/calendar.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { ScheduleWizardComponent } from './components/schedule-wizard/schedule-wizard.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventAdminComponent } from './components/event-admin/event-admin.component';
import { StepDirective } from './directives/step.directive';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [
    CalendarComponent,
    ScheduleWizardComponent,
    EventDetailsComponent,
    EventAdminComponent,
    StepDirective,
  ],
  imports: [CommonModule, FullCalendarModule, ReactiveFormsModule],
  exports: [ScheduleWizardComponent],
})
export class ScheduleWizardModule {}
