import * as moment from 'moment-timezone';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meeting } from 'src/app/models/meeting.model';
import { MeetingOption } from 'src/app/meeting-wizard/models/meeting-option.model';
import { FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-meeting-votes-results',
  templateUrl: './meeting-votes-results.component.html',
})
export class MeetingVotesResultsComponent implements OnInit {
  @Input() meeting: Meeting;
  @Input() loading: boolean;
  @Output() savedVotes = new EventEmitter<{ votes: any[], participant: string }>();

  timezone = moment.tz.guess();
  utcOffset = moment(new Date()).utcOffset();
  timezoneAbbr = moment.tz.zone(this.timezone).abbr(this.utcOffset);

  feedbackMessage = '';
  showVoteForm = false;
  participant = new FormControl('', Validators.required);
  choices = new FormArray([]);
  options = [];
  optionsIds = [];
  results = [];

  constructor() { }

  ngOnInit(): void {
    this.formatOptions(this.meeting.options);
    this.formatVotes(this.options);
  }

  formatOptions(options: MeetingOption[]): void {
    this.options = options
      .map(option => {
        const startTime = moment.tz(option.start, this.timezone).locale('es');
        const endTime = moment.tz(option.end, this.timezone).locale('es');

        return {
          ...option,
          startHour: startTime.format('HH:mm'),
          endHour: endTime.format('HH:mm'),
          month: startTime.format('MMM'),
          dayOfMonth: startTime.format('DD'),
          dayOfWeek: startTime.format('ddd'),
          startTime: startTime.format(),
          endTime: endTime.format()
        };
      })
      .sort((a, b) => moment(a.startTime).isBefore(b.startTime) ? -1 : 1);
    this.options.forEach(() => {
      const control: FormControl = new FormControl(false);
      this.choices.push(control);
    });
    this.optionsIds = this.options.map(option => option.id);
  }

  formatVotes(options): void {
    let votersByOption = options.reduce((result, option) => {
      result[option.id] = result[option.id] || [];
      result[option.id].push(...option.voters);
      return result;
    }, {});

    votersByOption = Object.keys(votersByOption).filter(key => votersByOption[key].length).reduce((result, key) => {
      result[key] = votersByOption[key];
      return result;
    }, {});

    const results = Object.keys(votersByOption).reduce((result, key) => {
      votersByOption[key].forEach(voter => {
        const index = result.findIndex(record => record.voter === voter);
        if (index < 0) {
          result.push({ voter, votes: [key] });
        } else {
          result[index].votes.push(key);
        }
      });
      return result;
    }, []);

    this.results = results;
  }

  saveChoices(): void {
    const votes = this.choices.value.reduce((ids, choice, index) => {
      return choice ? [...ids, this.optionsIds[index]] : ids;
    }, []);
    if (!this.participant.valid || !votes.length) {
      this.feedbackMessage = 'Por favor escribe tu nombre y selecciona una o más opciones.';
      return;
    }
    this.feedbackMessage = '';
    this.onSaveVotes.emit({ votes, participant: this.participant.value });
  }

}
