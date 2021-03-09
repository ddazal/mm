import {Entity, model, property} from '@loopback/repository';

@model()
export class Option extends Entity {
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
  startTime: string;

  @property({
    type: 'string',
    required: true,
  })
  endTime: string;

  @property({
    type: 'number',
    default: 0,
  })
  votes?: number;

  @property({
    type: 'array',
    itemType: 'string',
    default: []
  })
  voters?: string[];

  @property({
    type: 'string',
  })
  meetingId?: string;

  constructor(data?: Partial<Option>) {
    super(data);
  }
}

export interface OptionRelations {
  // describe navigational properties here
}

export type OptionWithRelations = Option & OptionRelations;
