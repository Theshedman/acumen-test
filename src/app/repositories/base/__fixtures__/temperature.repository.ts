import { injectable } from 'inversify';
import { ITemperature } from '../../../models';
import { TestBaseRepository } from './base.repository';

@injectable()
export class MockedTemperatureRepository extends TestBaseRepository {
  private static temperatureModel: ITemperature[] = [
    {
      id: 1,
      city_id: 1,
      max: 20,
      min: 10,
      timestamp: 1573221099,
    },

    {
      id: 2,
      city_id: 2,
      max: 30,
      min: 20,
      timestamp: 123541099,
    },
  ];

  constructor() {
    super(MockedTemperatureRepository.temperatureModel);
  }

  public async create<T>(data: any): Promise<T> {
    const id = this.generateNewId();
    if (!data.id) data.id = id;

    data.timestamp = Date.now();

    MockedTemperatureRepository.temperatureModel.push(data);

    return Promise.resolve(data);
  }
}
