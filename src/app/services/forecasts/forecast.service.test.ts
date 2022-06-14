import 'reflect-metadata';
import { container } from '../../configs/inversity.config';
import { ModuleToken } from '../../configs/module.token';
import { DbAccess, MockedTemperatureRepository, TestBaseRepository } from '../../repositories';
import { ForecastService } from './forecast.service';
import DoneCallback = jest.DoneCallback;

describe('Forecast Service Unit Test', () => {
  let forecastService: ForecastService;

  beforeEach(() => {
    // Create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();

    container.rebind<DbAccess>(ModuleToken.BaseRepository).to(TestBaseRepository);
    container.rebind<DbAccess>(ModuleToken.TemperatureRepository).to(MockedTemperatureRepository);

    forecastService = container.get<ForecastService>(ModuleToken.ForecastService);
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

  it('should get forecast for a particular city', async () => {
    const result = await forecastService.findByCity(1);

    expect(result).toBeDefined();
  });

  it('should throw an error if city does not exist while fetching forecast', async () => {
    try {
      await forecastService.findByCity(50);
    } catch (e: any) {
      expect(e.code).toBe(404);
      expect(e.message).toBe('City with the provided ID does not exist');
    }
  });
})
