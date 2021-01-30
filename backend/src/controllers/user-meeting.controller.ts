import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {nanoid} from 'nanoid';
import {
  Meeting, User
} from '../models';
import {UserRepository} from '../repositories';

export class UserMeetingController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/meetings', {
    responses: {
      '200': {
        description: 'Array of User has many Meeting',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Meeting)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Meeting>,
  ): Promise<Meeting[]> {
    return this.userRepository.meetings(id).find(filter);
  }

  @post('/users/{id}/meetings', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Meeting)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meeting, {
            title: 'NewMeetingInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) meeting: Omit<Meeting, 'id'>,
  ): Promise<Meeting> {
    meeting.publicId = nanoid(12);
    meeting.privateId = nanoid(12);
    return this.userRepository.meetings(id).create(meeting);
  }

  @patch('/users/{id}/meetings', {
    responses: {
      '200': {
        description: 'User.Meeting PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meeting, {partial: true}),
        },
      },
    })
    meeting: Partial<Meeting>,
    @param.query.object('where', getWhereSchemaFor(Meeting)) where?: Where<Meeting>,
  ): Promise<Count> {
    return this.userRepository.meetings(id).patch(meeting, where);
  }

  @del('/users/{id}/meetings', {
    responses: {
      '200': {
        description: 'User.Meeting DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Meeting)) where?: Where<Meeting>,
  ): Promise<Count> {
    return this.userRepository.meetings(id).delete(where);
  }
}
