import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { appInit } from "./providers/app-init/app-init";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideMarkdown } from "ngx-markdown";
import { HttpClient, provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    appInit,
    provideAnimationsAsync(),
    provideHttpClient(),
    provideMarkdown({
      loader: HttpClient
    })
  ]
};
