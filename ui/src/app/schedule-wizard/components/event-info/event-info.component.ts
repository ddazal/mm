import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss'],
})
export class EventInfoComponent implements OnInit {
  eventInfoForm = new FormGroup({
    eventTitle: new FormControl('', Validators.required),
    eventDescription: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}
}
