import { MeetingData } from './meeting-data.model';

export interface StepComponent {
  data: MeetingData;
  submit(): { isValid: boolean; data: object; error: string };
}
