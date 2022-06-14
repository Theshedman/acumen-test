import 'reflect-metadata';
import { container } from '../../configs/inversity.config';
import { ModuleToken } from '../../configs/module.token';
import { DbAccess, MockedCityRepository, TestBaseRepository } from '../../repositories';
import { CityService } from './city.service';
import DoneCallback = jest.DoneCallback;

describe('City Service Unit Test', () => {
  let cityService: CityService;

  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();

    container.rebind<DbAccess>(ModuleToken.BaseRepository).to(TestBaseRepository);
    container.rebind<DbAccess>(ModuleToken.CityRepository).to(MockedCityRepository);

    cityService = container.get<CityService>(ModuleToken.CityService);
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
    expect(cityService).toBeDefined();
  });

  it('should create a new city', async () => {
    const data = {
      name: 'London',
      latitude: 51.509865,
      longitude: -0.118092,

    };

    const result = await cityService.create(data);

    expect(result.id).toBeDefined();
  });

  it('should throw an error if city with the same name aldready exists', async () => {
    const data = {
      name: 'London',
      latitude: 51.509865,
      longitude: -0.118092,
    };

    try {
      await cityService.create(data);
    } catch (e: any) {
      expect(e.code).toBe(409);
      expect(e.message).toBe('City already exists, please add a different city');
    }
  });

  it('should update a city', async () => {
    const data = {
      id: 1,
      name: 'Lagos',
      latitude: 6.52437,
      longitude: 3.37920,
    };

    const result = await cityService.update(1, data);

    expect(result).toEqual(data);
  });

  it('should find a city by params', async () => {
    const result = await cityService.findOne({ name: 'Lagos' });

    expect(result).toEqual({
      id: 1,
      name: 'Lagos',
      latitude: 6.52437,
      longitude: 3.37920,
    });
  });

  it('should delete a city by ID', async () => {
    const result = await cityService.delete(1);

    expect(result).toEqual({
      id: 1,
      name: 'Lagos',
      latitude: 6.52437,
      longitude: 3.37920,
    });
  });
});
