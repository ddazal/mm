import { MeetingOption } from '../meeting-wizard/models/meeting-option.model';
import { User } from './user.model';

export interface Meeting {
  id?: string;
  title: string;
  description: string;
  publicId: string;
  privateId: string;
  userId: string;
  accessCode: string;
  user?: User;
  options?: MeetingOption[];
  isActive?: boolean;
}
