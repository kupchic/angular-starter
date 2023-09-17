import { NgModule, TransferState } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateServerLoader } from '@shared/i18n-loaders';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoader,
        deps: [TransferState],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
