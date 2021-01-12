import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StepComponent } from '../step.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit, StepComponent {
  @Input() data: any;
  eventInfoForm = new FormGroup({
    eventTitle: new FormControl('', [Validators.required]),
    eventDescription: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  submit(): void {
    console.log('EventDetails submitted');
  }

  get eventTitle(): AbstractControl {
    return this.eventInfoForm.get('eventTitle');
  }
}
