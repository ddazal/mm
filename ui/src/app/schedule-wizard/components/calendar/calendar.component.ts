import { Component, OnInit } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendarEvents = [];
  calendarOptions: CalendarOptions = {
    locale: esLocale,
    initialView: 'timeGridWeek',
    slotEventOverlap: false,
    firstDay: 0,
    allDaySlot: false,
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: false,
      hour12: false,
    },
    events: this.calendarEvents,
    editable: true,
    eventClick(info) {
      console.log(info);
    },
    dateClick: this.createEvent.bind(this),
  };

  constructor() {}

  ngOnInit(): void {}

  createEvent(info): void {
    const start = moment(info.dateStr);
    const end = moment(start).add(1, 'hours');
    this.calendarEvents = this.calendarEvents.concat({
      title: 'Some title',
      start: start.format(),
      end: end.format(),
    });
    this.calendarOptions.events = this.calendarEvents;
  }
}
