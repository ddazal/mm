import * as moment from 'moment';
import esLocale from '@fullcalendar/core/locales/es';
import { Calendar, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import tippy from 'tippy.js';

import { StepComponent } from '../../models/step-component.model';
import { MeetingData } from '../../models/meeting-data.model';
import { MeetingOption } from '../../models/meeting-option.model';
import { WizardService } from '../../../services/wizard.service';

@Component({
  selector: 'app-meeting-options',
  templateUrl: './meeting-options.component.html'
})
export class MeetingOptionsComponent implements OnInit, StepComponent {
  @Input() data: MeetingData;
  @Input() eventTitle: string;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

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
    eventColor: '#0331f4',
    editable: true,
    eventClick: this.clickedEvent.bind(this),
    eventDidMount: this.eventAdded.bind(this),
    eventResize: this.updateEvent.bind(this),
    eventDrop: this.updateEvent.bind(this),
    dateClick: this.createEvent.bind(this),
  };

  constructor(private ws: WizardService) { }

  ngOnInit(): void {
    this.events = this.data.options || [];
    this.calendarOptions.events = this.events;
  }

  eventAdded({ event, el }): void {
    const e = this.calendar.getEventById(event.id);
    const tippyInstace = tippy(el, {
      allowHTML: true,
      interactive: true,
      trigger: 'click',
      theme: 'light',
      appendTo: document.body
    });
    e.setExtendedProp('tippy', tippyInstace);
  }

  clickedEvent({ event }): void {
    const template = document.getElementById(event.id);
    event.extendedProps.tippy.setContent(template.firstChild);
  }

  createEvent({ dateStr }): void {
    const start = moment(dateStr);
    const end = moment(start).add(1, 'hours');
    const event = {
      id: uuidv4(),
      title: this.data.title,
      start: start.format(),
      end: end.format(),
    };
    this.events = this.events.concat(event);
    this.calendar.addEvent(event);
    this.updateWizardData();
  }

  deleteEvent(id: string): void {
    const deletedEvent = this.calendar.getEventById(id);
    const eventIndex = this.findEventIndex(id);
    deletedEvent.extendedProps.tippy.unmount();
    deletedEvent.remove();
    this.events.splice(eventIndex, 1);
    this.updateWizardData();
  }

  updateEvent({ event }): void {
    const updatedEvent = this.calendar.getEventById(event.id);
    const eventIndex = this.findEventIndex(event.id);

    updatedEvent.setDates(updatedEvent.start, updatedEvent.end);
    this.events.splice(eventIndex, 1, {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end
    });
    this.updateWizardData();
  }

  updateWizardData(): void {
    this.ws.updateData({ ...this.data, options: this.events });
  }

  submit(): { isValid; data; error } {
    const isValid = !!this.events.length;
    return { isValid, data: { options: this.events }, error: 'Crea, al menos, una opción' };
  }

  findEventIndex(id: string): number {
    return this.events.findIndex((e) => e.id === id);
  }

  get calendar(): Calendar {
    return this.calendarComponent.getApi();
  }
}
