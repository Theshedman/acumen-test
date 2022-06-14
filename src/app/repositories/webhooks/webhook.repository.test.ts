import 'reflect-metadata';
import { container } from '../../configs/inversity.config';
import { ModuleToken } from '../../configs/module.token';
import { DbAccess } from '../base';

describe('Webhook Repository Unit Test', () => {
  let webhookRepo: DbAccess;
  beforeEach(() => {
    webhookRepo = container.get<DbAccess>(ModuleToken.WebhookRepository);
  });

  it('should be defined', () => {
    expect(webhookRepo).toBeDefined();
  });
});
