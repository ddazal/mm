import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { StepComponent } from '../step.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit, StepComponent {
  @Input() data: any;
  eventInfoForm = this.fb.group({
    eventTitle: ['', [Validators.required]],
    eventDescription: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  submit(): { isValid, data } {
    this.eventInfoForm.markAllAsTouched();
    const isValid = this.eventInfoForm.valid;
    return { isValid, data: { ...this.eventInfoForm.value } };
  }

  get eventTitle(): AbstractControl {
    return this.eventInfoForm.get('eventTitle');
  }
}
