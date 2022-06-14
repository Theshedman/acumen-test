import 'reflect-metadata';
import { interfaces } from 'inversify-express-utils';
import { mockedHttpContext } from '../__fixtures__';
import { ModuleToken } from '../../configs/module.token';
import { container } from '../../configs/inversity.config';
import { TemperatureController } from './temperature.controller';
import { DbAccess, MockedCityRepository, MockedTemperatureRepository } from '../../repositories';

import DoneCallback = jest.DoneCallback;

describe('Temperature Controller Unit Test', () => {
  let temperatureController: TemperatureController;

  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();

    container.rebind<DbAccess>(ModuleToken.CityRepository).to(MockedCityRepository);
    container.rebind<DbAccess>(ModuleToken.TemperatureRepository).to(MockedTemperatureRepository);
    container.bind<interfaces.HttpContext>(ModuleToken.HttpContext).toConstantValue(mockedHttpContext);

    temperatureController = container.get<TemperatureController>(ModuleToken.TemperatureController);
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
    expect(temperatureController).toBeDefined();
  });

  it('should create a new temperature for a city', async () => {
    const result = await temperatureController.create({
      city_id: 1,
      max: 23,
      min: 20,
    });

    expect(result.statusCode).toBe(201);
  });

    it('should throw an error when creating a temperature for a city that does not exist', async () => {
    const result = await temperatureController.create({
      city_id: 29,
      max: 23,
      min: 20,
    });

    expect(result.statusCode).toBe(400);
  });

    it('should handle temperature webhook message', async () => {
      const result = await temperatureController.webhookCallback({
        city_id: 1,
        max: 23,
        min: 20,
      });

      expect(result.statusCode).toBe(200);
    });
});
