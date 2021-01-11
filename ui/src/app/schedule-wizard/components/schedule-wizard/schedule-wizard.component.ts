import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-wizard',
  templateUrl: './schedule-wizard.component.html',
  styleUrls: ['./schedule-wizard.component.scss'],
})
export class ScheduleWizardComponent implements OnInit {
  // currentStep = 1;
  // totalSteps = 2;
  constructor() {}

  ngOnInit(): void {}

  // goBack(): void {
  //   this.currentStep -= 1;
  // }

  submit(): void {
    console.log('Create meeting');
  }
}
