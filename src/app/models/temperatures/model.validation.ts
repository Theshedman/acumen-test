import { JSONSchema } from 'objection';

export const TemperatureModelValidation: JSONSchema = {
  type: 'object',
  required: ['city_id', 'max', 'min'],
  properties: {
    id: { type: 'number' },
    city_id: { type: 'number' },
    max: { type: 'number' },
    min: { type: 'number' },
    timestamp: { type: 'number' },
  },
};
