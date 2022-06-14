import { injectable } from 'inversify';
import { IWebhook } from '../../../models';
import { TestBaseRepository } from './base.repository';

@injectable()
export class MockedWebhookRepository extends TestBaseRepository {
  private static webhookModel: IWebhook[] = [
    {
      id: 1,
      city_id: 1,
      callback_url: 'http://localhost:8088/webhook/callback',
    },

    {
      id: 2,
      city_id: 2,
      callback_url: 'http://localhost:3000/webhooks/2',
    },
  ];

  constructor() {
    super(MockedWebhookRepository.webhookModel);
  }
}
