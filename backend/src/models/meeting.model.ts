import {Entity, model, property, hasMany} from '@loopback/repository';
import {Option} from './option.model';

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
    type: 'array',
    itemType: 'string',
  })
  guests?: string[];

  @property({
    type: 'string',
  })
  accessCode?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @hasMany(() => Option)
  options: Option[];

  constructor(data?: Partial<Meeting>) {
    super(data);
  }
}

export interface MeetingRelations {
  // describe navigational properties here
}

export type MeetingWithRelations = Meeting & MeetingRelations;
