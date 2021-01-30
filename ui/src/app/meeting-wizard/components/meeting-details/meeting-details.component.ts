import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StepComponent } from '../../models/step-component.model';
import { MeetingData } from '../../models/meeting-data.model';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
})
export class MeetingDetailsComponent implements OnInit, StepComponent {
  @Input() data: MeetingData;
  eventInfoForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.eventInfoForm = this.fb.group({
      title: [this.data.title || '', [Validators.required]],
      description: [this.data.description || ''],
    });
  }

  submit(): { isValid; data; error } {
    this.eventInfoForm.markAllAsTouched();
    const isValid = this.eventInfoForm.valid;
    return { isValid, data: { ...this.eventInfoForm.value }, error: '' };
  }

  get title(): AbstractControl {
    return this.eventInfoForm.get('title');
  }
}
