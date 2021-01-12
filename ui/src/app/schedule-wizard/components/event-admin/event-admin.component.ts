import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StepComponent } from '../step.component';

@Component({
  selector: 'app-event-admin',
  templateUrl: './event-admin.component.html',
  styleUrls: ['./event-admin.component.scss'],
})
export class EventAdminComponent implements OnInit, StepComponent {
  @Input() data: any;
  eventAdminForm = new FormGroup({
    adminName: new FormControl('', Validators.required),
    adminEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  submit(): void {
    console.log('EventAdminInfo submitted');
  }

  get adminName(): AbstractControl {
    return this.eventAdminForm.get('adminName');
  }

  get adminEmail(): AbstractControl {
    return this.eventAdminForm.get('adminEmail');
  }
}
