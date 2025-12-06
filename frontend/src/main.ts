import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs);

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(IonicModule.forRoot()),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: 'es' },
  ],
});
