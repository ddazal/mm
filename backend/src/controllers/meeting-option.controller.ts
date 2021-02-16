import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Meeting,
  Option,
} from '../models';
import {MeetingRepository} from '../repositories';

export class MeetingOptionController {
  constructor(
    @repository(MeetingRepository) protected meetingRepository: MeetingRepository,
  ) { }

  @get('/meetings/{id}/options', {
    responses: {
      '200': {
        description: 'Array of Meeting has many Option',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Option)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Option>,
  ): Promise<Option[]> {
    return this.meetingRepository.options(id).find(filter);
  }

  @post('/meetings/{id}/options', {
    responses: {
      '200': {
        description: 'Meeting model instance',
        content: {'application/json': {schema: getModelSchemaRef(Option)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Meeting.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Option, {
            title: 'NewOptionInMeeting',
            exclude: ['id'],
            optional: ['meetingId']
          }),
        },
      },
    }) option: Omit<Option, 'id'>,
  ): Promise<Option> {
    return this.meetingRepository.options(id).create(option);
  }

  @patch('/meetings/{id}/options', {
    responses: {
      '200': {
        description: 'Meeting.Option PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Option, {partial: true}),
        },
      },
    })
    option: Partial<Option>,
    @param.query.object('where', getWhereSchemaFor(Option)) where?: Where<Option>,
  ): Promise<Count> {
    return this.meetingRepository.options(id).patch(option, where);
  }

  @del('/meetings/{id}/options', {
    responses: {
      '200': {
        description: 'Meeting.Option DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Option)) where?: Where<Option>,
  ): Promise<Count> {
    return this.meetingRepository.options(id).delete(where);
  }
}
