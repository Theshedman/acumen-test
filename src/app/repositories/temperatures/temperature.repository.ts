import { TemperatureModel } from '../../models';
import { BaseRepository, DbAccess } from '../base';

export class TemperatureRepository extends BaseRepository implements DbAccess {
  constructor() {
    super(TemperatureModel);
  }
}
