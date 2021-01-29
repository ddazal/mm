import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StepComponent } from '../../models/step-component';
import { Meeting } from '../../models/meeting';
import { emailPattern } from '../../models/validators';

@Component({
  selector: 'app-meeting-admin',
  templateUrl: './meeting-admin.component.html',
})
export class MeetingAdminComponent implements OnInit, StepComponent {
  @Input() data: Meeting;
  eventAdminForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.eventAdminForm = this.fb.group({
      name: [this.data.admin.name || '', Validators.required],
      email: [
        this.data.admin.email || '',
        [
          Validators.required,
          Validators.pattern(emailPattern),
        ],
      ],
    });
  }

  submit(): { isValid; data; error } {
    this.eventAdminForm.markAllAsTouched();
    const isValid = this.eventAdminForm.valid;
    return { isValid, data: { admin: this.eventAdminForm.value }, error: '' };
  }

  get name(): AbstractControl {
    return this.eventAdminForm.get('name');
  }

  get email(): AbstractControl {
    return this.eventAdminForm.get('email');
  }
}
