import { ContainerModule, interfaces } from 'inversify';
import { CityController } from './cities';
import { HealthController } from './health';
import { WebhookController } from './webhooks';
import { ForecastController } from './forecasts';
import { ModuleToken } from '../configs/module.token';
import { TemperatureController } from './temperatures';

import Bind = interfaces.Bind;



export const controllerModule = new ContainerModule((bind: Bind) => {
  bind<CityController>(ModuleToken.CityController).to(CityController);
  bind<HealthController>(ModuleToken.HealthController).to(HealthController);
  bind<WebhookController>(ModuleToken.WebhookController).to(WebhookController);
  bind<ForecastController>(ModuleToken.ForecastController).to(ForecastController);
  bind<TemperatureController>(ModuleToken.TemperatureController).to(TemperatureController);
});
