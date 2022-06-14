import { ContainerModule, interfaces } from 'inversify';
import { CityService } from './cities';
import { WebhookService } from './webhooks';
import { ForecastService } from './forecasts';
import { TemperatureService } from './temperatures';
import { ModuleToken } from '../configs/module.token';

import Bind = interfaces.Bind;

export const serviceModule = new ContainerModule((bind: Bind) => {
  bind<CityService>(ModuleToken.CityService).to(CityService);
  bind<WebhookService>(ModuleToken.WebhookService).to(WebhookService);
  bind<ForecastService>(ModuleToken.ForecastService).to(ForecastService);
  bind<TemperatureService>(ModuleToken.TemperatureService).to(TemperatureService);
})
