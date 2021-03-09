import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Meeting, MeetingRelations, Option, User} from '../models';
import {OptionRepository} from './option.repository';
import {UserRepository} from './user.repository';

export class MeetingRepository extends DefaultCrudRepository<
  Meeting,
  typeof Meeting.prototype.id,
  MeetingRelations
  > {

  public readonly options: HasManyRepositoryFactory<Option, typeof Meeting.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Meeting.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('OptionRepository') protected optionRepositoryGetter: Getter<OptionRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Meeting, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.options = this.createHasManyRepositoryFactoryFor('options', optionRepositoryGetter,);
    this.registerInclusionResolver('options', this.options.inclusionResolver);
  }
}
