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
  @Output() showedUpdateModal = new EventEmitter<void>();
  @Output() closedVoting = new EventEmitter<void>();
  @Output() openedVoting = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  showUpdateModal(): void {
    this.showedUpdateModal.emit();
  }

  closeVoting(): void {
    this.closedVoting.emit();
  }

  openVoting(): void {
    this.openedVoting.emit();
  }

}
