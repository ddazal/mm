import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Meeting} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MeetingRepository} from './meeting.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly meetings: HasManyRepositoryFactory<Meeting, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MeetingRepository') protected meetingRepositoryGetter: Getter<MeetingRepository>,
  ) {
    super(User, dataSource);
    this.meetings = this.createHasManyRepositoryFactoryFor('meetings', meetingRepositoryGetter,);
    this.registerInclusionResolver('meetings', this.meetings.inclusionResolver);
  }
}
