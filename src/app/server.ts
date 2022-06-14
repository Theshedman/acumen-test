import { createServer } from 'http';
import { getRouteInfo, InversifyExpressServer } from 'inversify-express-utils';
import * as prettyjson from 'prettyjson';
import { IApp } from './app';
import { container } from './configs/inversity.config';
import { ModuleToken } from './configs/module.token';
import { WebhookService } from './services';
import { logger } from './utils';

class ServerSetup {
  private readonly app: IApp;
  private serverInstance: any;
  private readonly webhookService: WebhookService;
  private readonly server: InversifyExpressServer;

  constructor() {
    this.app = container.get<IApp>(ModuleToken.App);
    this.webhookService = container.get<WebhookService>(ModuleToken.WebhookService);
    this.server = new InversifyExpressServer(container, null, null, this.app.getExpressApp());
  }

  public getServer(): any {
    logger.info('Running ServerSetup.getServer');

    if (!this.serverInstance) {
      this.serverInstance = createServer(this.setServer());
    }

    return this.serverInstance;
  }

  private setServer() {
    logger.info('Running ServerSetup.setServer');

    const server = new InversifyExpressServer(container, null, null, this.app.getExpressApp());

    server.setConfig((app) => {

      this.app.mountMiddlewares(app);
      this.webhookService.handleWebhookEvents().then(() => {
        logger.info('Webhook Events successfully configured!');
      });

    });

    return server.build();
  }

    public configureRouteInfo(): any {
      const routeInfo = getRouteInfo(container);
      return prettyjson.render(routeInfo, { stringColor: 'red', keysColor: 'cyan', dashColor: 'yellow' });
    }
}


const serverInstance = new ServerSetup();
const appServer = serverInstance.getServer();
const routeInfoConfig = serverInstance.configureRouteInfo();

export { appServer, routeInfoConfig };
