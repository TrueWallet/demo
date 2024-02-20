import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { appInit } from "./providers/app-init/app-init";
import { highlightjsProvider } from "./providers/highlightjs/highlightjs";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    appInit,
    highlightjsProvider, provideAnimationsAsync(),
  ]
};
