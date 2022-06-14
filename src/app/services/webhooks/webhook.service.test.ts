import 'reflect-metadata';
import axios from 'axios';
import { container } from '../../configs/inversity.config';
import { ModuleToken } from '../../configs/module.token';
import { DbAccess, MockedCityRepository, MockedWebhookRepository, TestBaseRepository } from '../../repositories';
import { EventName, webhookEvent } from '../events';
import { WebhookService } from './webhook.service';
import DoneCallback = jest.DoneCallback;

jest.mock('axios');
jest.useFakeTimers();

describe('Webhook Service Unit Test', () => {
  let webhookService: WebhookService;
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();

    container.rebind<DbAccess>(ModuleToken.BaseRepository).to(TestBaseRepository);
    container.rebind<DbAccess>(ModuleToken.CityRepository).to(MockedCityRepository);
    container.rebind<DbAccess>(ModuleToken.WebhookRepository).to(MockedWebhookRepository);

    webhookService = container.get<WebhookService>(ModuleToken.WebhookService);
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
    expect(webhookService).toBeDefined();
  });

  it('should create a new webhook', async () => {
    const data = {
      callback_url: 'http://localhost:3000/webhooks/23',
      city_id: 1,
    };

    const result = await webhookService.create(data);

    expect(result.id).toBeDefined();
    expect(result).toEqual({ ...data, id: result.id });
  });

    it('should throw an error when creating a webhook with a city that does not exist', async () => {
    const data = {
      callback_url: 'http://localhost:3000/webhooks/23',
      city_id: 29,
    };

    try {
      await webhookService.create(data);
    } catch (e: any) {
      expect(e.code).toBe(400);
      expect(e.message).toBe('City with the provided ID does not exist');
    }
  });

  it('should delete a webhook by ID', async () => {
    const result = await webhookService.delete(1);

    expect(result).toBeDefined();
  });

  it('should process webhook event', async () => {
    mockedAxios.post
      .mockName('axios.post')
      .mockResolvedValue({ data: { status: 'success' }} as any);

    await webhookService.handleWebhookEvents();

    webhookEvent.emit(EventName.SEND_TEMPERATURE_DATA, { city_id: 1, min: 20, max: 23 });

    setTimeout(() => {
      expect(mockedAxios).toHaveBeenCalledTimes(10);
    }, 0);
  });
});
