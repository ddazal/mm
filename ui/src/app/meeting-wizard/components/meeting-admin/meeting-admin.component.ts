import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StepComponent } from '../../models/step-component';
import { Meeting } from '../../models/meeting';

@Component({
  selector: 'app-meeting-admin',
  templateUrl: './meeting-admin.component.html',
})
export class MeetingAdminComponent implements OnInit, StepComponent {
  @Input() data: Meeting;
  eventAdminForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.eventAdminForm = this.fb.group({
      name: [this.data.admin.name || '', Validators.required],
      email: [
        this.data.admin.email || '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  submit(): { isValid; data } {
    this.eventAdminForm.markAllAsTouched();
    const isValid = this.eventAdminForm.valid;
    return { isValid, data: { admin: this.eventAdminForm.value } };
  }

  get name(): AbstractControl {
    return this.eventAdminForm.get('name');
  }

  get email(): AbstractControl {
    return this.eventAdminForm.get('email');
  }
}
