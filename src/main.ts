declare const Wg: any;
declare const exports: any;

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Wg.Widgets.AemNg4Example = function () {
  Wg.Widget.apply(this, arguments);
};

Wg.Widgets.AemNg4Example.prototype = new Wg.Widget();

Wg.Widgets.AemNg4Example.prototype.init = function () {
  const self = this;

  platformBrowserDynamic().bootstrapModule(AppModule)
    .then(() => {
      if (self._element) {
        // Hide AEM Application loader element
        self._element.getElementsByClassName('external-widget-loader-loading')[0].style.display = 'none';
        self._element.style.minHeight = '0px';
      }
    })
    .catch(err => console.log(err));
};

exports.inlet = Wg.Widgets.AemNg4Example;
