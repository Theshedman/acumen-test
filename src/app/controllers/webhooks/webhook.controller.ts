import { constants } from 'http2';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpPost,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/lib/results';
import { ModuleToken } from '../../configs/module.token';
import { IWebhook } from '../../models';
import { WebhookService } from '../../services';
import { logger } from '../../utils';

@controller('/webhooks')
export class WebhookController extends BaseHttpController {
  @inject(ModuleToken.WebhookService)
  private readonly webhookService: WebhookService;

  @httpPost('/')
  public async create(@requestBody() webhook: IWebhook): Promise<JsonResult> {
    logger.info(`Running WebhookController.create`);

    try {
      const newlyCreatedWebhook = await this.webhookService.create(webhook);

      return this.json(newlyCreatedWebhook, constants.HTTP_STATUS_CREATED);
    } catch (e: any) {
      return this.json({ status: 'error', message: e.message }, e.code);
    }
  }

  @httpDelete('/:id')
  public async delete(@requestParam('id') id: number): Promise<JsonResult> {
    logger.info(`Running WebhookController.delete`);

    try {
      const deletedWebhook = await this.webhookService.delete(id);

      return this.json(deletedWebhook, constants.HTTP_STATUS_OK);
    } catch (e: any) {
      return this.json({ status: 'error', message: e.message }, e.code);
    }
  }
}
