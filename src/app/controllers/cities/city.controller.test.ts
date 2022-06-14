import 'reflect-metadata';
import { interfaces } from 'inversify-express-utils';
import { container } from '../../configs/inversity.config';
import { ModuleToken } from '../../configs/module.token';
import { DbAccess, MockedCityRepository, TestBaseRepository } from '../../repositories';
import { mockedHttpContext } from '../__fixtures__';
import { CityController } from './city.controller';
import DoneCallback = jest.DoneCallback;

describe('City Controller Unit Test', () => {
  let cityController: CityController;

  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();

    container.rebind<DbAccess>(ModuleToken.BaseRepository).to(TestBaseRepository);
    container.rebind<DbAccess>(ModuleToken.CityRepository).to(MockedCityRepository);
    container.bind<interfaces.HttpContext>(ModuleToken.HttpContext).toConstantValue(mockedHttpContext);

    cityController = container.get<CityController>(ModuleToken.CityController);
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
    expect(cityController).toBeDefined();
  });

  it('should create a city', async () => {
    const city = {
      name: 'Ibadan',
      latitude: 30.7128,
      longitude: 74.0059,
    };

    const result = await cityController.create(city);

    expect(result.json.id).toBeDefined();
    expect(result.statusCode).toBe(201);
  });

  it('should throw an error when creating a city that already exists', async () => {
    const city = {
      name: 'New York',
      latitude: 40.7128,
      longitude: -74.0059,
    };

    const result = await cityController.create(city);

    expect(result.json.status).toBe('error');
    expect(result.statusCode).toBe(409);
    expect(result.json.message).toBe('City already exists, please add a different city');
  });

  it('should update a city', async () => {
    const city = {
      name: 'Ibadan',
      latitude: 10.7128,
      longitude: 4.0059,
    };

    const result = await cityController.update(2, city);

    expect(result.json.id).toBe(2);
    expect(result.statusCode).toBe(200);
    expect(result.json.name).toBe('Ibadan');
  });

  it('should throw an error when updating a city that does not exist', async () => {
    const city = {
      name: 'Ibadan',
      latitude: 10.7128,
      longitude: 4.0059,
    };

    const result = await cityController.update(29, city);

    expect(result.statusCode).toBe(404);
  });

  it('should delete a city by ID', async () => {
    const result = await cityController.delete(1);

    expect(result.statusCode).toBe(200);
  });

  it('should throw an error when deleting a city that does not exist', async () => {
    const result = await cityController.delete(29);

    expect(result.statusCode).toBe(404);
  });
});
