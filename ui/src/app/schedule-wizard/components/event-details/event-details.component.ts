import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StepComponent } from '../../step.component';
import { WizardData } from '../../wizard-data';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit, StepComponent {
  @Input() data: WizardData;
  eventInfoForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.eventInfoForm = this.fb.group({
      eventTitle: [this.data.eventTitle || '', [Validators.required]],
      eventDescription: [this.data.eventDescription || ''],
    });
  }

  submit(): { isValid; data } {
    this.eventInfoForm.markAllAsTouched();
    const isValid = this.eventInfoForm.valid;
    return { isValid, data: { ...this.eventInfoForm.value } };
  }

  get eventTitle(): AbstractControl {
    return this.eventInfoForm.get('eventTitle');
  }
}
