import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meeting } from 'src/app/models/meeting.model';

@Component({
  selector: 'app-modal-update-meeting-info',
  templateUrl: './modal-update-meeting-info.component.html',
})
export class ModalUpdateMeetingInfoComponent implements OnInit {
  @Input() meeting: Meeting;
  @Input() active: boolean;
  @Input() loading: boolean;
  @Output() closeEvent = new EventEmitter<void>()
  @Output() updateEvent = new EventEmitter<{ title: string, description: string }>()

  infoForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.infoForm = new FormGroup({
      title: new FormControl(this.meeting.title, Validators.required),
      description: new FormControl(this.meeting.description)
    })
  }

  close(): void {
    this.closeEvent.emit()
  }

  update() {
    this.updateEvent.emit({
      title: this.title.value,
      description: this.description.value
    })
  }

  get title(): AbstractControl {
    return this.infoForm.get('title')
  }

  get description(): AbstractControl {
    return this.infoForm.get('description')
  }

  get infoFormIsValid(): boolean {
    return !this.infoForm.invalid
  }

}
