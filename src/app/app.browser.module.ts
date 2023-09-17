import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxTranslateHttpLoader } from '@shared/i18n-loaders';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: NgxTranslateHttpLoader,
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
