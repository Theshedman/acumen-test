import { injectable } from 'inversify';
import { CityModel } from '../../models';
import { BaseRepository, DbAccess } from '../base';

@injectable()
export class CityRepository extends BaseRepository implements DbAccess {
  constructor() {
    super(CityModel);
  }
}
