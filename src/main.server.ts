import '@angular/platform-server/init';

import { enableProdMode } from '@angular/core';
import { environment } from '@env';
import { AppServerModule } from './app/app.server.module';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { renderModule } from '@angular/platform-server';

const bootstrap = AppServerModule;

export default bootstrap;
