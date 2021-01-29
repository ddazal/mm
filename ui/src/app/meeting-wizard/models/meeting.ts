import { MeetingOption } from './meeting-option';

export interface Meeting {
  title: string;
  description?: string;
  options: MeetingOption[];
  admin: {
    name: string;
    email: string;
  };
  guests: string[];
}
