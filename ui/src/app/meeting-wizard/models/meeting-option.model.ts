export interface MeetingOption {
  [x: string]: any;
  id: string;
  title?: string;
  start: string;
  end: string;
  votes?: number;
}
