import {Model, model, property} from '@loopback/repository';

@model()
export class NodeMailerEnvelope extends Model {
  @property({
    type: 'string',
  })
  from?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  to?: string[];


  constructor(data?: Partial<NodeMailerEnvelope>) {
    super(data);
  }
}

export interface NodeMailerEnvelopeRelations {
  // describe navigational properties here
}

export type NodeMailerEnvelopeWithRelations = NodeMailerEnvelope & NodeMailerEnvelopeRelations;
