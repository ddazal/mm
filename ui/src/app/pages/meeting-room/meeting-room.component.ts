import * as moment from 'moment-timezone';
import { Component, OnInit } from '@angular/core';
import { MeetingOption } from 'src/app/meeting-wizard/models/meeting-option.model';
import { AuthMeetingService } from 'src/app/services/auth-meeting.service';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.scss']
})
export class MeetingRoomComponent implements OnInit {
  meetingTitle: string;
  meetingOwner: string;
  meetingDescription: string;
  meetingOptions = [];
  timeZone: string;
  timeZoneAbbr: string;
  showVoteForm = false;


  constructor(private authMeetingService: AuthMeetingService) { }

  ngOnInit(): void {
    this.setup()
  }

  setup() {
    const { title, description, user, options } = this.authMeetingService.accessedMetting;
    this.meetingTitle = title;
    this.meetingOwner = user.name;
    this.meetingDescription = description;

    const timeOffset = moment(new Date()).utcOffset()
    this.timeZone = moment.tz.guess();
    this.timeZoneAbbr = moment.tz.zone(this.timeZone).abbr(timeOffset)

    this.meetingOptions = options.map(option => {
      const startTime = moment.tz(option.start, this.timeZone).locale('es')
      const endTime = moment.tz(option.end, this.timeZone).locale('es')

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
    }).sort((a, b) => moment(a.startTime).isBefore(b.startTime) ? -1 : 1);

    console.log(this.meetingOptions)
  }

  toggleVoteForm() {
    this.showVoteForm = !this.showVoteForm
  }

}
