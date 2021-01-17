import * as moment from 'moment';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarOptions } from '@fullcalendar/angular';
import { Component, Input, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { StepComponent } from '../../models/step-component';
import { Meeting } from '../../models/meeting';
import { MeetingOption } from '../../models/meeting-option';
import { WizardService } from '../../services/wizard.service';

@Component({
  selector: 'app-meeting-options',
  templateUrl: './meeting-options.component.html',
})
export class MeetingOptionsComponent implements OnInit, StepComponent {
  @Input() data: Meeting;
  @Input() eventTitle: string;

  events: MeetingOption[] = [];

  calendarOptions: CalendarOptions = {
    locale: esLocale,
    initialView: 'timeGridWeek',
    slotEventOverlap: false,
    firstDay: 0,
    allDaySlot: false,
    slotDuration: '00:15:00',
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: false,
      hour12: false,
    },
    events: this.events,
    eventClassNames: ['mm-event'],
    editable: true,
    eventResize: this.updateEvent.bind(this),
    eventDrop: this.updateEvent.bind(this),
    dateClick: this.createEvent.bind(this),
  };

  constructor() {}

  ngOnInit(): void {
    this.events = this.data.options || [];
    this.calendarOptions.events = this.events;
  }

  createEvent({ dateStr }): void {
    const start = moment(dateStr);
    const end = moment(start).add(1, 'hours');
    this.events = this.events.concat({
      id: uuidv4(),
      title: this.data.title,
      start: start.format(),
      end: end.format(),
    });
    this.calendarOptions.events = this.events;
  }

  updateEvent({ event }): void {
    const eventIndex = this.events.findIndex((e) => e.id === event.id);
    const { id, title, start, end } = event;
    this.events.splice(eventIndex, 1, { id, title, start, end });
    this.calendarOptions.events = this.events;
  }

  submit(): { isValid; data } {
    const isValid = !!this.events.length;
    return { isValid, data: { options: this.events } };
  }
}
