import { JSONSchema } from 'objection';

export const CityModelValidation: JSONSchema = {
  type: 'object',
  required: ['name', 'latitude', 'longitude'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    latitude: { type: 'number' },
    longitude: { type: 'number' },
  },
};
