import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';

import { environment } from '../environments/environment';

import {AppComponent} from './app.component';
import {CryptoService} from './_shared/services/crypto/crypto.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
