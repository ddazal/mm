import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-event-admin-info',
  templateUrl: './event-admin-info.component.html',
  styleUrls: ['./event-admin-info.component.scss'],
})
export class EventAdminInfoComponent implements OnInit {
  eventAdminForm = new FormGroup({
    adminName: new FormControl('', Validators.required),
    adminEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  get adminName(): AbstractControl {
    return this.eventAdminForm.get('adminName');
  }

  get adminEmail(): AbstractControl {
    return this.eventAdminForm.get('adminEmail');
  }
}
