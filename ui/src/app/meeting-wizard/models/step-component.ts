import { Meeting } from './meeting';

export interface StepComponent {
  data: Meeting;
  submit(): { isValid: boolean; data: object };
}
