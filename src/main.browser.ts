import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppBrowserModule } from './app/app.browser.module';

platformBrowserDynamic()
  .bootstrapModule(AppBrowserModule)
  .catch((err) => console.error(err));
