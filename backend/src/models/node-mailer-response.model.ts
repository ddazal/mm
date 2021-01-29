import {Model, model, property} from '@loopback/repository';
import {NodeMailerEnvelope} from './node-mailer-envelope.model';

@model()
export class NodeMailerResponse extends Model {
  @property({
    type: 'array',
    itemType: 'string',
  })
  accepted?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  rejected?: string[];

  @property({
    type: 'number',
  })
  envelopeTime?: number;

  @property({
    type: 'number',
  })
  messageTime?: number;

  @property({
    type: 'number',
  })
  messageSize?: number;

  @property({
    type: 'string',
  })
  response?: string;

  @property(() => NodeMailerEnvelope)
  envelope: NodeMailerEnvelope;

  @property({
    type: 'string',
  })
  messageId?: string;

  constructor(data?: Partial<NodeMailerResponse>) {
    super(data);
  }
}

export interface NodeMailerResponseRelations {
  // describe navigational properties here
}

export type NodeMailerResponseWithRelations = NodeMailerResponse &
  NodeMailerResponseRelations;
