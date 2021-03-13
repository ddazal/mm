import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Meeting } from 'src/app/models/meeting.model';

@Component({
  selector: 'app-meeting-room-info',
  templateUrl: './meeting-room-info.component.html',
})
export class MeetingRoomInfoComponent implements OnInit {
  @Input() meeting: Meeting;
  @Input() showAdmin: boolean;
  @Input() loading: boolean;
  @Output() showUpdateModalEvent = new EventEmitter<void>()
  @Output() closeVotingEvent = new EventEmitter<void>()
  @Output() openVotingEvent = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  showUpdateModal(): void {
    this.showUpdateModalEvent.emit();
  }

  closeVoting() {
    this.closeVotingEvent.emit();
  }
  
  openVoting() {
    this.openVotingEvent.emit();
  }

}
