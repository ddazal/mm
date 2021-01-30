import {Entity, model, property} from '@loopback/repository';

@model()
export class Meeting extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  publicId?: string;

  @property({
    type: 'string',
  })
  privateId?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<Meeting>) {
    super(data);
  }
}

export interface MeetingRelations {
  // describe navigational properties here
}

export type MeetingWithRelations = Meeting & MeetingRelations;
