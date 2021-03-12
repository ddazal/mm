import * as moment from 'moment-timezone';
import { Component, OnInit } from '@angular/core';
import { MeetingOption } from 'src/app/meeting-wizard/models/meeting-option.model';
import { AuthMeetingService } from 'src/app/services/auth-meeting.service';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { MeetingOptionService } from 'src/app/services/meeting-option.service';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.scss']
})
export class MeetingRoomComponent implements OnInit {
  participant = new FormControl('', Validators.required)
  choices = new FormArray([])
  timezone = moment.tz.guess();
  utcOffset = moment(new Date()).utcOffset()
  timezoneAbbr = moment.tz.zone(this.timezone).abbr(this.utcOffset);
  feedbackMessage: string;
  title: string;
  owner: string;
  description: string;
  options = [];
  optionsIds = [];
  votesResults = [];
  showVoteForm = false;


  constructor(private authMeetingService: AuthMeetingService, private meetingOptionService: MeetingOptionService) { }

  ngOnInit(): void {
    this.setup()
  }

  setup() {
    const meeting = this.authMeetingService.accessedMetting;
    this.title = meeting.title;
    this.owner = meeting.user.name;
    this.description = meeting.description;
    this.parseOptions(meeting.options)
    this.votesResults = this.getVotes(this.options)
  }

  parseOptions(options: MeetingOption[]): void {
    this.options = options
      .map(option => {
        const startTime = moment.tz(option.start, this.timezone).locale('es')
        const endTime = moment.tz(option.end, this.timezone).locale('es')

        return {
          ...option,
          startHour: startTime.format('HH:mm'),
          endHour: endTime.format('HH:mm'),
          month: startTime.format('MMM'),
          dayOfMonth: startTime.format('DD'),
          dayOfWeek: startTime.format('ddd'),
          startTime: startTime.format(),
          endTime: endTime.format()
        }
      })
      .sort((a, b) => moment(a.startTime).isBefore(b.startTime) ? -1 : 1);
    this.options.forEach(() => this.choices.push(new FormControl()))
    this.optionsIds = this.options.map(option => option.id)
  }

  getVotes(options) {
    let votersByOption = options.reduce((result, option) => {
      result[option.id] = result[option.id] || []
      result[option.id].push(...option.voters)
      return result
    }, {})
    votersByOption = Object.keys(votersByOption).filter(key => votersByOption[key].length).reduce((result, key) => {
      result[key] = votersByOption[key]
      return result
    }, {})
    const votesResult = Object.keys(votersByOption).reduce((result, key) => {
      votersByOption[key].forEach(voter => {
        const index = result.findIndex(record => record.voter === voter)
        if (index < 0) {
          result.push({ voter, votes: [key] })
        } else {
          result[index].votes.push(key)
        }
      })
      return result
    }, [])
    return votesResult
  }

  toggleVoteForm() {
    this.showVoteForm = !this.showVoteForm
    if (!this.showVoteForm) {
      this.feedbackMessage = ''
    }
  }

  async saveChoices() {
    const choices = this.choices.value.reduce((ids, choice, index) => {
      return choice ? [...ids, this.optionsIds[index]] : ids
    }, [])
    if (!this.participant.valid || !choices.length) {
      this.feedbackMessage = 'Por favor escribe tu nombre y selecciona una o más opciones.'
      return
    }
    try {
      // TODO: add loading state
      await this.meetingOptionService.updateMany(choices, this.participant.value)
    } catch (error) {
      console.log(error.message)
      this.feedbackMessage = 'Algo salió mal'
    }
  }

}
