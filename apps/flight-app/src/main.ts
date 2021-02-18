import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Platform providers
platformBrowserDynamic([
  { provide: 'token', useValue: 'meine app' }
]).bootstrapModule(AppModule, /* { ngZone: 'noop' } */);






