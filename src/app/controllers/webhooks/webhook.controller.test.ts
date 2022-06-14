import 'reflect-metadata';
import { interfaces } from 'inversify-express-utils';
import { mockedHttpContext } from '../__fixtures__';
import { ModuleToken } from '../../configs/module.token';
import { container } from '../../configs/inversity.config';
import { WebhookController } from './webhook.controller';
import { DbAccess, MockedCityRepository, MockedWebhookRepository } from '../../repositories';

import DoneCallback = jest.DoneCallback;

describe('Webhook Controller Unit Test', () => {
  let webhookController: WebhookController;

  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();

    container.rebind<DbAccess>(ModuleToken.CityRepository).to(MockedCityRepository);
    container.rebind<DbAccess>(ModuleToken.WebhookRepository).to(MockedWebhookRepository);
    container.bind<interfaces.HttpContext>(ModuleToken.HttpContext).toConstantValue(mockedHttpContext);

    webhookController = container.get<WebhookController>(ModuleToken.WebhookController);
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
    expect(webhookController).toBeDefined();
  });

  it('should create a new webhook for a city', async () => {
    const result = await webhookController.create({
      city_id: 1,
      callback_url: 'http://localhost:8088/webhook/callback',
    });

    expect(result.statusCode).toBe(201);
  });

  it('should throw an error if city does not exist', async () => {
    const result = await webhookController.create({
      city_id: 123,
      callback_url: 'http://localhost:8088/webhook/callback',
    });

    expect(result.statusCode).toBe(400);
  });

  it('should delete webhook by ID', async () => {
    const result = await webhookController.delete(1);

    expect(result.statusCode).toBe(200);
  });

    it('should throw an error if webhook does not exist', async () => {
    const result = await webhookController.delete(123);

    expect(result.statusCode).toBe(404);
    expect(result.json.message).toBe('Webhook with the provided ID does not exist');
  });
});
