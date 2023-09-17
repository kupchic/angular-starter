import { APP_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideClientHydration } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule],
  providers: [{ provide: APP_ID, useValue: 'serverApp' }, provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
