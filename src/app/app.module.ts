import { APP_ID, APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideClientHydration } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { appInitializerFactory } from './app-initializer-factory';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, TranslateModule],
  providers: [
    { provide: APP_ID, useValue: 'serverApp' },
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
