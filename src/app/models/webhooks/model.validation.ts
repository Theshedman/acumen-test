import { JSONSchema } from 'objection';

export const WebhookModelValidation: JSONSchema = {
  type: 'object',
  required: ['city_id', 'callback_url'],
  properties: {
    id: { type: 'number' },
    city_id: { type: 'number' },
    callback_url: { type: 'string' },
  },
};
