import { Model } from 'objection';
import { BaseModel } from '../base';
import { WebhookModel } from './model';

describe('Webhook Model Unit Test', () => {

  it('should be defined', () => {
    expect(WebhookModel).toBeDefined();
  });

  it('should be an instance of a BaseModel', () => {
    expect(WebhookModel.prototype).toBeInstanceOf(BaseModel);
  });

  it('should be an instance of a Model', () => {
    expect(WebhookModel.prototype).toBeInstanceOf(Model);
  });

  it('should have a tableName', () => {
    expect(WebhookModel.tableName).toBe('acumen-service.webhooks');
  });

  it('should have a jsonSchema', () => {
    expect(WebhookModel.jsonSchema).toBeDefined();
    expect(WebhookModel.jsonSchema).toEqual({
      type: 'object',
      required: ['city_id', 'callback_url'],
      properties: {
        id: { type: 'number' },
        city_id: { type: 'number' },
        callback_url: { type: 'string' },
      },
    });
  });
});
