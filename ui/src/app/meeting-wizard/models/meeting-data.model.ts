import { MeetingOption } from './meeting-option.model';

export interface MeetingData {
  title: string;
  description?: string;
  options: MeetingOption[];
  admin: {
    name: string;
    email: string;
  };
  guests: string[];
}
