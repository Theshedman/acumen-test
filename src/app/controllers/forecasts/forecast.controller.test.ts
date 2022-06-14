import 'reflect-metadata';
import { interfaces } from 'inversify-express-utils';
import { container } from '../../configs/inversity.config';
import { ModuleToken } from '../../configs/module.token';
import { mockedHttpContext } from '../__fixtures__';
import { ForecastController } from './forecast.controller';
import { DbAccess, MockedTemperatureRepository, TestBaseRepository } from '../../repositories';

import DoneCallback = jest.DoneCallback;

describe('Forecast Controller Unit Test', () => {
  let forecastController: ForecastController;

  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();

    container.rebind<DbAccess>(ModuleToken.BaseRepository).to(TestBaseRepository);
    container.rebind<DbAccess>(ModuleToken.TemperatureService).to(MockedTemperatureRepository);
    container.bind<interfaces.HttpContext>(ModuleToken.HttpContext).toConstantValue(mockedHttpContext);

    forecastController = container.get<ForecastController>(ModuleToken.ForecastController);
  });

  afterEach(() => {
    // restore the original snapshot
    container.restore();

    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  afterAll((done: DoneCallback) => {
    done();
  });

  it('should be defined', () => {
    expect(forecastController).toBeDefined();
  });

  it('should get forecast detail for a particular city', async () => {
    const result = await forecastController.findForecastByCityId(1);

    expect(result.statusCode).toBe(200);
  });

    it('should throw an error when getting forecast detail for a city that does not exist', async () => {
    const result = await forecastController.findForecastByCityId(62);

    expect(result.statusCode).toBe(404);
    expect(result.json.message).toBe('City with the provided ID does not exist');
  });
});
