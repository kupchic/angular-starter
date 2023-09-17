import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserAnimationsModule, BrowserModule, AppModule],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
