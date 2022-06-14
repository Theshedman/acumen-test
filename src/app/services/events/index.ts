import { EventEmitter } from 'events';

class WebhookEvent extends EventEmitter {
  constructor() {
    super();
  }
}

export const webhookEvent = new WebhookEvent();

export enum EventName {
  SEND_TEMPERATURE_DATA = 'send_temperature_data',
}
