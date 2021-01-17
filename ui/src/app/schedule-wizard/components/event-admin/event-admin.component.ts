import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StepComponent } from '../../step.component';
import { WizardData } from '../../wizard-data';

@Component({
  selector: 'app-event-admin',
  templateUrl: './event-admin.component.html',
})
export class EventAdminComponent implements OnInit, StepComponent {
  @Input() data: WizardData;
  eventAdminForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.eventAdminForm = this.fb.group({
      adminName: [this.data.adminName || '', Validators.required],
      adminEmail: [
        this.data.adminEmail || '',
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
    return { isValid, data: { ...this.eventAdminForm.value } };
  }

  get adminName(): AbstractControl {
    return this.eventAdminForm.get('adminName');
  }

  get adminEmail(): AbstractControl {
    return this.eventAdminForm.get('adminEmail');
  }
}
