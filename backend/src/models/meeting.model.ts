import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Option} from './option.model';
import {User} from './user.model';

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
  @hasMany(() => Option)
  options: Option[];

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Meeting>) {
    super(data);
  }
}

export interface MeetingRelations {
  // describe navigational properties here
}

export type MeetingWithRelations = Meeting & MeetingRelations;
