import { constants } from 'http2';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, requestBody } from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/lib/results';
import { ModuleToken } from '../../configs/module.token';
import { ITemperature } from '../../models';
import { TemperatureService } from '../../services';
import { logger } from '../../utils';

@controller('/temperatures')
export class TemperatureController extends BaseHttpController {
  @inject(ModuleToken.TemperatureService)
  private readonly temperatureService: TemperatureService;

  @httpPost('/')
  public async create(@requestBody() temperature: ITemperature): Promise<JsonResult> {
    logger.info(`Running TemperatureController.create`);
    try {
      const newlyCreatedTemperature = await this.temperatureService.create(temperature);

      return this.json(newlyCreatedTemperature, constants.HTTP_STATUS_CREATED);
    } catch (e: any) {
      return this.json({ status: 'error', message: e.message }, e.code);
    }
  }

  @httpPost('/webhook/callback')
    public async webhookCallback(@requestBody() temperature: ITemperature): Promise<JsonResult> {
        logger.info(`Running TemperatureController.webhookCallback`);

        logger.info(`[x] Received temperature: ${JSON.stringify(temperature)}`);
        logger.info(`[x] Received date: ${temperature.timestamp}`);

    return this.json({ status: 'ok' });
  }
}
