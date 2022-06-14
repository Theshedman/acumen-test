import 'reflect-metadata';
import { container } from '../../configs/inversity.config';
import { ModuleToken } from '../../configs/module.token';
import { DbAccess, MockedCityRepository, MockedTemperatureRepository, TestBaseRepository } from '../../repositories';
import { TemperatureService } from './temperature.service';
import DoneCallback = jest.DoneCallback;

describe('Temperature Service Unit Test', () => {
  let temperatureService: TemperatureService;

  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();

    container.rebind<DbAccess>(ModuleToken.BaseRepository).to(TestBaseRepository);
    container.rebind<DbAccess>(ModuleToken.CityRepository).to(MockedCityRepository);
    container.rebind<DbAccess>(ModuleToken.TemperatureRepository).to(MockedTemperatureRepository);

    temperatureService = container.get<TemperatureService>(ModuleToken.TemperatureService);
  });

  afterEach(() => {
    // Restore to last snapshot so each unit test
    // takes a clean copy of the application container
    container.restore();

    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  afterAll((done: DoneCallback) => {
    done();
  });

  it('should be defined', () => {
    expect(temperatureService).toBeDefined();
  });

  it('should create a new temperature', async () => {
    const data = {
      city_id: 1,
      max: 20,
      min: 10,
    };

    const result = await temperatureService.create(data);

    expect(result.id).toBeDefined();
    expect(result.timestamp).toBeDefined();
    expect(result).toEqual({ ...data, timestamp: result.timestamp });
  });
});
