import * as moment from 'moment-timezone';
import { Component, OnInit } from '@angular/core';
import { MeetingOption } from 'src/app/meeting-wizard/models/meeting-option.model';
import { AuthMeetingService } from 'src/app/services/auth-meeting.service';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { MeetingOptionService } from 'src/app/services/meeting-option.service';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/models/meeting.model';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.scss']
})
export class MeetingRoomComponent implements OnInit {
  participant = new FormControl('', Validators.required);
  choices = new FormArray([]);
  timezone = moment.tz.guess();
  utcOffset = moment(new Date()).utcOffset();
  timezoneAbbr = moment.tz.zone(this.timezone).abbr(this.utcOffset);

  meeting: Meeting;
  feedbackMessage: string;
  isAdminView: boolean;
  

  options = [];
  optionsIds = [];
  votesResults = [];
  showVoteForm = false;
  saving = false;
  deactivating = false;
  updating = false;
  activeModalUpdate = false;


  constructor(
    private authMeetingService: AuthMeetingService,
    private meetingOptionService: MeetingOptionService,
    private meetingService: MeetingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setup();
  }

  setup(): void {
    this.meeting = this.authMeetingService.accessedMetting;
    this.isAdminView = this.authMeetingService.asAdmin;
    this.parseOptions(this.meeting.options);
    this.votesResults = this.getVotes(this.options);
  }

  parseOptions(options: MeetingOption[]): void {
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

  getVotes(options): any[] {
    let votersByOption = options.reduce((result, option) => {
      result[option.id] = result[option.id] || [];
      result[option.id].push(...option.voters);
      return result;
    }, {});
    votersByOption = Object.keys(votersByOption).filter(key => votersByOption[key].length).reduce((result, key) => {
      result[key] = votersByOption[key];
      return result;
    }, {});
    const votesResult = Object.keys(votersByOption).reduce((result, key) => {
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
    return votesResult;
  }

  toggleVoteForm(): void {
    this.showVoteForm = !this.showVoteForm;
    this.feedbackMessage = '';
  }

  toggleFlag(flag: string): void {
    this[flag] = !this[flag]
  }

  async closeVoting(): Promise<void> {
    this.toggleFlag('deactivating')
    const meeting = await this.meetingService.updateMeeting(this.meeting.id, { isActive: false })
    this.meeting = meeting
    this.toggleFlag('deactivating')
  }

  async openVoting(): Promise<void> {
    this.toggleFlag('deactivating')
    const meeting = await this.meetingService.updateMeeting(this.meeting.id, { isActive: true })
    this.meeting = meeting
    this.toggleFlag('deactivating')
  }

  async updateMeetingInfo(data: { title: string, description: string }): Promise<void> {
    this.toggleFlag('updating')
    const meeting = await this.meetingService.updateMeeting(this.meeting.id, data)
    this.meeting = meeting
    this.toggleFlag('updating')
    this.toggleFlag('activeModalUpdate')
  }
  
  async saveChoices(): Promise<void> {
    const choices = this.choices.value.reduce((ids, choice, index) => {
      return choice ? [...ids, this.optionsIds[index]] : ids;
    }, []);
    if (!this.participant.valid || !choices.length) {
      this.feedbackMessage = 'Por favor escribe tu nombre y selecciona una o más opciones.';
      return;
    }
    try {
      this.toggleFlag('saving');
      await this.meetingOptionService.addVotes(choices, this.participant.value);
      this.router.navigate(['/reu/checkout']);
    } catch (error) {
      console.log(error.message);
      this.toggleFlag('saving');
      this.feedbackMessage = 'Algo salió mal';
    }
  }
}
