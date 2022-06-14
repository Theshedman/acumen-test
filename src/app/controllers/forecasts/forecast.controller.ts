import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, requestParam } from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/lib/results';
import { ModuleToken } from '../../configs/module.token';
import { ForecastService } from '../../services';
import { logger } from '../../utils';

@controller('/forecasts')
export class ForecastController extends BaseHttpController {
  @inject(ModuleToken.ForecastService)
  private readonly forecastService: ForecastService;

  @httpGet('/:city_id')
  public async findForecastByCityId(@requestParam('city_id') cityId: number): Promise<JsonResult> {
    logger.info(`Running ForecastController.findForecastByCityId`);

    try {
      const forecast = await this.forecastService.findByCity(cityId);

      return this.json(forecast);
    } catch (e: any) {
      return this.json({ status: 'error', message: e.message }, e.code);
    }
  }

}
