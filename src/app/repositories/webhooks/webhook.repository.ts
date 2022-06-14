import { WebhookModel } from '../../models';
import { BaseRepository, DbAccess } from '../base';

export class WebhookRepository extends BaseRepository implements DbAccess {
  constructor() {
    super(WebhookModel);
  }
}
