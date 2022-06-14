import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';
import { logger } from '../../utils';

@controller('/healthz')
export class HealthController extends BaseHttpController {

  @httpGet('/')
  public async getServiceHealth(): Promise<any> {
    logger.info(`Running HealthController.getServiceHealth`);

    return this.json({ status: 'success', message: 'Service is running' });
  }
}
