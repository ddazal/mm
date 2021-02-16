import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Meeting, MeetingRelations, Option} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OptionRepository} from './option.repository';

export class MeetingRepository extends DefaultCrudRepository<
  Meeting,
  typeof Meeting.prototype.id,
  MeetingRelations
> {

  public readonly options: HasManyRepositoryFactory<Option, typeof Meeting.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('OptionRepository') protected optionRepositoryGetter: Getter<OptionRepository>,
  ) {
    super(Meeting, dataSource);
    this.options = this.createHasManyRepositoryFactoryFor('options', optionRepositoryGetter,);
    this.registerInclusionResolver('options', this.options.inclusionResolver);
  }
}
