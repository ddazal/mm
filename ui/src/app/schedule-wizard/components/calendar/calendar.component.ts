import * as moment from 'moment';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarOptions } from '@fullcalendar/angular';
import { Component, Input, OnInit } from '@angular/core';
import { StepComponent } from '../../step.component';
import { WizardData } from '../../wizard-data';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, StepComponent {
  @Input() data: WizardData;
  @Input() eventTitle: string;
  events = [];
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
    editable: true,
    eventClick: this.updateEvent.bind(this),
    dateClick: this.createEvent.bind(this),
  };

  constructor() {}

  ngOnInit(): void {
    this.events = this.data.events || [];
    this.calendarOptions.events = this.events;
  }

  createEvent(info): void {
    const start = moment(info.dateStr);
    const end = moment(start).add(1, 'hours');
    this.events = this.events.concat({
      title: this.data.eventTitle,
      start: start.format(),
      end: end.format(),
    });
    this.calendarOptions.events = this.events;
  }

  updateEvent(info): void {
    console.log(info);
  }

  submit(): { isValid; data } {
    const isValid = !!this.events.length;
    return { isValid, data: { events: this.events } };
  }
}
