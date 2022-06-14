import { injectable } from 'inversify';
import { ICity } from '../../../models';
import { TestBaseRepository } from './base.repository';

@injectable()
export class MockedCityRepository extends TestBaseRepository {
  private static cityModel: ICity[] = [
    {
      id: 1,
      name: 'New York',
      latitude: 40.730610,
      longitude: -73.935242,
    },

    {
      id: 2,
      name: 'Los Angeles',
      latitude: 34.052234,
      longitude: -118.243685,
    },
  ];

  constructor() {
    super(MockedCityRepository.cityModel);
  }
}
