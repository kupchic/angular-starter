import { TranslateLoader } from '@ngx-translate/core';
import { makeStateKey, StateKey, TransferState } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import fs from 'fs';
import { join } from 'path';

class TranslateServerLoader implements TranslateLoader {
  private readonly _suffix: string = '.json';
  constructor(private readonly _transferState: TransferState) {}

  public getTranslation(lang: string): Observable<object> {
    return new Observable((observer: Subscriber<object>) => {
      const assets_folder: string = join(
        process.cwd(),
        'dist',
        'angular-starter', //TODO replace with app-name
        'browser',
        'assets',
        'i18n',
      );
      const jsonData: object = JSON.parse(fs.readFileSync(`${assets_folder}/${lang}${this._suffix}`, 'utf8'));
      // Here we save the translations in the transfer-state
      const key: StateKey<object> = makeStateKey<object>('transfer-translate-' + lang);
      this._transferState.set(key, jsonData);

      observer.next(jsonData);
      observer.complete();
    });
  }
}

export function translateServerLoader(transferState: TransferState): TranslateServerLoader {
  return new TranslateServerLoader(transferState);
}
