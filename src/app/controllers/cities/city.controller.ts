import { constants } from 'http2';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller, httpDelete,
  httpPatch,
  httpPost,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/lib/results';
import { ModuleToken } from '../../configs/module.token';
import { ICity } from '../../models';
import { CityService } from '../../services';
import { logger } from '../../utils';

@controller('/cities')
export class CityController extends BaseHttpController {
  @inject(ModuleToken.CityService)
  private readonly cityService: CityService;

  @httpPost('/')
  public async create(@requestBody() city: ICity): Promise<JsonResult> {
    logger.info(`Running CityController.create`);

    try {
      const newlyCreatedCity = await this.cityService.create(city);

      return this.json(newlyCreatedCity, constants.HTTP_STATUS_CREATED);
    } catch (e: any) {
      return this.json({ status: 'error', message: e.message }, e.code);
    }
  }

  @httpPatch('/:id')
  public async update(@requestParam('id') id: number, @requestBody() city: ICity): Promise<JsonResult> {
    logger.info(`Running CityController.update`);

    try {
      const updatedCity = await this.cityService.update(id, city);

      return this.json(updatedCity);
    } catch (e: any) {
      return this.json({ status: 'error', message: e.message }, e.code);
    }
  }

  @httpDelete('/:id')
  public async delete(@requestParam('id') id: number): Promise<JsonResult> {
    logger.info(`Running CityController.delete`);

    try {
      const deletedCity = await this.cityService.delete(id);

      return this.json(deletedCity);
    } catch (e: any) {
      return this.json({ status: 'error', message: e.message }, e.code);
    }
  }
}

