import { Injector, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser, LOCATION_INITIALIZED } from '@angular/common';
import { firstValueFrom } from 'rxjs';

export function appInitializerFactory(injector: Injector) {
  return async (): Promise<void> => {
    try {
      await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
      const translateService: TranslateService = injector.get(TranslateService);
      const platformId = injector.get(PLATFORM_ID);
      const isBrowser = isPlatformBrowser(platformId);
      const translate = await firstValueFrom(translateService.stream('APP.TITLE'), { defaultValue: null }); //wait for translates is ready - any key
    } catch (err) {
      console.error(`Problem with language initialization.'`);
    }
  };
}
